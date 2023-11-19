import {ethers} from "ethers";
import InputBoxDeployment from "../deployments/InputBox.json";

const DAPP_ADDRESS = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";
const PROVIDER_URL = "http://localhost:8545";

export function createNewDocument(cid, merkleRoot, nullifierHash, proof) {
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
                merkleRoot,
                nullifierHash,
                proof
            ]
        }))
    ).then(tx => tx.wait(1))
}

export function signDocument(cid, merkleRoot, nullifierHash, proof) {
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
                merkleRoot,
                nullifierHash,
                proof
            ]
        }))
    ).then(tx => tx.wait(1))
}
