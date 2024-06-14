import React, { useState } from 'react';
import Sidebar from './../component/Sidebar';
import userImage from '.././assets/user.webp';
import {useNavigate} from "react-router-dom";


export default function VendorProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // Example data
    const contactPerson = 'John Doe';
    const phoneNo = '123-456-7890';
    const VendorId = 'B001';
    const address = '123 Main St';
    const email = 'john.doe@example.com';
    const companyName = 'ABC Inc.';
    // Example addresses

    return (
        <Sidebar page={'Vendors'}>
            <div className='flex justify-end text-xl font-bold mt-5'>
                <button onClick={(event)=>navigate('/addvendor')} className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" >
                    + Add Vendor
                </button>
            </div>
            <div className='flex justify-center text-3xl font-bold mt-5 ms-10'>
                <span className="text-gray-400">Profile</span>
            </div>
            <div className='flex flex-col items-center h-4/6 w-4/5 mx-auto border-2 border-gray-400 rounded-3xl'>
                <img src={userImage} className='h-24  bg-cover mt-10 rounded-full' alt="User" />
                <div className='mt-10 w-full'>
                    <table className="table-auto border-collapse border border-white-400 w-full">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Contact Person:</td>
                                <td className="border px-4 py-2">{contactPerson}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Phone No.:</td>
                                <td className="border px-4 py-2">{phoneNo}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Vendor ID:</td>
                                <td className="border px-4 py-2">{VendorId}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Address:</td>
                                <td className="border px-4 py-2">{address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Email ID:</td>
                                <td className="border px-4 py-2">{email}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Company Name:</td>
                                <td className="border px-4 py-2">{companyName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Catogeries :</td>
                                <td className="border px-4 py-2">Iron, Aluminium, Steel, Paper, Plastic, Cardboard</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div className='my-auto '>
                    <button
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Delet
                    </button>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Edit
                    </button>
                    <button
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Save
                    </button>
                    
                </div>
            </div>

            
        </Sidebar>
    );
}
