import React, { useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const sortByOptions = ['vendor_ratings', 'supply_quantity', 'supply_rate', 'price_range'];
const searchOptions = ['vendor_name'];

export default function SupplyTable() {
    const [data, setData] = React.useState([]);
    const [sortby, setSortBy] = React.useState('');
    const [ascending, setAscending] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchColumn, setSearchColumn] = React.useState('');
    const [notification, setNotification] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/supply/pending-supply');

                const fetchedData = res.data.results.map(item => ({
                    s_id: item.s_id,
                    v_id: item.v_id,
                    cat_id: item.list_cat_id,
                    cat_name: item.cat_name,
                    id: item.id,  // Add ID for each item
                    vendor_name: item.v_name,
                    supply_quantity: item.s_qty,
                    supply_rate: item.s_price,
                    status: item.s_status,
                    asked_price: '',
                    lower_limit: '',
                    upper_limit: '',
                    asked_quantity: '',
                    vendor_supply: item.vendor_supply
                }));

                setData(fetchedData);
                console.log(fetchedData);
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
            setCurrentPage(0); // Reset to first page after search
        }
    };

    const handleApproveQuantityChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].approve_quantity = value;
        setData(updatedData);
    };

    const handleLowerLimitChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].lower_limit = value;
        setData(updatedData);
    };

    const handleUpperLimitChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index].upper_limit = value;
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
            v_id: item.v_id,
            asked_price: `${item.lower_limit}-${item.upper_limit}`,
            asked_quantity: item.asked_quantity,
            prev_price: item.supply_rate,
            prev_quantity: item.supply_quantity,
            cat_id: item.cat_id,
            cat_name: item.cat_name,
            lower_price:item.lower_limit,
            upper_price:item.upper_limit
        };

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/notification/new-notification', notificationData);
            setNotification('Notification sent successfully!');
            setTimeout(() => setNotification(''), 3000);
        } catch (err) {
            console.log(err);
            setNotification('Failed to send notification.');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const displayedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <Sidebar page={'Supply Table'}>
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
                <div className="mx-auto pt-10 container">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Id</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Id</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Rate</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lower Limit</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upper Limit</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((item, index) => (
                                <tr key={item.s_id} className="border-b border-gray-200">
                                    <td className="py-2 px-4 text-sm text-gray-700">{currentPage * itemsPerPage + index + 1}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.vendor_name}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.cat_name}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.cat_id}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.s_id}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.supply_quantity}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.vendor_supply}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">
                                    {parseFloat(item.supply_rate).toFixed(2)}
                                        </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="number"
                                            className="text-center w-full p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={item.lower_limit}
                                            onChange={(e) => handleLowerLimitChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="number"
                                            className="text-center w-full p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={item.upper_limit}
                                            onChange={(e) => handleUpperLimitChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="number"
                                            className="text-center w-full p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={item.asked_quantity}
                                            onChange={(e) => handleAskedQuantityChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{item.status}</td>
                                    <td className="py-2 px-4 text-center">
                                        <FaBell
                                            className="cursor-pointer hover:scale-125 text-2xl ease-in duration-300"
                                            onClick={() => handleBellClick(item)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(data.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination flex justify-center mt-4'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                        activeClassName={'bg-blue-500 text-white'}
                    />

                </div>
            </Sidebar>
        </>
    );
}
