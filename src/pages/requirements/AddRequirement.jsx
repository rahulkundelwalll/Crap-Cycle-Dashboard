import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar';
import userImage from '../../assets/user.webp';

export default function AddRequirement() {
    const [formData, setFormData] = useState({
        categoryName: "",
        categoryID: "12345", // Dummy category ID
        quantity: "",
        requirementId: "",
        price: "",
        amount: "",
        date: new Date().toLocaleDateString(),
        note: "",
        buyerName: "",
        address: "",
        imageFile: null,
        imagePreview: userImage,
        pdfFileName: "",
        pdfFileUrl: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ["steel", "plastic"]; // Dummy data
    const buyers = {
        "Buyer 1": "alwar",
        "Buyer 2": "dehli",
    };

    useEffect(() => {
        const newRequirementId = `REQ${Date.now()}`; // Generate a new requirement ID
        setFormData(prev => ({ ...prev, requirementId: newRequirementId }));
    }, []);

    useEffect(() => {
        if (formData.quantity && formData.price) {
            const amount = parseFloat(formData.quantity) * parseFloat(formData.price);
            setFormData(prev => ({ ...prev, amount: amount.toFixed(2) }));
        }
    }, [formData.quantity, formData.price]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            address: name === 'buyerName' ? buyers[value] : prev.address
        }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        if (files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
                imagePreview: name === 'imageFile' ? URL.createObjectURL(file) : prev.imagePreview,
                pdfFileName: name === 'pdfFile' ? file.name : prev.pdfFileName,
                pdfFileUrl: name === 'pdfFile' ? URL.createObjectURL(file) : prev.pdfFileUrl
            }));
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Sidebar page={"Requirement Adding"}>
            <div className='flex flex-col items-center mt-10 p-6 h-auto w-4/5 mx-auto border-2 border-gray-300 shadow-lg rounded-3xl'>
                <div className='flex flex-col items-center mb-10'>
                    <img className='h-24 w-24 bg-cover rounded-full border-4 border-blue-500' src={formData.imagePreview} alt="User" />
                    <label htmlFor="imageFile" className='mt-4 px-4 py-2 bg-gray-400 text-white rounded-3xl cursor-pointer hover:bg-gray-500 transition duration-300'>
                        Upload Image
                    </label>
                    <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange} className='hidden' />
                </div>

                <form className='flex flex-col items-center w-full'>
                    <select
                        name='categoryName'
                        value={formData.categoryName}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name='categoryID'
                        value={formData.categoryID}
                        placeholder='Category ID'
                        readOnly
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='quantity'
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder='Quantity'
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        placeholder='Price'
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='amount'
                        value={formData.amount}
                        placeholder='Amount'
                        readOnly
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='requirementId'
                        value={formData.requirementId}
                        placeholder='Requirement ID'
                        readOnly
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='date'
                        value={formData.date}
                        placeholder='Date'
                        readOnly
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='note'
                        value={formData.note}
                        onChange={handleChange}
                        placeholder='Note'
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <select
                        name='buyerName'
                        value={formData.buyerName}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Buyer</option>
                        {Object.keys(buyers).map((buyer, index) => (
                            <option key={index} value={buyer}>{buyer}</option>
                        ))}
                    </select>
                    <select
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Delivery Address</option>
                        {Object.entries(buyers).map(([buyer, address], index) => (
                            formData.buyerName === buyer ? <option key={index} value={address}>{address}</option> : null
                        ))}
                    </select>
                    <div className='flex items-center'>
                        <button
                            onClick={handleClick}
                            className='px-6 py-2 mr-10 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition duration-300'
                        >
                            Save
                        </button>
                        <button className='px-6 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition duration-300'>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-4/5 h-4/5'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-bold'>Uploaded Document</h2>
                            <button onClick={toggleModal} className='text-red-500 text-xl'>&times;</button>
                        </div>
                        <iframe src={formData.pdfFileUrl} className='w-full h-full border'></iframe>
                    </div>
                </div>
            )}
        </Sidebar>
    );
}
