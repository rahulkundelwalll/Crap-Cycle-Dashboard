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
    </Routes>
      {/* <Sidebar/> */}
      
    </>
  )
}

export default App
