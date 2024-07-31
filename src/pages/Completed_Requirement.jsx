import React from 'react';
import Sidebar from '../component/Sidebar';
const dummyData = {
  orderDetails: {
    requirementId: "RQ59934",
    categoryName: "Aluminium Sheets",
    overallQuantity: "200kg",
    categoryId: "AL59934",
    orderValue: 500000,
    pickUpDate: "12-12-2024",
  },
  buyerDetails: {
    name: "BGI India Pvt. Ltd.",
    phone: "+91-7942498211",
    address: "B-984, Okhala Phase 2, N.D-110023",
    dropLocation: "B-984, Okhala Phase 2, N.D-110023",
    buyerId: "BY120494",
  },
  completedOrders: [
    {
      sNo: 1,
      vendorName: "BGI India Pvt. Ltd.",
      vendorId: "VD23445",
      orderId: "OD1244",
      quantity: "50kg",
      pickupLocation: "B-984, Okhala Phase 2, N.D-110023",
      deliveryAgent: "Golu",
      deliveryAgentId: "DL34222",
      amount: "500rs",
      payment: "Paid",
    },
    {
      sNo: 2,
      vendorName: "BGI India Pvt. Ltd.",
      vendorId: "VD23445",
      orderId: "OD1244",
      quantity: "50kg",
      pickupLocation: "B-984, Okhala Phase 2, N.D-110023",
      deliveryAgent: "Guddu",
      deliveryAgentId: "DL34222",
      amount: "500rs",
      payment: "Unpaid",
    },
    {
      sNo: 3,
      vendorName: "BGI India Pvt. Ltd.",
      vendorId: "VD23445",
      orderId: "OD1244",
      quantity: "50kg",
      pickupLocation: "B-984, Okhala Phase 2, N.D-110023",
      deliveryAgent: "Munna",
      deliveryAgentId: "DL34222",
      amount: "500rs",
      payment: "Paid",
    },
    {
      sNo: 4,
      vendorName: "BGI India Pvt. Ltd.",
      vendorId: "VD23445",
      orderId: "OD1244",
      quantity: "50kg",
      pickupLocation: "B-984, Okhala Phase 2, N.D-110023",
      deliveryAgent: "Rajiv",
      deliveryAgentId: "DL34222",
      amount: "500rs",
      payment: "Unpaid",
    },
  ]
};

const CompletedRequirements = () => {
  const { orderDetails, buyerDetails, completedOrders } = dummyData;

  return (
    <Sidebar page={'Complete Requirements'}>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto mt-6">
     
      {/* Order Details Section */}
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
        {/* Buyer's Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="font-bold">Buyer's Details</h2>
          <p>Buyer's Name: {buyerDetails.name}</p>
          <p>Buyer's Phone No.: {buyerDetails.phone}</p>
          <p>Buyer's Address: {buyerDetails.address}</p>
          <p>Order drop location: {buyerDetails.dropLocation}</p>
          <p>Buyer's ID: {buyerDetails.buyerId}</p>
        </div>
      </div>

      {/* Completed Orders Table */}
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
