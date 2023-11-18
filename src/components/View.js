import { BsFilePdfFill } from "react-icons/bs";
import { FaUserPen } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import Header from "./Header";
import { Image } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function View() {
    return (
        <>
            <div className="h-[100vh] bg-slate-950 flex flex-col justify-center items-center ">
                <div className="flex justify-between items-end w-[55%]">
                    <div className="header-logo rounded-tl-[24px] rounded-tr-[24px] bg-slate-900 flex justify-center items-center gap-3 px-4 py-3 ">
                        <img className="" src={"../deneme-logo.svg"} />
                        <span className="text-white text-2xl">
                            VerifyWorld
                        </span>
                    </div>
                    <div className="header-navs flex flex-row justify-end align-bottom  items-end gap-3">
                        <div className="py-2 px-3 w-[100px] header-nav hover:h-[60px] duration-200 bg-slate-800 hover:bg-slate-900 cursor-pointer flex justify-center items-center rounded-tl-[12px] rounded-tr-[12px]">
                            <span className="text-white text-xl">
                                <Link href="/upload">Upload</Link>
                            </span>
                        </div>
                        <div className="py-2 px-3 w-[100px] header-nav hover:h-[60px] duration-200 bg-slate-800 hover:bg-slate-900 cursor-pointer flex justify-center items-center rounded-tl-[12px] rounded-tr-[12px]">
                            <span className="text-white text-xl">
                                <Link href="/view">View</Link>
                            </span>
                        </div>
                        <div className="py-2 px-3 w-[100px] header-nav hover:h-[60px] duration-200 bg-slate-800 hover:bg-slate-900 cursor-pointer flex justify-center items-center rounded-tl-[12px] rounded-tr-[12px]">
                            <span className="text-white text-xl">
                                <Link href="/sign">Sign</Link>
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-[60%] mx-auto bg-slate-900 rounded-[24px] px-[4%] py-[3%] ">
                    <div className="flex flex-row justify-center items-center">
                        <div className="card bg-slate-800 w-[100%] rounded-[18px] contract-card">
                            <div className="card-body p-5 pt-0 flex flex-col justify-around items-center">
                                <div className="bg-slate-700 p-2 rounded-br-xl rounded-bl-xl mb-3">
                                    <h1 className="text-white text-2xl flex flex-row justify-center mx-10">
                                        Home Contract
                                    </h1>
                                </div>
                                <div className="flex justify-around items-center p-4 rounded-lg hover-to-shadow gap-2 file-review" >
                                    <BsFilePdfFill color="#ee2b2b" size={50} />
                                    <span className="text-white text-2xl">home-contract-12-12-21.pdf</span>
                                    <span className="p-3 download-btn hover-to-shadow rounded-xl">
                                        <IoMdDownload className="download-icon " size={20} />
                                    </span>
                                    <span className="rounded-xl see-btn p-3 hover-to-shadow">
                                        <BsEyeFill className="see-icon" size={20} />
                                    </span>

                                </div>
                                <div className="signers flex flex-col justify-start align-start">
                                    <div className="signer flex justify-center align-center gap-4 p-3 rounded-lg  hover-to-shadow w-">
                                        <span className="signer-name text-white text-xxl flex flex-row gap-2 justify-center items-center">
                                            <RiAdminFill size={36} />
                                            +90 546 972 4659 (Owner)
                                        </span>
                                        <span className="text-md text-green-500 flex flex-row gap-1 justify-center items-center">
                                            <FaCheckCircle color="green-500" />
                                            Uploaded
                                        </span>
                                        <span className="text-md text-green-500 text-opacity-50 flex flex-row gap-1 justify-center items-center">
                                            <IoCalendar />
                                            02.12.2021
                                        </span>
                                    </div>
                                    <div className="signer flex justify-center align-center gap-4 p-3 rounded-lg  hover-to-shadow w-">
                                        <span className="signer-name text-white text-xxl flex flex-row gap-2 justify-center items-center">
                                            <FaUserPen color="white" size={36} />
                                            +90 531 351 6308
                                        </span>
                                        <span className="text-md text-green-500 flex flex-row gap-1 justify-center items-center">
                                            <FaCheckCircle color="green-500" />
                                            Signed & Verified
                                        </span>
                                        <span className="text-md text-green-500 text-opacity-50 flex flex-row gap-1 justify-center items-center">
                                            <IoCalendar color="" />
                                            12.12.2021
                                        </span>
                                    </div>

                                </div>
                                <div className="sign-button my-4 rounded-xl">
                                    <button className="text-white flex justify-center items-center gap-2 sign-button p-3 rounded-xl">
                                        <FaFileSignature className="sign-icon" size={30} />
                                        Sign the Contract
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
