import React from 'react'
import Sidebar from './component/Sidebar'
import Vendor from './pages/Vendors';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import BuyerProfile from './pages/BuyerProfile';
import AddVendor from './pages/AddVendor';
import VendorProfile from './pages/VendorProfile';
import Buyers from './pages/Buyers'
import AddBuyer from './pages/AddBuyer';
import DeliveryAgent from './pages/DeliveryAgent'
import DeliveryAgentProfile from './pages/DeliveryAgentProfile'
import AddDeliveryAgent from './pages/AddDeliveryAgent'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/vendors' element={<Vendor/>} />
      <Route path='/' element={<DashBoard/>} />
      <Route path='/buyerprofile' element={<BuyerProfile/>} />
      <Route path='/addvendor' element={<AddVendor/>} />
      <Route path='/vendorprofile' element={<VendorProfile/>} />
      <Route path='/buyers' element={<Buyers/>} />
      <Route path='/addbuyer' element={<AddBuyer/>} />
      <Route path='/deliveryagent' element={<DeliveryAgent/>} />
      <Route path='/Agentprofile' element={<DeliveryAgentProfile/>} />
      <Route path='/addAgent' element={<AddDeliveryAgent/>} />
      
    </Routes>
      {/* <Sidebar/> */}
      
    </>
  )
}

export default App
