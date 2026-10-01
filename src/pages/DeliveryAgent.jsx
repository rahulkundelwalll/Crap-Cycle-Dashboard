import React from 'react';
import Sidebar from './../component/Sidebar';
import DataTable from '../component/DataTable';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import * as deliveryAgentApi from '../api/deliveryAgent';

const columns = [
    { header: 'Contact Person', render: (row) => row.d_name },
    { header: 'Agent ID', render: (row) => row.d_id },
    { header: 'Phone No.', render: (row) => row.d_mobile },
    { header: 'Company Name', render: (row) => row.d_company_name },
    { header: 'Email ID', render: (row) => row.d_email },
    { header: 'Address', render: (row) => row.d_address },
    {
        header: 'Profile',
        render: (row) => (
            <Link to={`/dashboard/delivery_agent/profile/${row.d_id}`} className="text-blue-500 hover:underline">
                View
            </Link>
        ),
    },
];

export default function DeliveryAgent() {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await deliveryAgentApi.getAgents();
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <Sidebar page={'Delivery Agent'}>
            <div className="flex justify-end text-xl font-bold mt-5">
                <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={() => navigate('/dashboard/delivery_agent/add')}>
                    + Add Agents
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                searchFields={['d_name', 'd_id', 'd_mobile', 'd_company_name', 'd_email', 'd_address']}
            />
        </Sidebar>
    );
}
