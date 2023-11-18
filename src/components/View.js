import { BsFilePdfFill } from "react-icons/bs";
import { FaUserPen } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";


export default function View() {
    return (
        <>
            <div className=" w-[60%] rounded-[18px] contract-card m-8">
                <div className="card-body p-5 pt-0 flex flex-col justify-around items-center">
                    <div className="flex justify-around items-center mt-3 p-4 rounded-lg hover-to-shadow gap-2 file-review" >
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
        </>
    )
}
