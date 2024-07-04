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
import EditBuyer from './pages/EditBuyer';
import DeliveryAgent from './pages/DeliveryAgent'
import DeliveryAgentProfile from './pages/DeliveryAgentProfile'
import AddDeliveryAgent from './pages/AddDeliveryAgent'
import CategoryManagement from './pages/Categories/CategoryManagement'
import AddCategory from './pages/Categories/AddCategory'
import Editcategory from './pages/Categories/Editcategory'
import CategoryDetail from './pages/Categories/CategoryDetail'
import AddSubCat from './pages/subcategories/AddSubCat'
import SubCategory from './pages/subcategories/SubCategory'
import RequiremenStatus from './pages/requirements/RequiremenStatus'
import AddRequirement from './pages/requirements/AddRequirement'
import LoginPage from './pages/login/LoginPage'
import EditRequirement from './pages/requirements/EditRequirement'



function App() {
 

  return (
    <>
    <Routes>
      <Route path='/vendors' element={<Vendor/>} />
      <Route path='/' element={<DashBoard/>} />
      <Route path='/buyerprofile/:id' element={<BuyerProfile/>} />
      <Route path='/addvendor' element={<AddVendor/>} />
      <Route path='/editbuyer/:id' element={<EditBuyer/>} />
      <Route path='/vendorprofile/:id' element={<VendorProfile/>} />
      <Route path='/buyers' element={<Buyers/>} />
      <Route path='/addbuyer' element={<AddBuyer/>} />
      <Route path='/deliveryagent' element={<DeliveryAgent/>} />
      <Route path='/Agentprofile' element={<DeliveryAgentProfile/>} />
      <Route path='/addAgent' element={<AddDeliveryAgent/>} />
      <Route path='/category' element={<CategoryManagement/>} />
      <Route path='/addcategory' element={<AddCategory/>} />
      <Route path='/editcategory/:id' element={<Editcategory/>} />
      <Route path='/CategoryDetail/:id'  element={<CategoryDetail cat=''/>} />
      <Route path='/addsubcat' element={<AddSubCat/>} />
      <Route path='/subcat' element={<SubCategory/>} />
      <Route path='/requirementstatus' element = {<RequiremenStatus/>}/>
      <Route path='/addrequrement' element = {<AddRequirement/>}/>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/editRequirement' element={<EditRequirement/>}></Route>
      
      
    </Routes>
      {/* <Sidebar/> */}
      
    </>
  )
}

export default App
