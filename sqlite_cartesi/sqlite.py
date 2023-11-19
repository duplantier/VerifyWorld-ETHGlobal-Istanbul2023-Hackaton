import logging
import requests
import sqlite3
import json
import time

# Logging setup
logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

# Environment variable for rollup server URL
rollup_server = "http://127.0.0.1:5004"
logger.info(f"HTTP rollup_server url is {rollup_server}")

# Connects to internal database
con = sqlite3.connect("data.db")

# Hexadecimal and string conversion functions
def hex2str(hex):
    return bytes.fromhex(hex[2:]).decode("utf-8")

def str2hex(str):
    return "0x" + str.encode("utf-8").hex()

# HTTP post request function
def post(endpoint, payloadStr, logLevel):
    logger.log(logLevel, f"Adding {endpoint} with payload: {payloadStr}")
    payload = str2hex(payloadStr)
    response = requests.post(f"{rollup_server}/{endpoint}", json={"payload": payload})
    logger.info(f"Received {endpoint} status {response.status_code} body {response.content}")

# Document management functions
def newDocument(cid: str, cred_type:str, merkle_root: str, nullifier_hash: str, proof: str):
    # Drop the table if it already exists
    drop_cmd = f"DROP TABLE IF EXISTS DOC_{cid}"
    logger.info(f"SQL: {drop_cmd}")
    cur = con.cursor()
    cur.execute(drop_cmd)

    # Create the new table
    create_cmd = f"CREATE TABLE DOC_{cid} (credentialType TEXT NOT NULL, merkleRoot TEXT NOT NULL, nullifierHash TEXT NOT NULL, proof TEXT NOT NULL)"
    logger.info(f"SQL: {create_cmd}")
    cur.execute(create_cmd)
    con.commit()

    return signDocument(cid, cred_type, merkle_root, nullifier_hash, proof)


def signDocument(cid: str, cred_type: str, merkle_root: str, nullifier_hash: str, proof: str):
    cur = con.cursor()
    # Check if the record already exists
    cur.execute(f"SELECT COUNT(*) FROM DOC_{cid} WHERE merkleRoot = ? AND nullifierHash = ? AND proof = ?", (merkle_root, nullifier_hash, proof))
    if cur.fetchone()[0] == 0:
        # Insert the new record if it does not exist
        cur.execute(f"INSERT INTO DOC_{cid} VALUES (?, ?, ?, ?)", (cred_type, merkle_root, nullifier_hash, proof))
        con.commit()
    return []

def listSigners(cid: str):
    cur = con.cursor()
    cur.execute(f"SELECT * FROM DOC_{cid}")
    return cur.fetchall()

# Request handling function
def handle_request(data, request_type):
    logger.info(f"Received {request_type} data {data}")

    # Decode and validate payload
    try:
        payload = json.loads(hex2str(data["payload"]))
        if "action" not in payload or "args" not in payload:
            raise ValueError("Missing required fields in payload")
    except Exception as e:
        logger.error(f"Payload processing error: {e}")
        post("exception", f"Payload processing error: {e}", logging.ERROR)
        return "reject"

    # Process action
    try:
        action = payload["action"]
        args = payload["args"]
        logger.info(f"Processing action: {action}")

        result = []
        if action == "upload":
            result = newDocument(*args)
        elif action == "sign":
            result = signDocument(*args)
        elif action == "list":
            result = listSigners(*args)
        else:
            raise ValueError("Invalid action")

        # Handle response
        response = json.dumps(result)
        post("notice" if request_type == "advance_state" else "report", response, logging.INFO)
    except Exception as e:
        logger.error(f"Action processing error: {e}")
        post("exception", f"Action processing error: {e}", logging.ERROR)
        return "reject"

    return "accept"

# Main loop
finish = {"status": "accept"}

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
        time.sleep(5)  # Wait for 5 seconds before the next iteration
    else:
        try:
            rollup_request = response.json()
            data = rollup_request["data"]
        except Exception as e:
            logger.error(f"Unable to cast data to json: {e}")
            finish["status"] = "exception"
            continue

        finish["status"] = handle_request(data, rollup_request["request_type"])
        time.sleep(0.5)  # Shorter wait if there was a request to process
