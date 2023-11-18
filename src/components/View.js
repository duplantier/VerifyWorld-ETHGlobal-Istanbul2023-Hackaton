import { BsFilePdfFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import { FaFileWord, FaFileContract } from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

export default function View() {
    const web3StorageKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwNGIyMEEzMmU2RGE0YTRDNmE1Mzk5MTg5NTc4RGFlM0ZCNkY5Y0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTIzMzY1OTIzMjUsIm5hbWUiOiJkd2V0cmFuc2ZlciJ9.qU0dEfGsmi1-UiBv4slk1a7jidaPBehkCYxab6WRun0";
const client = new Web3Storage({ token: web3StorageKey })

    const { file_id } = useParams()
    const navigate = useNavigate()

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

    useEffect(() => {
        const worker = async () => {
            if(!file_id){
                navigate("/")
            }
    
            // get file data from ipfs
    
            const res = await client.get(file_id) // Promise<Web3Response | null>
            const files = await res.files() // Promise<Web3File[]>

            for (const file of files) {
                if(file.name){
                    setFileData({
                        name: file.name,
                        type: file.name.split(".")[1],
                        can_be_viewed: true,
                        can_be_downloaded: true,
                        download_link: "https://google.com",
                        open_link: "https://google.com" 
                    })
                }
            }
    
            // get users who signed the file
    
            setSignedUsers([
                {
                    userId: "+90 546 972 4659",
                    status: "Uploaded",
                    isOwner: true,
                    date: 1700319583000
                }, 
                {
                    userId: "+90 531 351 6308",
                    status: "Signed & Verified",
                    isOwner: false,
                    date: 1700319583000
                },
            ])
    
            console.log(file_id)

        }

        worker()

    }, [file_id])

    const SignButtonClicked = () => {
        // sign the file

        console.log("sign button clicked")

        return true
    }


    return (
        <>
            <div className=" w-[60%] rounded-[18px] contract-card m-8">
                <div className="card-body p-5 pt-0 flex flex-col justify-around items-center">
                    <div className="flex justify-around items-center mt-3 p-4 rounded-lg hover-to-shadow gap-2 file-review" >
                        {
                            fileData.type === "pdf" ? <BsFilePdfFill color="#ee2b2b" size={50} /> : 
                            fileData.type === "docx" ? <FaFileWord color="#ee2b2b" size={50} /> :
                            <FaFileContract color="#ee2b2b" size={50} />
                        }
                        <span className="text-white text-2xl">
                            {fileData.name}
                        </span>
                        {fileData.can_be_downloaded && <span className="p-3 download-btn hover-to-shadow rounded-xl" onClick={() => {
                            openInNewTab(fileData.download_link)
                        }}>
                            <IoMdDownload className="download-icon " size={20} />
                        </span>}
                        {fileData.can_be_viewed && <span className="rounded-xl see-btn p-3 hover-to-shadow" onClick={() => {
                            openInNewTab(fileData.open_link)
                        }}>
                            <BsEyeFill className="see-icon" size={20} />
                        </span>}

                    </div>
                    <div className="signers flex flex-col justify-start align-start h-[200px] overflow-y-scroll">
                        {
                            signedUsers.map((user, index) => {
                                return <div className="signer flex justify-center align-center gap-4 p-3 rounded-lg  hover-to-shadow w-">
                                <span className="signer-name text-white text-xxl flex flex-row gap-2 justify-center items-center">
                                    <RiAdminFill size={36} />
                                    {user.userId} {
                                        user.isOwner && <span className="text-xs text-white text-opacity-50">
                                            (Owner)
                                        </span> 
                                    }
                                </span>
                                <span className="text-md text-green-500 flex flex-row gap-1 justify-center items-center">
                                    <FaCheckCircle color="green-500" />
                                    {
                                        user.status
                                    }
                                </span>
                                <span className="text-md text-green-500 text-opacity-50 flex flex-row gap-1 justify-center items-center">
                                    <IoCalendar />
                                    {
                                        new Date(user.date).toLocaleDateString()
                                    }
                                </span>
                            </div>

                            })
                        }


                    </div>
                    <div className="sign-button my-4 rounded-xl">
                        <button className="text-white flex justify-center items-center gap-2 sign-button p-3 rounded-xl hover-to-shadow" onClick={() => {SignButtonClicked()}}>
                            <FaFileSignature className="sign-icon" size={30} />
                            Sign the Contract
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
