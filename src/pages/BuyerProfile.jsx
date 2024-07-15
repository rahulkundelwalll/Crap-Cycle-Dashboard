import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import userImage from '.././assets/user.webp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
                            <li key={index} className="py-2 border-b last:border-b-0">{address.dropingAddress}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default function BuyerProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [categories, setCategories] = useState([]);
    const [dropingAdd, setDropingAdds] = useState([]);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/buyer/getbuyer/${id}`);
                setData(res.data.data)
                setCategories(res.data.category)
                setDropingAdds(res.data.dropingaddress)
                console.log(res.data.category);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id]);
    
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/buyer/deletbuyer/${id}`);
            navigate('/buyers');
        } catch (error) {
            console.log(error);
        }
    };
    
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
                                <td className="border px-4 py-2">{data.b_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Password :</td>
                                <td className="border px-4 py-2">{data.b_password}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Phone No.:</td>
                                <td className="border px-4 py-2">{data.b_mobile}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Buyer ID:</td>
                                <td className="border px-4 py-2">{data.b_id}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Address:</td>
                                <td className="border px-4 py-2">{data.b_address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Email ID:</td>
                                <td className="border px-4 py-2">{data.b_email}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Company Name:</td>
                                <td className="border px-4 py-2">{data.b_company_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Categories :</td>
                                <td className="border px-4 py-2">{categories.map((element, index) => (
                                    <span key={element.cat_id}>
                                        {element.cat_name}
                                        {index !== categories.length - 1 && ", "}
                                    </span>
                                ))}</td>
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
                        onClick={() => setIsDeleteConfirmOpen(true)}
                    >
                        Delete
                    </button>
                    <button
                    onClick={()=>{navigate(`/editbuyer/${id}`)}}
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
                addresses={dropingAdd}
            />

            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this buyer?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={() => setIsDeleteConfirmOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Sidebar>
    );
}
