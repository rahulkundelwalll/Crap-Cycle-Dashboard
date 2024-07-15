import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import userImage from '.././assets/user.webp';
import { Link,useParams} from 'react-router-dom';
import axios from 'axios';



export default function DeliveryAgentProfile() {
    const [data, setData] = useState({});
    const id = useParams().id;
    
    // Example data
 
    // Example addresses
    React.useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`/api/delivery/agent-detail/${id}`)
                setData(res.data.data[0])
                
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    return (
        <Sidebar page={'Delivery Agent'}>
            <div className='flex justify-end text-xl font-bold mt-5'>
                <Link to='/addAgent' className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3">
                    + Add Agent
                </Link>
            </div>
            <div className='flex justify-center text-3xl font-bold mt-5 ms-10'>
                <span className="text-gray-400">Profile</span>
            </div>
            <div className='flex flex-col items-center h-4/6 w-4/5 mx-auto border-2 border-gray-400 rounded-3xl'>
                <img src={`../../upload/`+data.d_image} className='h-24  bg-cover mt-10 rounded-full' alt="User" />
                <div className='mt-10 w-full'>
                    <table className="table-auto border-collapse border border-white-400 w-full">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Contact Person:</td>
                                <td className="border px-4 py-2">{data.d_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Phone No.:</td>
                                <td className="border px-4 py-2">{data.d_mobile}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Agent ID:</td>
                                <td className="border px-4 py-2">{data.d_id}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Address:</td>
                                <td className="border px-4 py-2">{data.d_address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Email ID:</td>
                                <td className="border px-4 py-2">{data.d_email}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Company Name:</td>
                                <td className="border px-4 py-2">{data.d_company_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Location:</td>
                                <td className="border px-4 py-2">{data.d_location}</td>
                            </tr>
        
                        </tbody>
                    </table>
                </div>
                <div className='my-auto '>
                    <button
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Delet
                    </button>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Edit
                    </button>
                    <button
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl m-4`}
                    >
                        Save
                    </button>
                    
                </div>
            </div>

            
        </Sidebar>
    );
}
