import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import axios from 'axios';

const OrderManagement = () => {
  const { id } = useParams(); // Fetch orderId from URL parameters
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Fetch data from backend using orderId from params
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`/api/order/get-order-detail/${id}`); // Replace with your API endpoint
        setOrderData(response.data.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [id]); // Dependency on orderId to refetch when it changes

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const {
    order_id, cat_name, list_cat_id, order_qty, order_price, order_status, payment,
    b_name, b_mobile, b_drop_address,
    d_id, d_name, d_phone,
    v_id, v_name, v_mobile, v_address,
    order_otp
  } = orderData[0];

  

  return (
    <Sidebar page={'Order Management'}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order ID Section */}
          <div className="col-span-2  p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-xl">Order ID: <span className="text-blue-600">{order_id}</span></h2>
                <p className="text-gray-700">Category Name: {cat_name}</p>
                <p className="text-gray-700">Category ID: {list_cat_id}</p>
                <p className="text-gray-700">Quantity: {order_qty}</p>
                <p className="text-gray-700">Order Price: ₹{order_price}</p>
                <p className="text-gray-700">Order Status: <span className="text-yellow-500">{order_status}</span></p>
                <p className="text-gray-700">Payment Status: <span className="text-red-500">{payment}</span></p>
              </div>
              <div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full mr-2">Complete</button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">Delete</button>
              </div>
            </div>
          </div>

          {/* Buyer's Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-lg text-blue-600">Buyer Details</h2>
            <p className="text-gray-700">Name: {b_name}</p>
            <p className="text-gray-700">Phone: {b_mobile}</p>
            <p className="text-gray-700">Drop Location: {b_drop_address}</p>
          </div>

          {/* Delivery Agent Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-lg text-blue-600">Delivery Agent Details</h2>
            {d_id ? (
              <>
                <p className="text-gray-700">ID: {d_id}</p>
                <p className="text-gray-700">Name: {d_name}</p>
                <p className="text-gray-700">Phone: {d_phone}</p>
              </>
            ) : (
              <p className="text-gray-700">No delivery agent assigned</p>
            )}
            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mr-2">Assign</button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">Remove</button>
            </div>
          </div>

          {/* Vendor's Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-lg text-blue-600">Vendor Details</h2>
            <p className="text-gray-700">ID: {v_id}</p>
            <p className="text-gray-700">Name: {v_name}</p>
            <p className="text-gray-700">Phone: {v_mobile}</p>
            <p className="text-gray-700">Address: {v_address}</p>
            <p className="text-gray-700">OTP: <span>{order_otp}</span></p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default OrderManagement;
