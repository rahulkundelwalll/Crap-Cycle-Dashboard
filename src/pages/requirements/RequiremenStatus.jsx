import React from 'react';
import Sidebar from '../../component/Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";



const initialData = [
    {
        "s_no": 1,
        "category_name": "Electronics",
        "category_id": "CAT123",
        "Quantity": 100,
        "Date": "12/01/24",
        "Requirement_ID": 50,
        "Price": 4500,
        "Final_Amount": 450000,
        "status": "Pending"
    },
    {
        "s_no": 2,
        "category_name": "Electronics",
        "category_id": "CAT124",
        "Quantity": 150,
        "Date": "13/01/24",
        "Requirement_ID": 51,
        "Price": 4200,
        "Final_Amount": 630000,
        "status": "Confirmed"
    },
    {
        "s_no": 3,
        "category_name": "Electronics",
        "category_id": "CAT125",
        "Quantity": 200,
        "Date": "14/01/24",
        "Requirement_ID": 52,
        "Price": 4000,
        "Final_Amount": 800000,
        "status": "Cancelled"
    },
    {
        "s_no": 4,
        "category_name": "Electronics",
        "category_id": "CAT126",
        "Quantity": 250,
        "Date": "15/01/24",
        "Requirement_ID": 53,
        "Price": 3800,
        "Final_Amount": 950000,
        "status": "Delivered"
    },
    {
        "s_no": 5,
        "category_name": "Electronics",
        "category_id": "CAT127",
        "Quantity": 300,
        "Date": "16/01/24",
        "Requirement_ID": 54,
        "Price": 3700,
        "Final_Amount": 1110000,
        "status": "Pending"
    }
]
;


const sortByOptions = ['current_requirement', 'bidden_requirement', 'no_of_listing', 'no_of_bidding'];
const searchOptions = ['category_name', 'category_id', 'category_details'];
const filterList = ['Pending' , 'Confirmed', 'Cancelled' ,'Delivered']

export default function RequiremenStatus() {
    const [data, setData] = React.useState(initialData);
    const [sortby, setSortBy] = React.useState('');
    const [ascending, setAscending] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchColumn, setSearchColumn] = React.useState('');
    const [filter,setFilter]= React.useState('')
    const navigate = useNavigate();

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
    const handlefilterStatusChange = (event)=>{
        setFilter(event.target.value)
    }

    const handleSearchClick = () => {
        if (searchColumn) {
            const filteredData = initialData.filter(item => 
                item[searchColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            setData(filteredData);
        }
    };
    const handleFilterClick = ()=>{
        const filtercol = "status";
        if (filter) {
            const filteredData = initialData.filter(item => 
                item[filtercol].toString().toLowerCase().includes(filter.toLowerCase())
            );
            setData(filteredData);
        }
    }

    return (
        <>
            <Sidebar page={'Requirement Management'}>
                <div className='flex justify-end text-xl font-bold mt-5'>
                    <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={(event) => navigate('/addcategory')}>
                        + Add Category
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
                    {/* <button >
                        Search
                    </button> */}
                    < CiSearch className='cursor-pointer hover:scale-125  text-2xl ease-in duration-300' onClick={handleSearchClick} />
                </div>
                <div className='flex justify-around items-center mt-3'>
                <select
                        name='searchColumn'
                        onChange={handlefilterStatusChange}
                        value={filter}
                        className='text-center w-3/4 p-1 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="" disabled>Filter By</option>
                        {filterList.map((item, index) => (
                            <option key={index} value={item.trim()}>{item}</option>
                        ))}
                    </select>
                    < FaFilter className='cursor-pointer hover:text-gray-400  text-2xl ease-in duration-100' onClick={handleFilterClick} />
                </div>
                <div className="mx-auto pt-10 container w-screen">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Amount</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{row.category_name}</td>
                                    <td className="py-2 px-4">{row.category_id}</td>
                                    <td className="py-2 px-4">{row.Quantity}</td>
                                    <td className="py-2 px-4">{row.Date}</td>
                                    <td className="py-2 px-4">{row.Requirement_ID}</td>
                                    <td className="py-2 px-4">{row.Price}</td>
                                    <td className="py-2 px-4">{row.Final_Amount}</td>
                                    <td className="py-2 px-4">{row.status}</td>
                                    <td className="py-2 px-4">
                                        <Link to='/CategoryDetail' className="text-blue-500 hover:underline">
                                            View
                                        </Link>
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
