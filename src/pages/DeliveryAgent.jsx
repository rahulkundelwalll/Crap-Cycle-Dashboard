import React from 'react';
import Sidebar from './../component/Sidebar';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

const data = [
    { id: 1, contactPerson: 'John Doe', AgentId: 'V001', phone: '123-456-7890', companyName: 'ABC Inc.', email: 'john.doe@example.com', address: '123 Main St', profile: 'Link to profile 1' },
    { id: 2, contactPerson: 'Jane Smith', AgentId: 'V002', phone: '987-654-3210', companyName: 'XYZ Corp.', email: 'jane.smith@example.com', address: '456 Oak Ave', profile: 'Link to profile 2' },
    // Add more rows as needed
];
export default function DeliveryAgent() {
    const navigate = useNavigate();
    return (
        <>
            <Sidebar page={'Delivery Agent'}>


                <div className='flex justify-end text-xl font-bold mt-5 '>
                    <button className=" bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3" onClick={(event)=>navigate('/addAgent')}>
                        + Add Agents
                    </button>
                </div>
                <div className="mx-auto pt-10 container w-sreen ">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{row.contactPerson}</td>
                                    <td className="py-2 px-4">{row.AgentId}</td>
                                    <td className="py-2 px-4">{row.phone}</td>
                                    <td className="py-2 px-4">{row.companyName}</td>
                                    <td className="py-2 px-4">{row.email}</td>
                                    <td className="py-2 px-4">{row.address}</td>
                                    <td className="py-2 px-4">

                                        <Link to='/Agentprofile' className="text-blue-500 hover:underline" >
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
    )
}
