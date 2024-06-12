import React from 'react';
import Sidebar from './../component/Sidebar';
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";

const data = [
    { id: 1, contactPerson: 'John Doe', vendorId: 'V001', phone: '123-456-7890', companyName: 'ABC Inc.', email: 'john.doe@example.com', address: '123 Main St', profile: 'Link to profile 1' },
    { id: 2, contactPerson: 'Jane Smith', vendorId: 'V002', phone: '987-654-3210', companyName: 'XYZ Corp.', email: 'jane.smith@example.com', address: '456 Oak Ave', profile: 'Link to profile 2' },
    // Add more rows as needed
];
export default function Vendor() {
    return (
        <>
            <Sidebar>
                
                <div className='flex items-center text-4xl font-bold mt-10 ms-5'>
                    <FaRegUserCircle style={{ color: 'green' }} className='text-4xl items-center mt-1 ' />
                    <h1 style={{ color: 'green' }}>{"Vendor "}</h1>
                </div>
                <div className='flex justify-end text-xl font-bold mt-5 '>
                    <button class=" bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3">
                        + Add Vendor
                    </button>
                </div>
                <div className="mx-auto pt-10 container w-sreen ">
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
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{row.contactPerson}</td>
                                    <td className="py-2 px-4">{row.vendorId}</td>
                                    <td className="py-2 px-4">{row.phone}</td>
                                    <td className="py-2 px-4">{row.companyName}</td>
                                    <td className="py-2 px-4">{row.email}</td>
                                    <td className="py-2 px-4">{row.address}</td>
                                    <td className="py-2 px-4">
                                        <button className="text-blue-500 hover:underline" onClick={() => window.open(row.profile, '_blank')}>
                                            View
                                        </button>
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
