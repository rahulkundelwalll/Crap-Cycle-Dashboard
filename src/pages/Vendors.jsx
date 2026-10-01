import React from 'react';
import Sidebar from './../component/Sidebar';
import DataTable from '../component/DataTable';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import * as vendorApi from '../api/vendor';

const columns = [
    { header: 'Contact Person', render: (row) => row.v_name },
    { header: 'Vendor ID', render: (row) => row.v_id },
    { header: 'Phone No.', render: (row) => row.v_mobile },
    { header: 'Company Name', render: (row) => row.v_companyname },
    { header: 'Email ID', render: (row) => row.v_email },
    { header: 'Address', render: (row) => row.v_address },
    {
        header: 'Profile',
        render: (row) => (
            <Link to={`/dashboard/vendor/profile/${row.v_id}`} className="text-blue-500 hover:underline">
                View
            </Link>
        ),
    },
];

export default function Vendor() {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await vendorApi.getVendors();
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <Sidebar page={'Vendor'}>
            <div className="flex justify-end text-xl font-bold mt-5">
                <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={() => navigate('/dashboard/vendor/add')}>
                    + Add Vendor
                </button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                searchFields={['v_name', 'v_id', 'v_mobile', 'v_companyname', 'v_email', 'v_address']}
            />
        </Sidebar>
    );
}
