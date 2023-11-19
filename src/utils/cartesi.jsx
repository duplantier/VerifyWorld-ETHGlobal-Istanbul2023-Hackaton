import {ethers} from "ethers";
import InputBoxDeployment from "../deployments/InputBox.json";
import {fetch} from "cross-fetch";
import {Buffer} from "buffer";

const DAPP_ADDRESS = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";
const PROVIDER_URL = "http://localhost:8545";
const INSPECT_URL = "http://localhost:5005/inspect";

function hex2str(hex) {
    // Ensure the hex string has the correct format
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }

    // Convert the hex string to a Buffer and then to a regular string
    return Buffer.from(hex, 'hex').toString('utf-8');
}

export function createNewDocument(cid, credType, merkleRoot, nullifierHash, proof) {
    // get provider & signer
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const signer = provider.getSigner();

    // create contract interface
    const contract = new ethers.Contract(
        InputBoxDeployment.address,
        InputBoxDeployment.abi,
        signer
    );

    // create new document with "upload" action
    return contract.addInput(
        DAPP_ADDRESS,
        ethers.utils.toUtf8Bytes(JSON.stringify({
            "action": "upload",
            "args": [
                cid,
                credType,
                merkleRoot,
                nullifierHash,
                proof
            ]
        }))
    ).then(tx => tx.wait(1))
}

export function signDocument(cid, credType, merkleRoot, nullifierHash, proof) {
    // get provider & signer
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const signer = provider.getSigner();

    // create contract interface
    const contract = new ethers.Contract(
        InputBoxDeployment.address,
        InputBoxDeployment.abi,
        signer
    );

    // create new document with "upload" action
    return contract.addInput(
        DAPP_ADDRESS,
        ethers.utils.toUtf8Bytes(JSON.stringify({
            "action": "sign",
            "args": [
                cid,
                credType,
                merkleRoot,
                nullifierHash,
                proof
            ]
        }))
    ).then(tx => tx.wait(1))
}


export function listDocumentSigners(cid) {
    // Constructing the payload
    const payload = JSON.stringify({
        "action": "list",
        "args": [cid]
    });

    // Constructing the full URL
    const url = `${INSPECT_URL}/%7B%22action%22%3A%22list%22%2C%22args%22%3A%5B%22${cid}%22%5D%7D`
    console.log(`Inspect URL: ${url}`);

    // Fetching data from the server
    return fetch(url)
        .then((res) => {
            console.log(`HTTP status: ${res.status}`);
            return res.json();
        })
        .then((res) => {
            console.log("res json", res)
            const decodedPayload = hex2str(res.reports[0].payload)
            return JSON.parse(decodedPayload)
        })
        .catch((err) => {
            // Error handling
            console.error("Unable to list document signers:", err);
            return [];
        });
}
