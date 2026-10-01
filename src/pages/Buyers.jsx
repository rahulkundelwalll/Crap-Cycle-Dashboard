import React from 'react';
import Sidebar from './../component/Sidebar';
import DataTable from '../component/DataTable';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import * as buyerApi from '../api/buyer';

const columns = [
    { header: 'Contact Person', render: (row) => row.b_name },
    { header: 'Buyer ID', render: (row) => row.b_id },
    { header: 'Phone No.', render: (row) => row.b_mobile },
    { header: 'Company Name', render: (row) => row.b_company_name },
    { header: 'Email ID', render: (row) => row.b_email },
    { header: 'Address', render: (row) => row.b_address },
    {
        header: 'Profile',
        render: (row) => (
            <Link to={`/dashboard/buyer/profile/${row.b_id}`} className="text-blue-500 hover:underline">
                View
            </Link>
        ),
    },
];

export default function Buyer() {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await buyerApi.getBuyers();
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <Sidebar page={'Buyers'}>
            <div className="flex justify-end text-xl font-bold mt-5">
                <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={() => navigate('/dashboard/buyer/add')}>
                    + Add Buyer
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                searchFields={['b_name', 'b_id', 'b_mobile', 'b_company_name', 'b_email', 'b_address']}
            />
        </Sidebar>
    );
}
