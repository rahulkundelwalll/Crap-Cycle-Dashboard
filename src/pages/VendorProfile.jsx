import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function VendorProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [categories, setCategories] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/vendor/vender-detail/${id}`);
                setData(res.data.data);
                setCategories(res.data.category);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]); // Added id to dependency array to fetch data when id changes

    const confirmDelete = async () => {
        try {
            // Perform deletion logic here (e.g., call API to delete vendor)
            // Assuming successful deletion, navigate to '/vendors'
            const res = await axios.delete(`http://localhost:3000/api/vendor/delete-vendor/${id}`)

            navigate('/vendors'); // Navigate to vendors list after deletion
        } catch (err) {
            console.error('Error deleting vendor:', err);
            // Handle error if deletion fails
        }
    };

    const cancelDelete = () => {
        setShowConfirmDialog(false); // Close delete confirmation dialog
    };

    return (
        <Sidebar page={'Vendors'}>
            <div className='flex justify-end text-xl font-bold mt-5'>
                <button onClick={() => navigate('/addvendor')} className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3">
                    + Add Vendor
                </button>
            </div>
            <div className='flex justify-center text-3xl font-bold mt-5 ms-10'>
                <span className="text-gray-400">Profile</span>
            </div>
            <div className='flex flex-col items-center h-4/6 w-4/5 mx-auto border-2 border-gray-400 rounded-3xl'>
                <img src={`../../upload/${data.v_image}`} className='h-24 bg-cover mt-10 rounded-full' alt="User" />
                <div className='mt-10 w-full'>
                    <table className="table-auto border-collapse border border-white-400 w-full">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Contact Person:</td>
                                <td className="border px-4 py-2">{data.v_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Phone No.:</td>
                                <td className="border px-4 py-2">{data.v_mobile}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Vendor ID:</td>
                                <td className="border px-4 py-2">{data.v_id}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Address:</td>
                                <td className="border px-4 py-2">{data.v_address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Email ID:</td>
                                <td className="border px-4 py-2">{data.v_email}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Company Name:</td>
                                <td className="border px-4 py-2">{data.v_companyname}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Categories:</td>
                                <td className="border px-4 py-2">
                                    {categories.map((element, index) => (
                                        <span key={element.cat_id}>
                                            {element.cat_name}
                                            {index !== categories.length - 1 && ", "}
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='my-auto '>
                    <button
                        onClick={() => setShowConfirmDialog(true)}
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Delete
                    </button>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => { navigate('/vendors') }}
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Save
                    </button>
                </div>
            </div>
            {/* Delete Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-md mx-auto my-6">
                        <div className="bg-white rounded-lg shadow-lg relative flex flex-col p-6">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
                                <button
                                    onClick={cancelDelete}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M13.707 6.293a1 1 0 0 1 0 1.414L11.414 10l2.293 2.293a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 1 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm mt-2">
                                Are you sure you want to delete this vendor?
                            </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl m-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-3xl m-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Sidebar>
    );
}
