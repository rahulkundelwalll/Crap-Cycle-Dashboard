import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import userImage from '../.././assets/user.webp';
import {useNavigate} from "react-router-dom";


export default function VendorProfile() {
    const navigate = useNavigate();
    // Example data
    const category = 'Aluminium';
    const  categoryId= '123-456-7890';
    const subcategory = 'B001';
    const discription = " i am category"
    // Example addresses

    return (
        <Sidebar page={'Category'}>
            <div className='flex justify-end text-xl font-bold mt-5'>
                <button onClick={(event)=>navigate('/addcategory')} className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" >
                    + Add Category
                </button>
            </div>
            <div className='flex justify-center text-3xl font-bold mt-5 ms-10'>
                <span className="text-gray-400">Category Detail</span>
            </div>
            <div className='flex flex-col items-center h-4/6 w-4/5 mx-auto border-2 border-gray-400 rounded-3xl '>
                <img src={userImage} className='h-24  bg-cover mt-10 rounded-full' alt="User" />
                <div className='mt-10 w-full '>
                    <table className="table-auto border-collapse border border-white-400 w-full">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Category:</td>
                                <td className="border px-4 py-2">{category}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Category Id:</td>
                                <td className="border px-4 py-2">{categoryId}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Sub Category:</td>
                                <td className="border px-4 py-2">{subcategory}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Discription:</td>
                                <td className="border px-4 py-2">{discription}</td>
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
