import React from 'react';
import Sidebar from '../component/Sidebar';
const dummyData = {
  orderId: "OR12444",
  categoryName: "Aluminium Sheets",
  categoryId: "AL59934",
  requirementId: "RQ59934",
  quantity: "200kg",
  orderValue: 500000,
  orderDate: "12-12-2024",
  status: "Pending",
  buyer: {
    id: "BY12444",
    name: "BGI India Pvt. Ltd.",
    phone: "+91-7942498211",
    address: "B-984, Okhala Phase 2, N.D-110023",
    dropLocation: "B-984, Okhala Phase 2, N.D-110023"
  },
  deliveryAgent: {
    id: "DL12444",
    name: "John Doe",
    phone: "+91-7942498211",
    address: "B-984, Okhala Phase 2, N.D-110023",
    pickUpDate: "17-12-2024"
  },
  vendor: {
    id: "VD12444",
    name: "BGI India Pvt. Ltd.",
    phone: "+91-7942498211",
    address: "B-984, Okhala Phase 2, N.D-110023",
    dropLocation: "B-984, Okhala Phase 2, N.D-110023",
    otp: "4357",
    otpStatus: "Confirmed"
  }
};

const OrderMangement = () => {
  const { 
    orderId, categoryName, categoryId, requirementId, quantity, orderValue, orderDate, status, 
    buyer, deliveryAgent, vendor 
  } = dummyData;

  return (
    <Sidebar page={'Order Management'}>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-md mx-auto mt-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Order ID Section */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">Order ID: <span>{orderId}</span></h2>
              <p>Category Name: {categoryName}</p>
              <p>Category ID: {categoryId}</p>
              <p>Requirement ID: {requirementId}</p>
              <p>Quantity: {quantity}</p>
              <p>Order Value: {orderValue}</p>
              <p>Order Date: {orderDate}</p>
              <p>Status: <span className="text-yellow-500">{status}</span></p>
            </div>
            <div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full mr-2">Complete</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full">Delete</button>
            </div>
          </div>
        </div>

        {/* Buyer's ID Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg">Buyer ID: {buyer.id}</h2>
          <p>Buyer Name: {buyer.name}</p>
          <p>Buyer Phone No.: {buyer.phone}</p>
          <p>Buyer Address: {buyer.address}</p>
          <p>Order drop location: {buyer.dropLocation}</p>
        </div>

        {/* Delivery Agent ID Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg">Delivery Agent ID: {deliveryAgent.id}</h2>
          <p>Delivery Agent's Name: {deliveryAgent.name}</p>
          <p>Pick up Date: {deliveryAgent.pickUpDate}</p>
          <p>Delivery Agent's Phone No.: {deliveryAgent.phone}</p>
          <p>Delivery Agent's Address: {deliveryAgent.address}</p>
          <div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full mr-2">Assign</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Remove</button>
          </div>
        </div>

        {/* Vendor's ID Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg">Vendor's ID: {vendor.id}</h2>
          <p>Vendor's Name: {vendor.name}</p>
          <p>Vendor's Phone No.: {vendor.phone}</p>
          <p>Vendor's Address: {vendor.address}</p>
          <p>Order drop location: {vendor.dropLocation}</p>
          <p>OTP: <span>{vendor.otp}</span></p>
          <p>OTP Status: <span className="text-green-500">{vendor.otpStatus}</span></p>
        </div>
      </div>
     
    </div>
    </Sidebar>
  );
};

export default OrderMangement;
