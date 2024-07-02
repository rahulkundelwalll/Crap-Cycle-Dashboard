import React from 'react';
import Sidebar from './../component/Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default function Buyer() {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [perPage] = React.useState(10);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/buyer/allbuyer');
                setData(res.data.data);
                console.log(typeof res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * perPage;
    const currentData = data.slice(offset, offset + perPage);

    return (
        <>
            <Sidebar page={'Buyers'}>
                <div className='flex justify-end text-xl font-bold mt-5 '>
                    <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={() => navigate('/addBuyer')}>
                        + Add Buyers
                    </button>
                </div>
                <div className="mx-auto pt-10 container w-sreen ">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1 + offset}</td>
                                    <td className="py-2 px-4">{row.b_name}</td>
                                    <td className="py-2 px-4">{row.b_id}</td>
                                    <td className="py-2 px-4">{row.b_mobile}</td>
                                    <td className="py-2 px-4">{row.b_company_name}</td>
                                    <td className="py-2 px-4">{row.b_email}</td>
                                    <td className="py-2 px-4">{row.b_address}</td>
                                    <td className="py-2 px-4">
                                        <Link to={`/Buyerprofile/${row.b_id}`} className="text-blue-500 hover:underline">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(data.length / perPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'flex space-x-2'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                            previousLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                            nextLinkClassName={'page-link bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100'}
                            activeLinkClassName={'bg-gray-200 font-bold'}
                        />
                    </div>
                </div>
            </Sidebar>
        </>
    );
}
