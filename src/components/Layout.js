import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const IndexLayout = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="h-[100vh] bg-slate-950 flex flex-col justify-center items-center main-container ">
                <div className="flex justify-between items-end w-[55%]">
                    <div onClick={() => navigate('/')} className="header-logo cursor-pointer rounded-tl-[24px] rounded-tr-[24px] bg-slate-900 hover:bg-slate-950 duration-300 flex justify-center items-center gap-3 px-4 py-3 ">
                        <img src={"../logo.svg"} />
                        <span className="text-white text-2xl">
                            VerifyWorld
                        </span>
                    </div>
                    <div className="header-navs flex flex-row justify-end align-bottom  items-end gap-3">
                        {/* <div className="py-2 px-3 w-[100px] header-nav hover:h-[60px] duration-200 bg-slate-800 hover:bg-slate-900 cursor-pointer flex justify-center items-center rounded-tl-[12px] rounded-tr-[12px]">
                            <span className="text-white text-xl">
                                <a href="/upload">Upload</a>
                            </span>
                        </div> */}
                        <div onClick={() => navigate('view')} className="py-2 px-3 w-[200px] h-[50px] header-nav hover:h-[60px] duration-300 bg-slate-800 hover:bg-slate-900 cursor-pointer flex justify-center items-center rounded-tl-[12px] rounded-tr-[12px]">
                            <span className="text-white text-lg">
                                View The Document
                            </span>
                        </div>

                    </div>
                </div>
                <div className="w-[60%] bg-slate-900 rounded-[24px]  parent-card flex flex-row justify-center items-center">
                    <Outlet />
                </div>
            </div >
            <Footer />
        </>
    );
}

export default IndexLayout;
