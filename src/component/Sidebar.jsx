import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopHouse, FaUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { DiCodepen } from "react-icons/di";
import { IoExitSharp } from "react-icons/io5";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLink } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserAltSlash } from "react-icons/fa";
export default function Sidebar({ children, page }) {
    const [sideButton, setSideButton] = React.useState(false);
    const [expandUserManagement, setExpandUserManagement] = React.useState(() => {
        const savedState = localStorage.getItem('expandUserManagement');
        return savedState === 'true';
    });
    const [expandOrderManagement, setExpandOrderManagement] = React.useState(() => {
        const savedState = localStorage.getItem('expandOrderManagement');
        return savedState === 'true';
    });
    const [expandOrderHistory, setExpandOrderHistory] = React.useState(() => {
        const savedState = localStorage.getItem('expandOrderHistory');
        return savedState === 'true';
    });
    const { logout } = React.useContext(AuthContext);

    const toggleUserManagement = () => {
        setExpandUserManagement(prev => {
            const newState = !prev;
            localStorage.setItem('expandUserManagement', newState);
            return newState;
        });
    }

    const toggleOrderManagement = () => {
        setExpandOrderManagement(prev => {
            const newState = !prev;
            localStorage.setItem('expandOrderManagement', newState);
            return newState;
        });
    }

    const toggleOrderHistory = () => {
        setExpandOrderHistory(prev => {
            const newState = !prev;
            localStorage.setItem('expandOrderHistory', newState);
            return newState;
        });
    }

    const sideButtonFunction = () => {
        setSideButton(prev => !prev);
    }

    React.useEffect(() => {
        setSideButton(prev => prev);
    }, [sideButton]);

    const handleLogout = async () => {
        const res = await logout();
        if (res.status === 200) {
            alert("logout successful");
            navigate('/login');
        } else {
            alert(res.data.message);
        }
    }

    return (
        <>
            <div className='flex '>
                <div className={`ps-10 bg-gradient-to-r from-customTeal to-green-500 md:w-3/5   w-3/5 flex flex-col justify-around lg-custom:w-3/12 rounded-e-3xl shadow-2xl ${sideButton ? 'hidden' : ""}`}>
                    <div className='box-border text-center '>
                        <h2 className='box-border font-bold text-start text-white text-3xl'>Welcome Back,</h2>
                        <h1 className='text-4xl font-bold text-start text-white'>Pawan Mishra!</h1>
                    </div>
                    <div className='h-150'>
                        <ul className='align flex flex-col space-y-4 '>
                            <Link to='/'><li className="flex items-center space-x-2 cursor-pointer text-white hover:text-black">
                                <FaLaptopHouse className="text-4xl" />
                                <span className="text-2xl">Dashboard</span>
                            </li></Link>
                            <li className="flexspace-x-2 cursor-pointer flex-col">
                                <div className='flex text-white hover:text-black' onClick={toggleUserManagement}>
                                    <FaUserCircle className="text-4xl" />
                                    <span className="text-2xl">User Management</span>
                                </div>
                                <ul className={expandUserManagement ? 'text-white flex flex-col justify-center ms-10 text-xl' : 'hidden'}>
                                    <Link to='/dashboard/vendor/vendors'><li className='hover:text-black'>&#x2022;Vendors</li></Link>
                                    <Link to='/dashboard/buyer/buyers'><li className='hover:text-black'>&#x2022;Buyers</li></Link>
                                    <Link to='/dashboard/delivery_agent/allgents'><li className='hover:text-black'>&#x2022;Delivery Agent</li></Link>
                                </ul>
                            </li>
                            <Link to='/dashboard/category/category'>
                            <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                                <BiSolidCategory className=" text-4xl " />
                                <span className="   text-2xl">Category Management</span>
                            </li>
                            </Link>
                            <li className="flexspace-x-2 cursor-pointer flex-col">
                                <div className='flex text-white hover:text-black' onClick={toggleOrderManagement}>
                                    <DiCodepen className=" text-4xl" />
                                    <span className="text-2xl">Order Management</span>
                                </div>
                                <ul className={expandOrderManagement ? 'text-white flex flex-col justify-center ms-10 text-xl' : 'hidden'}>
                                    <Link to='/supplytable'><li className='hover:text-black'>&#x2022;Supply</li></Link>
                                    <Link to='/dashboard/requirement/allrequirement'><li className='hover:text-black'>&#x2022;Requirement</li></Link>
                                    <Link to='/maintable'><li className='hover:text-black'>&#x2022;MainOrder Table</li></Link>
                                </ul>
                            </li>
                            <li className="flexspace-x-2 cursor-pointer flex-col">
                                <div className='flex text-white hover:text-black' onClick={toggleOrderHistory}>
                                    <DiCodepen className=" text-4xl" />
                                    <span className="text-2xl">Order History</span>
                                </div>
                                <ul className={expandOrderHistory ? 'text-white flex flex-col justify-center ms-10 text-xl' : 'hidden'}>
                                    <Link to='/dashboard/history/supplytable'><li className='hover:text-black'>&#x2022;Supply</li></Link>
                                    <Link to='/dashboard/history/requirementtable'><li className='hover:text-black'>&#x2022;Requirement</li></Link>
                                    <Link to='/dashboard/history/maintable'><li className='hover:text-black'>&#x2022;MainOrder Table</li></Link>
                                </ul>
                            </li>
                            <Link to='/dashboard/requirement/addrequirement'>
                            <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                                <GiNotebook className="text-4xl " />
                                <span className="  text-2xl">Add Requirement</span>
                            </li>
                            </Link>
                            <Link to='/update-links'>
                            <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                                <FaLink className="text-4xl " />
                                <span className="  text-2xl">Update Links</span>
                            </li>
                            </Link>
                            <Link to='/dashboard/deactivateaccount'>
                            <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                                <FaUserAltSlash className="text-4xl " />
                                <span className="  text-2xl">Deactivated Account</span>
                            </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="pb-10">
                        <div className="flex items-center text-white hover:text-black space-x-2 cursor-pointer" onClick={handleLogout}>
                            <IoExitSharp className="text-4xl" />
                            <span className="text-2xl">logout</span>
                        </div>
                    </div>
                    
                </div>
                <div className={sideButton ? "flex justify-start items-center h-screen" : 'self-center flex justify-center'}>
                    <button className='text-4xl rounded-e-3xl h-40 bg-gradient-to-r from-customTeal to-green-500 shadow-left hover:text-white' onClick={sideButtonFunction}>
                        {sideButton ? <BsChevronCompactRight /> : <BsChevronCompactLeft />}
                    </button>
                </div>
                <div className='w-full'>
                    <div className='flex'>
                        <div className="item pt-2 mr-0 relative mx-auto text-gray-600">
                            <input
                                className="border-2 border-black bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none"
                                type="search"
                                name="search"
                                placeholder="Search"
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                <svg
                                    className="text-gray-600 h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    id="Capa_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 56.966 56.966"
                                    style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                    xmlSpace="preserve"
                                    width="512px"
                                    height="512px"
                                >
                                    <path
                                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className='w-100 pt-2 ms-2 me-3 '>
                            <Link to='/dashboard/Profile'>
                            <FaUserCircle className='text-4xl ' /></Link>
                        </div>
                    </div>
                    <div className='flex items-center text-4xl font-bold mt-10 ms-5'>
                        <FaRegUserCircle style={{ color: 'green' }} className='text-4xl items-center mt-1 ' />
                        <h1 style={{ color: 'green' }}>{page}</h1>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
