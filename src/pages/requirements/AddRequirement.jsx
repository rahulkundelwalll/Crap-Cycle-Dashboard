import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar';
import userImage from '../../assets/user.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddRequirement() {
    const [formData, setFormData] = useState({
        category: {},
        quantity: "",
        requirementId: "",
        price: "",
        amount: "",
        note: "",
        buyer: {},
        address: "",
        imageFile: null,
        imagePreview: userImage
    });
    const [categories, setCategories] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [dropingAdd,setDropingAdd]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/category/categories');
                setCategories(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const res = await axios.get('/api/buyer/allbuyer');
                setBuyers(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBuyers();
    }, []);

    useEffect(() => {
        if(formData.buyer.b_id)
        {
            const deliveryAdd = async()=>{
                try{
                    const res = await axios.get(`/api/buyer/getbuyer/${formData.buyer.b_id}`);
                    setDropingAdd(res.data.dropingaddress)
                }catch(err)
                {
                    console.log(err);
                }
            }
            deliveryAdd()
        }
    }, [formData.buyer]);

    useEffect(() => {
        if (formData.quantity && formData.price) {
            const amount = parseFloat(formData.quantity) * parseFloat(formData.price);
            setFormData(prev => ({ ...prev, amount: amount.toFixed(2) }));
        }
    }, [formData.quantity, formData.price]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'buyer') {
            const buyer = JSON.parse(value);
            setFormData((prev) => ({
                ...prev,
                buyer: buyer,
                address: buyer.b_address
            }));
        } else if (name === 'category') {
            setFormData((prev) => ({
                ...prev,
                category: JSON.parse(value)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        if (files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
                imagePreview: name === 'imageFile' ? URL.createObjectURL(file) : prev.imagePreview
            }));
        }
    };

    const handleClick = async (event) => {
        event.preventDefault();
        
        const data = {
            req_quantity: formData.quantity,
            req_price: formData.price,
            req_status: "pending",
            req_note: formData.note,
            b_id: formData.buyer.b_id,
            b_name: formData.buyer.b_id,
            b_add: formData.buyer.b_address,
            b_drop_add: formData.address,
            b_mobile: formData.buyer.b_mobile,  // Corrected typo
            list_cat_id: formData.category.cat_id,
            cat_name: formData.category.cat_name,
            cat_image: formData.category.cat_image
        };
    
        // Debug: Check the contents of the data object
        console.log(data);
    
        try {
            const response = await axios.post('/api/requirement/add-requirement', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response.data);
            navigate('/requirementstatus')
        } catch (error) {
            console.error('Error adding requirement:', error);
        }
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
                        name='category'
                        value={JSON.stringify(formData.category)}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={JSON.stringify(category)}>{category.cat_name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name='categoryName'
                        value={formData.category.cat_id || ''}
                        placeholder='Category Name'
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
                        name='note'
                        value={formData.note}
                        onChange={handleChange}
                        placeholder='Note'
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <select
                        name='buyer'
                        value={JSON.stringify(formData.buyer)}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Buyer</option>
                        {buyers.map((buyer, index) => (
                            <option key={index} value={JSON.stringify(buyer)}>{buyer.b_name}</option>
                        ))}
                    </select>
                    <select
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        className='placeholder:text-center mb-4 p-1 w-3/4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Select Buyer</option>
                        {dropingAdd.map((add, index) => (
                            <option key={index} value={add.dropingAddress}>{add.dropingAddress}</option>
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
