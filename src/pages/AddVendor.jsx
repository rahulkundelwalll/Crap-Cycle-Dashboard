import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import userImage from '../assets/user.webp';

export default function AddVendor() {
    const [formData, setFormData] = useState({
        personName: "",
        phoneNumber: "",
        email: "",
        companyName: "",
        address: "",
        category: "",
        pdfFile: null,
        imageFile: null,
        imagePreview: userImage,
        pdfFileName: "",
        pdfFileUrl: ""
    });
    console.log(formData.pdfFile)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ["steel", "plastic"]; // Dummy data

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
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
        <Sidebar page={"Vendor"}>
            <div className='flex flex-col items-center mt-10 p-6 h-auto w-4/5 mx-auto border-2 border-gray-300 shadow-lg rounded-3xl'>
                <div className='flex flex-col items-center mb-10'>
                    <img className='h-24 w-24 bg-cover rounded-full border-4 border-blue-500' src={formData.imagePreview} alt="User" />
                    <label htmlFor="imageFile" className='mt-4 px-4 py-2 bg-gray-400 text-white rounded-3xl cursor-pointer hover:bg-gray-500 transition duration-300'>
                        Upload Image
                    </label>
                    <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange} className='hidden' />
                </div>

                <form className='flex flex-col items-center w-full'>
                    <input
                        type="text"
                        name='personName'
                        value={formData.personName}
                        onChange={handleChange}
                        placeholder='Person Name'
                        className='placeholder:text-center mb-4 p-3 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="tel"
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder='Phone Number'
                        className='placeholder:text-center mb-4 p-3 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email Id'
                        className='placeholder:text-center mb-4 p-3 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='companyName'
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder='Company Name'
                        className='placeholder:text-center mb-4 p-3 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="text"
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        placeholder='Address'
                        className='placeholder:text-center mb-4 p-3 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-3 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <label htmlFor="pdfFile" className='mb-4 px-4 py-2 bg-gray-400 text-white rounded-3xl cursor-pointer hover:bg-gray-500 transition duration-300'>
                        Upload Document
                    </label>
                    <input type="file" id="pdfFile" name="pdfFile" accept="application/pdf" onChange={handleFileChange} className='hidden' />
                    {formData.pdfFileName && <p className='mb-4 cursor-pointer text-blue-500' onClick={toggleModal}>Uploaded PDF: {formData.pdfFileName}</p>}
                    <div className='flex items-center'>
                        <button
                            onClick={handleClick}
                            className='px-6 py-2 mr-10 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition duration-300'
                        >
                            Submit
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
