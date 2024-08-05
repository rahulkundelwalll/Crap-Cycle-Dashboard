import React, { useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import axios from 'axios';

const sortByOptions = ['vendor_ratings', 'supply_quantity', 'supply_rate', 'price_range'];
const searchOptions = ['vendor_name'];

export default function SupplyTable() {
    const [data, setData] = React.useState([]);
    const [sortby, setSortBy] = React.useState('');
    const [ascending, setAscending] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchColumn, setSearchColumn] = React.useState('');
    const [notification, setNotification] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/supply/all-supply');
                console.log(res.data.results);
                const fetchedData = res.data.results.map(item => ({
                    s_id:item.s_id,
                    v_id:item.v_id,
                    cat_id:item.list_cat_id,
                    cat_name:item.cat_name,
                    id: item.id,  // Add ID for each item
                    vendor_name: item.v_name,
                    supply_quantity: item.s_qty,
                    supply_rate: item.s_price,
                    status: item.s_status,
                    approve_quantity: '',
                    price_range: '',
                    asked_price: '',
                    asked_quantity: ''
                }));
                setData(fetchedData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortClick = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortby) {
                if (ascending) {
                    return a[sortby] > b[sortby] ? 1 : -1;
                } else {
                    return a[sortby] < b[sortby] ? 1 : -1;
                }
            }
            return 0;
        });
        setData(sortedData);
        setAscending(!ascending);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchColumnChange = (event) => {
        setSearchColumn(event.target.value);
    };

    const handleSearchClick = () => {
        if (searchColumn) {
            const filteredData = data.filter(item =>
                item[searchColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            setData(filteredData);
        }
    };

    const handleApproveQuantityChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].approve_quantity = value;
        setData(updatedData);
    };

    const handlePriceRangeChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].price_range = value;
        setData(updatedData);
    };

    const handleAskedPriceChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].asked_price = value;
        setData(updatedData);
    };

    const handleAskedQuantityChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].asked_quantity = value;
        setData(updatedData);
    };

    const handleBellClick = async (item) => {
        const notificationData = {
            s_id: item.s_id,
            v_id: item.v_id,  // Make sure to include vendor_id in your data
            asked_price: item.asked_price,
            asked_quantity: item.asked_quantity,
            prev_price: item.supply_rate,
            prev_quantity: item.supply_quantity,
            cat_id: item.cat_id,  // Make sure to include cat_id in your data
            cat_name: item.cat_name  // Make sure to include cat_name in your data
        };

        try {
            const res = await axios.post('/api/notification/new-notification', notificationData);
            setNotification('Notification sent successfully!');
            setTimeout(() => setNotification(''), 3000);
        } catch (err) {
            console.log(err);
            setNotification('Failed to send notification.');
            setTimeout(() => setNotification(''), 3000);
     
        }
    };

    return (
        <>
            <Sidebar page={'Supply Table'}>
                <div className='flex justify-around items-center mt-5'>
                    <button
                        className='bg-white text-black px-4 py-2 rounded border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 ease-in-out'
                        onClick={() => navigate('/dashboard/requirement/allrequirement')}
                    >
                        Requirement Table
                    </button>
                    <button
                        className='bg-white text-black px-4 py-2 rounded border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 ease-in-out'
                        onClick={() => navigate('/supplytable')}
                    >
                        Supply Table
                    </button>
                    <button
                        className='bg-white text-black px-4 py-2 rounded border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 ease-in-out'
                        onClick={() => navigate('/maintable')}
                    >
                        Main Table
                    </button>
                </div>
                <div className='flex justify-around items-center mt-3'>
                    <select
                        name='sortby'
                        onChange={handleSortChange}
                        value={sortby}
                        className='text-center w-1/4 p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Sort By</option>
                        {sortByOptions.map((item, index) => (
                            <option key={index} value={item.trim()}>{item}</option>
                        ))}
                    </select>
                    <button className='bg-slate-400 hover:bg-slate-600 box-border rounded-2xl p-1 border-1 text-white' onClick={handleSortClick}>
                        {ascending ? 'High To Low' : 'Low To High'}
                    </button>
                    <select
                        name='searchColumn'
                        onChange={handleSearchColumnChange}
                        value={searchColumn}
                        className='text-center w-1/4 p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Search By</option>
                        {searchOptions.map((item, index) => (
                            <option key={index} value={item.trim()}>{item}</option>
                        ))}
                    </select>
                    <input
                        type='text'
                        placeholder='Search term'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='text-center w-1/4 p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <CiSearch className='cursor-pointer hover:scale-125 text-2xl ease-in duration-300' onClick={handleSearchClick} />
                </div>
                {notification && (
                    <div className="fixed bottom-5 right-5 bg-blue-500 text-white p-2 rounded shadow-lg">
                        {notification}
                    </div>
                )}
                <div className="mx-auto pt-10 container w-screen">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Id</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Quantity</th>
                               
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Rate</th>
                               
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price </th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{row.vendor_name}</td>
                                    <td className="py-2 px-4">{row.s_id}</td>
                                    <td className="py-2 px-4">{row.supply_quantity}</td>
                                    
                                    <td className="py-2 px-4">{row.supply_rate}</td>
                                    
                                    <td className="py-2 px-4 text-center">
                                        <input 
                                            type="text" 
                                            placeholder="" 
                                            value={row.asked_price} 
                                            onChange={(e) => handleAskedPriceChange(index, e.target.value)} 
                                            className="text-center w-full p-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <input 
                                            type="text" 
                                            placeholder="" 
                                            value={row.asked_quantity} 
                                            onChange={(e) => handleAskedQuantityChange(index, e.target.value)} 
                                            className="text-center w-full p-1 border border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4">{row.status}</td>
                                    <td className="py-2 px-4 text-center">
                                        <FaBell 
                                            className='cursor-pointer text-xl hover:text-blue-500' 
                                            onClick={() => handleBellClick(row)} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Sidebar>
        </>
    );
}
