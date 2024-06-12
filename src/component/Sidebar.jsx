import React from 'react';
import { FaLaptopHouse, FaUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { DiCodepen } from "react-icons/di";
import { IoExitSharp } from "react-icons/io5";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
export default function Sidebar() {
    const [sideButton, setSideButton] = React.useState(true);
    const [expandUserManagement, setExpandUserManagement] = React.useState(false);


    const toggleUserManagement = () => {
        setExpandUserManagement(!expandUserManagement);
    }
    const sideButtonFunction = () => {
        setSideButton((prev) => {
            return !prev;
        })
    }
    return (
        
        <div className='flex h-full'>

            <div className={`ps-10 bg-gradient-to-r from-customTeal  to-green-500 md:w-2/5 h-screen w-3/5 flex flex-col justify-around lg-custom:w-1/5 rounded-e-3xl  shadow-2xl ${sideButton==true ? 'hidden':""}`}>
                <div className='box-border text-center '>
                    <h2 className='box-border  font-bold text-start text-white text-3xl '>Welcome Back,</h2>
                    <h1 className=' text-4xl font-bold text-start text-white'>Pawan Mishra!</h1>
                </div>
                <div className=' h-150'>
                    <ul className='align flex flex-col space-y-4 '>
                        <li className="flex items-center space-x-2 cursor-pointer text-white hover:text-black">
                            <FaLaptopHouse className=" text-4xl  " />
                            {/* <FontAwesomeIcon icon={faLaptop} /> */}
                            <span className="  text-2xl">Dash Board</span>
                        </li>
                        <li className=" flexspace-x-2 cursor-pointer flex-col" >
                            <div className='flex text-white hover:text-black' onClick={toggleUserManagement}>
                            <FaUserCircle className=" text-4xl " />
                            <span className="text-2xl">User Management</span>
                            </div>
                            
                            <ul className={expandUserManagement==true? `text-white flex flex-col justify-center ms-10 text-xl` :'hidden'} >
                                <li className='hover:text-black'>&#x2022;Vendors</li>
                                <li className='hover:text-black'>&#x2022;Buyers</li>
                                <li className='hover:text-black'>&#x2022;Delivery Agent</li>
                            </ul>
                        </li>
                        <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                            <BiSolidCategory className=" text-4xl " />
                            <span className="   text-2xl">Category Management</span>
                        </li>
                        <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                            <DiCodepen className=" text-4xl" />
                            <span className=" text-2xl">Order Management</span>
                        </li>
                        <li className="text-white hover:text-black flex items-center space-x-2 cursor-pointer">
                            <GiNotebook className="text-4xl " />
                            <span className="  text-2xl">Add Requirement</span>
                        </li>
                    </ul>
                </div>
                <div className=" pb-10">
                    <div className="flex items-center text-white hover:text-black space-x-2 cursor-pointer">
                        <IoExitSharp className=" text-4xl " />
                        <span className=" text-2xl  ">logout</span>
                    </div>

                </div>
            </div>
            <div className={sideButton==true ? "flex justify-start items-center h-screen"  :`self-center flex justify-center`}>
                
                <button className='text-4xl rounded-e-3xl h-40 bg-gradient-to-r from-customTeal to-green-500 shadow-left hover:text-white ' onClick={sideButtonFunction}>
                {sideButton==true ? <BsChevronCompactRight />:<BsChevronCompactLeft />}
                </button>
            </div>
           
        </div>
    );
}
