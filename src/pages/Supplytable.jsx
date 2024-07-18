import React from 'react';
import Sidebar from '../component/Sidebar';
import { CiSearch } from "react-icons/ci";

const initialData = [
    {
        "s_no": 1,
        "vendor_name": "Crapcycle",
        "vendor_ratings": 4.1,
        "supply_quantity": "1000 kg",
        "approve_quantity": "",
        "supply_rate": 27,
        "price_range": "",
        "status": "Pending"
    }
];

const sortByOptions = ['vendor_ratings', 'supply_quantity', 'supply_rate', 'price_range'];
const searchOptions = ['vendor_name'];

const requirementDetails = {
    requirement_id: "DL59923",
    category_name: "Aluminium",
    category_id: "DL59984",
    requirement: "2000 kg",
    pending_requirement: "1000 kg",
    number_of_vendors: 4,
    buying_price: "50rs"
};

export default function SupplyTable() {
    const [data, setData] = React.useState(initialData);
    const [sortby, setSortBy] = React.useState('');
    const [ascending, setAscending] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchColumn, setSearchColumn] = React.useState('');

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
            const filteredData = initialData.filter(item => 
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
                <div className="mt-5 p-5 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p><strong>Requirement ID:</strong> {requirementDetails.requirement_id}</p>
                            <p><strong>Category Name:</strong> {requirementDetails.category_name}</p>
                            <p><strong>Category ID:</strong> {requirementDetails.category_id}</p>
                        </div>
                        <div>
                            <p><strong>Requirement:</strong> {requirementDetails.requirement}</p>
                            <p><strong>Pending Requirement:</strong> {requirementDetails.pending_requirement}</p>
                            <p><strong>Number of Vendors:</strong> {requirementDetails.number_of_vendors}</p>
                            <p><strong>Buying Price:</strong> {requirementDetails.buying_price}</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-green-500 text-white px-4 py-2 rounded">Completed</button>
                    </div>
                </div>
                <div className="mx-auto pt-10 container w-screen">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Ratings</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approve Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Rate</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{row.vendor_name}</td>
                                    <td className="py-2 px-4">
                                        <div className="flex items-center">
                                            <span className="text-yellow-500">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <i key={i} className={`fas fa-star ${i < Math.floor(row.vendor_ratings) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                                                ))}
                                            </span>
                                            <span className="ml-2">{row.vendor_ratings}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">{row.supply_quantity}</td>
                                    <td className="py-2 px-4 text-center">
                                        <input 
                                            type="text" 
                                            placeholder="Approve Quantity" 
                                            value={row.approve_quantity} 
                                            onChange={(e) => handleApproveQuantityChange(index, e.target.value)} 
                                            className="text-center w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        />
                                    </td>
                                    <td className="py-2 px-4">{row.supply_rate}</td>
                                    <td className="py-2 px-4 text-center">
                                        <input 
                                            type="text" 
                                            placeholder="Price Range" 
                                            value={row.price_range} 
                                            onChange={(e) => handlePriceRangeChange(index, e.target.value)} 
                                            className="text-center w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        />
                                    </td>
                                    <td className="py-2 px-4" style={{color: row.status === 'Pending' ? 'red' : 'black'}}>
                                        {row.status}
                                    </td>
                                    <td className="py-2 px-4">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
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
