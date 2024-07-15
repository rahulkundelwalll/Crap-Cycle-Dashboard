import React from 'react';
import Sidebar from './../component/Sidebar';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import axios from 'axios';



export default function DeliveryAgent() {
    const [data,setData] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get('/api/delivery/get-all-agent');
                setData(res.data.data);
                // console.log(res.data.data)
            }catch(err){
                console.log(err);
            }
            

        }
        fetchData();
    },[])


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
                                    <td className="py-2 px-4">{row.d_name}</td>
                                    <td className="py-2 px-4">{row.d_id}</td>
                                    <td className="py-2 px-4">{row.d_mobile}</td>
                                    <td className="py-2 px-4">{row.d_company_name}</td>
                                    <td className="py-2 px-4">{row.d_email}</td>
                                    <td className="py-2 px-4">{row.d_address}</td>
                                    <td className="py-2 px-4">

                                        <Link to={`/Agentprofile/${row.d_id}`} className="text-blue-500 hover:underline" >
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
