import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import ConfirmationModal from '../component/ConfirmationModal';
import { toast } from 'react-toastify';
const OrderManagement = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({ d_id: '', d_mobile: '', d_name: '' });
  const [pickupDate, setPickupDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`/api/order/get-order-detail/${id}`);
      setOrderData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  useEffect(() => {
    fetchOrderData();
    
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`/api/delivery/get-all-agent`);
        setAgents(response.data.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchOrderData();
    fetchAgents();
  }, [id]);

  const handleAgentChange = (event) => {
    const agentId = event.target.value;
    const agent = agents.find(agent => agent.d_id === parseInt(agentId));
    if (agent) {
      setSelectedAgent(agent);
      console.log(selectedAgent);
    } else {
      setSelectedAgent({ d_id: '', d_mobile: '', d_name: '' });
    }
  };

  const handleDateChange = (event) => {
    setPickupDate(event.target.value);
  };

  const handleAssign = async () => {
    try {
      await axios.patch(`/api/order/assign-deleveryagent/${orderData[0].order_id}`, {
        d_id: selectedAgent.d_id,
        d_name: selectedAgent.d_name,
        d_phone: selectedAgent.d_mobile,
        pick_up: pickupDate
      });
      // Update the local state to reflect the assigned agent
      setOrderData(prevState => [{
        ...prevState[0],
        d_id: selectedAgent.d_id,
        d_name: selectedAgent.d_name,
        d_mobile: selectedAgent.d_mobile,
        pick_up: pickupDate
      }]);
    } catch (error) {
      console.error('Error assigning agent:', error);
    }
  };


  const handleStatus = async (status) => {
    try {
      const res = await axios.patch(`/api/order/changestatus/${orderData[0].order_id}`, { status: status });
      console.log(res);
      fetchOrderData();
    } catch (err) {
      console.log(err);
    }
  }
  const handleRemove = async () => {
    try {
      await axios.post(`/api/order/remove-agent/${orderData[0].order_id}`, {
        order_id: orderData[0].order_id
      });
      // Update the local state to reflect the removed agent
      setOrderData(prevState => [{
        ...prevState[0],
        d_id: null,
        d_name: null,
        d_mobile: null,
        pick_up: null
      }]);
      setPickupDate('');
    } catch (error) {
      console.error('Error removing agent:', error);
    }
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const {
    order_id, cat_name, list_cat_id, order_qty, order_price, order_status, b_id,
    b_name, b_mobile, b_drop_address,
    v_id, v_name, v_mobile, v_address,
    order_otp, d_id, d_mobile, d_name, pick_up, d_phone
  } = orderData[0];


  const handleComplete = () => {
    // <ConfirmationModal/>
    setShowModal(true);
  }

  const handleTransitionStatus = async (transitionId) => {
    console.log(transitionId)
    if(!transitionId)
      {
          toast.error("Enter Transition Id");
          return;
      }
    try {
      const res = await axios.patch(`/api/order/add-transitionId/${orderData[0].order_id}`,{
        transitionId:transitionId
      })
      if(res.status===200)
      {
        fetchOrderData();
      
      }
      

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Sidebar page={'Order Management'}>
      <div className="bg-white p-6 rounded-lg max-w-screen-lg mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded-full ml-auto"
            onClick={handleComplete}>
            Completed
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order ID Section */}
          <div className="col-span-2 p-6 rounded-lg shadow-md flex flex-wrap justify-between items-start">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h3 className="font-bold text-lg">Order ID: <span>{order_id}</span></h3>
              <p className="text-gray-700">Category Name: {cat_name}</p>
              <p className="text-gray-700">Category ID: {list_cat_id}</p>
              <p className="text-gray-700">Requirement ID: RQ59934</p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-700">Quantity: {order_qty}kg</p>
              <p className="text-gray-700">Order Value: ₹{order_price}</p>
              <p className="text-gray-700 w-full">Order Status: <span>{order_status}</span></p>
            </div>
            <div className="flex mt-2">
              <button onClick={async () => { await handleStatus("Delivered") }} className="border-2 border-green-600 bg-green-600 text-white hover:bg-white hover:text-green-600 px-4 py-2 rounded-full mr-2">Delivered</button>
              <button onClick={async () => { await handleStatus("Rejected") }} className="border-2 border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 px-4 py-2 rounded-full">Rejected</button>
            </div>
          </div>

          {/* Buyer’s Section */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Buyer’s ID: {b_id}</h3>
              <p className="text-gray-700">Name: {b_name}</p>
              <p className="text-gray-700">Phone: {b_mobile}</p>
              <p className="text-gray-700">Drop Location: {b_drop_address}</p>
            </div>
            <hr></hr>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Vendor’s ID: {v_id}</h3>
              <p className="text-gray-700">Name: {v_name}</p>
              <p className="text-gray-700">Phone: {v_mobile}</p>
              <p className="text-gray-700">Address: {v_address}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">OTP: <span className="text-green-600 font-semibold">{order_otp}</span></p>
              </div>
            </div>
          </div>

          {/* Delivery Agent Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg">Delivery Agent Info</h3>
            {d_id ? (
              <>
                <p className="text-gray-700">Id: {d_id}</p>
                <p className="text-gray-700">Name: {d_name}</p>
                <p className="text-gray-700">Phone: {d_phone || d_mobile}</p>
                <p className="text-gray-700">Pickup: {pick_up}</p>
                <div className="flex mt-4 justify-between">
                  <button onClick={handleRemove} className="border-2 border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 px-4 py-2 rounded-full">Remove</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700">Id: {selectedAgent.d_id}</p>
                <p className="text-gray-700">Name:
                  <select
                    onChange={handleAgentChange}
                    value={selectedAgent.d_id}
                    className="border-2 border-gray-300 rounded-full px-2 py-1 "
                  >
                    <option value="">Select Agent</option>
                    {agents.map(agent => (
                      <option key={agent.d_id} value={agent.d_id}>{agent.d_name}</option>
                    ))}
                  </select>
                </p>
                <p className="text-gray-700">Phone: {selectedAgent.d_mobile}</p>
                <div className="mt-4">
                  <label htmlFor="pickup-date" className="block text-gray-700">Pickup Date:</label>
                  <input
                    type="date"
                    id="pickup-date"
                    className="border-2 border-gray-300 rounded-full px-4 py-2 w-full"
                    value={pickupDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="flex mt-4 justify-between">
                  <button onClick={handleAssign} className="border-2 border-green-600 bg-green-600 text-white hover:bg-white hover:text-green-600 px-4 py-2 rounded-full">Assign</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleTransitionStatus}
      />
    </Sidebar>
  );
};

export default OrderManagement;
