import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import userImage from '../.././assets/user.webp';
import { useNavigate } from "react-router-dom";

export default function VendorProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // Example data
    const categoryName = 'Aluminium Sheets';
    const categoryId = 'AL59934';
    const quantity = '200 kg';
    const requirementId = 'jfjrfir';
    const price = '6';
    const amount = ''; // You can update this with the actual amount
    const date = '12-12-2024';
    const note = 'Sorted and thin sheets of aluminium are accepted';
    const buyerName = 'BGI India Pvt. Ltd.';
    const buyerPhoneNo = '+91-7942498211';
    const buyerAddress = 'B-984, Okhala Phase 2, N.D-110023';
    const orderDropLocation = 'B-984, Okhala Phase 2, N.D-110023';

    return (
        <Sidebar page={'Requirement'}>
            <div className='flex justify-end text-xl font-bold mt-5'>
                <button onClick={(event) => navigate('/addvendor')} className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3">
                    + Add Requirement
                </button>
            </div>
            <div className='flex justify-center text-3xl font-bold mt-5 ms-10'>
                <span className="text-gray-400">Edit Page</span>
            </div>
            <div className='flex flex-col items-center h-5/6 w-4/5 mx-auto border-2 border-gray-400 rounded-3xl'>
                <img src={userImage} className='h-24  bg-cover mt-10 rounded-full' alt="User" />
                <div className='mt-10 w-full'>
                    <table className="table-auto border-collapse border border-white-400 w-full">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Category Name:</td>
                                <td className="border px-4 py-2">{categoryName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Category ID:</td>
                                <td className="border px-4 py-2">{categoryId}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Quantity:</td>
                                <td className="border px-4 py-2">{quantity}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Requirement ID:</td>
                                <td className="border px-4 py-2">{requirementId}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Price:</td>
                                <td className="border px-4 py-2">{price}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Amount:</td>
                                <td className="border px-4 py-2">{amount}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Date:</td>
                                <td className="border px-4 py-2">{date}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Note:</td>
                                <td className="border px-4 py-2">{note}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Buyer’s Name:</td>
                                <td className="border px-4 py-2">{buyerName}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Buyer’s Phone No.:</td>
                                <td className="border px-4 py-2">{buyerPhoneNo}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Buyer’s Address:</td>
                                <td className="border px-4 py-2">{buyerAddress}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Order Drop Location:</td>
                                <td className="border px-4 py-2">{orderDropLocation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='my-auto '>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl m-4"
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl m-4"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl m-4"
                    >
                        Order Complete
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl m-4"
                    >
                        Order Cancelled
                    </button>
                </div>
            </div>
        </Sidebar>
    );
}
