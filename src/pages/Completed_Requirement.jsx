import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../component/Sidebar';

const CompletedRequirements = () => {
    const { id } = useParams(); // Extract the ID from the route parameters
    const [orderDetails, setOrderDetails] = useState({});
    const [buyerDetails, setBuyerDetails] = useState({});
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`/api/order/get-requirement-order/${id}`);
                console.log(res);
                setOrderDetails(res.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        const fetchBuyerDetails = async () => {
            try {
                const res = await axios.get(`/api/buyer/details/${id}`);
                setBuyerDetails(res.data);
            } catch (error) {
                console.error('Error fetching buyer details:', error);
            }
        };

        const fetchCompletedOrders = async () => {
            try {
                const res = await axios.get(`/api/order/completed/${id}`);
                setCompletedOrders(res.data);
            } catch (error) {
                console.error('Error fetching completed orders:', error);
            }
        };

        fetchOrderDetails();
        fetchBuyerDetails();
        fetchCompletedOrders();
    }, [id]); // Dependency array includes the ID

    return (
        <Sidebar page={'Complete Requirements'}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto mt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="font-bold">Order Details</h2>
                        <p>Requirement ID: {orderDetails.requirementId}</p>
                        <p>Category Name: {orderDetails.categoryName}</p>
                        <p>Overall Quantity: {orderDetails.overallQuantity}</p>
                        <p>Category ID: {orderDetails.categoryId}</p>
                        <p>Order Value: {orderDetails.orderValue}</p>
                        <p>Pick up Date: {orderDetails.pickUpDate}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="font-bold">Buyer's Details</h2>
                        <p>Buyer's Name: {buyerDetails.name}</p>
                        <p>Buyer's Phone No.: {buyerDetails.phone}</p>
                        <p>Buyer's Address: {buyerDetails.address}</p>
                        <p>Order drop location: {buyerDetails.dropLocation}</p>
                        <p>Buyer's ID: {buyerDetails.buyerId}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.no</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order pickup location</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Agent</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Agent ID</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {completedOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{order.sNo}</td>
                                    <td className="py-2 px-4">{order.vendorName}</td>
                                    <td className="py-2 px-4">{order.vendorId}</td>
                                    <td className="py-2 px-4">{order.orderId}</td>
                                    <td className="py-2 px-4">{order.quantity}</td>
                                    <td className="py-2 px-4">{order.pickupLocation}</td>
                                    <td className="py-2 px-4">{order.deliveryAgent}</td>
                                    <td className="py-2 px-4">{order.deliveryAgentId}</td>
                                    <td className="py-2 px-4">{order.amount}</td>
                                    <td className="py-2 px-4">
                                        <span className={`px-2 py-1 rounded-full text-white ${order.payment === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Sidebar>
    );
};

export default CompletedRequirements;
