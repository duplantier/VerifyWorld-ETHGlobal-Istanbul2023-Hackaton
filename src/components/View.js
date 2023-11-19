import { BsFilePdfFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaFileWord, FaFileContract } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";
import { CarReader } from '@ipld/car/reader'
import { recursive as exporter } from 'ipfs-unixfs-exporter'
import { Backdrop, CircularProgress } from "@mui/material";
import { IDKitWidget } from '@worldcoin/idkit'
import AffiSnackbar from "../Dialogs/AffiSnackbar";
import {createNewDocument, listDocumentSigners, signDocument} from "../utils/cartesi";

function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

export default function View() {
    const web3StorageKey = process.env.REACT_APP_IPFS_KEY
    const client = new Web3Storage({ token: web3StorageKey })

    const [backdropOpen, setBackdropOpen] = useState(false)
    const [isIdKitOpen, setIsIdKitOpen] = useState(false)
    const { file_id } = useParams()
    const navigate = useNavigate()

    const [snackOpen, setSnackOpen] = useState({
        open: false,
        text: "",
        is_success: false,
    });

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const [fileData, setFileData] = useState({
        name: "",
        type: "",
        can_be_viewed: false,
        can_be_downloaded: true,
    })

    const [signedUsers, setSignedUsers] = useState([])

    const downloadBlob = async () => {
        setBackdropOpen(true)
        const url_of_file = fileData.url_of_file

        const res = await fetch(url_of_file)
        const blob = await res.blob()

        const carRaw = await CarReader.fromBytes(new Uint8Array(await blob.arrayBuffer()))
        const roots = await carRaw.getRoots()

        const entries = exporter(roots[0], {
            async get(cid) {
                const block = await carRaw.get(cid)
                return block.bytes
            }
        })

        for await (const entry of entries) {
            if (entry.type === 'file' || entry.type === 'raw') {
                let all_content = new Uint8Array()

                for await (const content of entry.content()) {
                    all_content = new Uint8Array([...all_content, ...content])
                }

                const blob = new Blob([all_content]);
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = entry.name;
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            }
        }

        setBackdropOpen(false)
    };

    useEffect(() => {
        const worker = async () => {
            if (!file_id) {
                navigate("/")
            }

            setBackdropOpen(true)
            const res = await client.get(file_id)
            const url_of_file = res.url
            const files = await res.files()

            for (const file of files) {
                if (file.name) {
                    const file_name = file.name + ""

                    setFileData((prevFileData) => ({
                        ...prevFileData,
                        name: file_name.split(".").slice(0, -1).join("."),
                        type: file_name.split(".")[file_name.split(".").length-1],
                        can_be_viewed: true,
                        url_of_file: url_of_file,
                    }));
                }
            }

            // get users who signed the file
            if (signedUsers.length === 0) {
                listDocumentSigners(file_id).then(async (signers) => {
                    console.log("signers", signers);

                    // iterate over signers and get their info
                    const info = [];
                    for (const signer of signers) {
                        const [
                            credType,
                            merkleRoot,
                            nullifierHash,
                            proof
                        ] = signer;

                        // verify signer
                        const response_from_backend = await fetch("https://verifyworldcoinid-t2ajiqka5a-uc.a.run.app", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                merkle_root: merkleRoot,
                                nullifier_hash: nullifierHash,
                                proof: proof,
                                action: process.env.REACT_APP_WORLDID_ACTION,
                                credential_type: credType
                            }),
                        })
                        const response = await response_from_backend.json()

                        if (response.isVerified) {
                            console.log("verified", response)
                            info.push({
                                userId: truncate(nullifierHash, 10),
                                status: "Signed & Verified",
                                isOwner: signers.indexOf(signer) === 0,
                                date: 1700319583000, // write to database instead of hardcoding (need time)
                            })
                        }
                    }

                    console.log(info)
                    setSignedUsers(info)
                    setBackdropOpen(false)
                });
            }
        }

        worker()

    }, [file_id])

    const SignButtonClicked = () => {
        // sign the file

        setIsIdKitOpen(true)

        return true
    }

    return (
        <>
            <AffiSnackbar snackOpen={snackOpen} setSnackOpen={setSnackOpen} />
                    <IDKitWidget
                        app_id={process.env.REACT_APP_WORLDID_APP_ID} // obtained from the Developer Portal
                        action={process.env.REACT_APP_WORLDID_ACTION} // this is your action name from the Developer Portal
                        onSuccess={
                            () => {
                    window.location.reload()
                    setIsIdKitOpen(false)
                }} // callback when the modal is closed
                handleVerify={async (data) => {
                    const response_from_backend = await fetch("https://verifyworldcoinid-t2ajiqka5a-uc.a.run.app", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...data,
                            file_id: file_id,
                        }),
                    })

                    const response = await response_from_backend.json()

                    if (response.isVerified) {
                        setSnackOpen({
                            open: true,
                            text: "Your identity is verified",
                            is_success: true,
                        });

                        const document = await signDocument(
                            file_id,
                            data.credential_type,
                            data.merkle_root,
                            data.nullifier_hash,
                            data.proof
                        )
                        console.log("Saved to cartesi", document)
                        console.log(data, "verified")

                    }
                    else {
                        setSnackOpen({
                            open: true,
                            text: "Your identity is not verified",
                            is_success: false,
                        });

                    }

                    setIsIdKitOpen(false)
                    return true

                }} // optional callback when the proof is received
                credential_types={['orb', 'phone']} // optional, defaults to ['orb']
                enableTelemetry // optional, defaults to false
            >
                {({ open }) => isIdKitOpen && open()}
            </IDKitWidget>
            
            <Backdrop open={backdropOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="w-[90%] lg:w-[90%] md:h-[75vh] lg:h-[80vh] xl:h-[70vh] flex flex-col justify-center items-center  contract-card m-3 lg:m-5 rounded-[24px]">
                <div className="h-[100vh] md:h-[65vh] lg:w-[100%] lg:h-[70vh]  px-4 flex flex-col justify-between  items-center ">
                    <div className="w-[90%] md:w-[90%] lg:w-[100%] flex flex-col md:flex-row justify-center  items-center p-3 m-5 mb-0 text-center rounded-lg hover-to-shadow file-info gap-4" >
                        {
                            fileData.type === "pdf" ? <BsFilePdfFill color="#ee2b2b" size={50} /> :
                                fileData.type === "docx" ? <FaFileWord color="#ee2b2b" size={50} /> :
                                    <IoDocumentText color="#ee2b2b" size={50} />
                        }

                        <span className="text-white text-2xl text-center">
                            {
                                (fileData.name.length > 30 ? fileData.name.slice(0, 27) + ".." : fileData.name) + "." + fileData.type
                            }
                        </span>

                        <div className="mt-2 flex justify-center items-center" >
                            {
                                fileData.can_be_downloaded && <span className=" p-3 download-btn hover-to-shadow rounded-xl" onClick={downloadBlob}>
                                    <IoMdDownload className="download-icon " size={20} />
                                </span>
                            }
                        </div>

                    </div>
                    <div className="signers flex flex-col  gap-5 justify-center w-[90%] h-[80vh] md:h-[50vh] lg:h-[30vh] xl:h-[35vh] md:my-0 overflow-y-scroll lg:py-16 lg:px-6 ">
                        {
                            signedUsers.map((user, index) => {
                                return <div className="signer flex flex-col md:flex-row justify-center align-center gap-4 p-3 rounded-lg  hover-to-shadow w-[100%}">
                                    <span className="signer-name mt-3 md:mt-0 text-white text-xxl flex flex-col md:flex-row gap-2 justify-center items-center">
                                        <RiAdminFill size={36} />
                                        {user.userId} {
                                            user.isOwner && <span className="text-xs text-white text-opacity-50">
                                                (Owner)
                                            </span>
                                        }
                                    </span>

                                    <span className=" text-md text-green-500 flex-col mt-3 md:mt-0 flex md:flex-row gap-1 justify-center items-center">
                                        <FaCheckCircle color="green-500" />
                                        {
                                            user.status
                                        }
                                    </span>
                                    <span className="text-md text-green-500 text-opacity-50 mb:4 flex flex-col md:flex-row gap-1 justify-center items-center">
                                        <IoCalendar />
                                        {
                                            new Date(user.date).toLocaleDateString()
                                        }
                                    </span>
                                </div>
                            })
                        }
                    </div>
                    <div className="sign-button my-6 md:my-8 lg:my-5 rounded-xl">
                        <button className="text-white flex justify-center items-center gap-2 sign-button p-3 rounded-xl hover-to-shadow" onClick={() => { SignButtonClicked() }}>
                            <FaFileSignature className="sign-icon" size={30} />
                            Sign the Contract
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}