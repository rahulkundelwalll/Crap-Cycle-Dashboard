import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import userImage from '.././assets/user.webp';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, addresses }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg overflow-hidden w-4/5 max-w-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Dropping Locations</h2>
                    <button onClick={onClose} className="text-red-500 font-bold">X</button>
                </div>
                <div className="p-4">
                    <ul>
                        {addresses.map((address, index) => (
                            <li key={index} className="py-2 border-b last:border-b-0">{address}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default function BuyerProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Example data
    const contactPerson = 'John Doe';
    const phoneNo = '123-456-7890';
    const buyerId = 'B001';
    const address = '123 Main St';
    const email = 'john.doe@example.com';
    const companyName = 'ABC Inc.';
    const droppingLocations = ['123 Main St', '456 Oak Ave', '789 Pine Ln']; // Example addresses

    return (
        <Sidebar page={'Buyers'}>
            <div className='flex justify-end text-xl font-bold mt-5'>
                <Link to='/addbuyer' className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3">
                    + Add Buyer
                </Link>
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
                                <td className="border px-4 py-2 font-bold">Buyer ID:</td>
                                <td className="border px-4 py-2">{buyerId}</td>
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
                            <tr>
                                <td className="border px-4 py-2 font-bold">Dropping Locations:</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        View
                                    </button>
                                </td>
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                addresses={droppingLocations}
            />
        </Sidebar>
    );
}
