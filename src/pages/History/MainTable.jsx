import React from 'react';
import Sidebar from '../../component/Sidebar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify
const searchOptions = ['requirement_id', 'category_name', 'category_id'];

export default function MainTableHistory() {
    const [data, setData] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchColumn, setSearchColumn] = React.useState('');
    const [requirementId, setRequirementId] = React.useState('');
    const [supplyId, setSupplyId] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [flag, setFlag] = React.useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/order/get-order-history');
                console.log(res);
                const fetchedData = res.data.data.map(item => ({
                    s_no: item.req_id,
                    order_id: item.order_id,
                    category_name: item.cat_name,
                    category_id: `CAT${item.list_cat_id}`,
                    supply_quantity: `${item.order_qty} kg`,
                    requirement_id: item.req_id,
                    supply_id: item.s_id,
                    status: item.order_status
                }));
                setData(fetchedData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [flag]);

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

    
    return (
        <>
            <Sidebar page={'MainOrder Table'}>
                
                    
                <div className="mx-auto pt-10 container w-screen overflow-auto">
                    <div className="min-w-full bg-white border border-gray-200 overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category ID</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Quantity</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement Id</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply Id</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{row.order_id}</td>
                                        <td className="py-2 px-4">{row.category_name}</td>
                                        <td className="py-2 px-4">{row.category_id}</td>
                                        <td className="py-2 px-4">{row.supply_quantity}</td>
                                        <td className="py-2 px-4">{row.requirement_id}</td>
                                        <td className="py-2 px-4">{row.supply_id}</td>
                                        <td className="py-2 px-4">{row.status}</td>
                                        <td className="py-2 px-4">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => navigate(`/order-info/${row.order_id}`)}>
                                                Info
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Sidebar>
            <ToastContainer />
        </>
    );
}
