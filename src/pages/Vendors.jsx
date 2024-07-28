import React from 'react';
import Sidebar from './../component/Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Vendor() {
    const [data, setData] = React.useState([]); // State to hold fetched data
    const [searchQuery, setSearchQuery] = React.useState(''); // State to hold search query

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/vendor/get-vendors');
                setData(res.data.data); // Set fetched data to state
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter(row => 
        row.v_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.v_id.toString().includes(searchQuery.toLowerCase()) ||
        row.v_mobile.includes(searchQuery) ||
        row.v_companyname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.v_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.v_address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Sidebar page={'Vendor'}>
                <div className="flex justify-end text-xl font-bold mt-5 ">
                    <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={() => navigate('/dashboard/vendor/add')}>
                        + Add Vendor
                    </button>
                </div>
                <div className="mx-auto pt-10 container w-screen">
                    <div className="mb-4 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border border-gray-300 rounded-3xl w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{row.v_name}</td>
                                    <td className="py-2 px-4">{row.v_id}</td>
                                    <td className="py-2 px-4">{row.v_mobile}</td>
                                    <td className="py-2 px-4">{row.v_companyname}</td>
                                    <td className="py-2 px-4">{row.v_email}</td>
                                    <td className="py-2 px-4">{row.v_address}</td>
                                    <td className="py-2 px-4">
                                        <Link to={`/dashboard/vendor/profile/${row.v_id}`} className="text-blue-500 hover:underline">
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
