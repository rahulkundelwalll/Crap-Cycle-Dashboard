import React from 'react'
import { Route, Routes } from 'react-router-dom';

// Dashboard
import DashBoard from './pages/DashBoard';

// Vendor 
import Vendor from './pages/Vendors';
import AddVendor from './pages/AddVendor';
import VendorProfile from './pages/VendorProfile';
import Buyers from './pages/Buyers'
import AddBuyer from './pages/AddBuyer';
import BuyerProfile from './pages/BuyerProfile';
import EditBuyer from './pages/EditBuyer';
import DeliveryAgent from './pages/DeliveryAgent'
import DeliveryAgentProfile from './pages/DeliveryAgentProfile'
import AddDeliveryAgent from './pages/AddDeliveryAgent'
import EditDeliveryAgent from './pages/EditDeliveryAgent';
import CategoryManagement from './pages/Categories/CategoryManagement'
import AddCategory from './pages/Categories/AddCategory'
import Editcategory from './pages/Categories/Editcategory'
import CategoryDetail from './pages/Categories/CategoryDetail'
import AddSubCat from './pages/subcategories/AddSubCat'
import SubCategory from './pages/subcategories/SubCategory'
import RequiremenStatus from './pages/requirements/RequiremenStatus'
import AddRequirement from './pages/requirements/AddRequirement';
import RequirementDetail from './pages/requirements/RequirementDetail'
import LoginPage from './pages/login/LoginPage'
import EditRequirement from './pages/requirements/EditRequirement'
import OrderManagement from './pages/OrderMangement';
import SupplyTable from './pages/Supplytable';
import ProtectedRoute from './protected/ProtectedRoute';
function App() {


  return (
    <>
      <Routes>
        {/* dashboard */}
        <Route path='/' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path='/dashboard/vendor/vendors' element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
        <Route path='/buyerprofile/:id' element={<ProtectedRoute><BuyerProfile /></ProtectedRoute>} />
        <Route path='/addvendor' element={<ProtectedRoute><AddVendor /></ProtectedRoute>} />
        <Route path='/editbuyer/:id' element={<ProtectedRoute><EditBuyer /></ProtectedRoute>} />
        <Route path='/vendorprofile/:id' element={<ProtectedRoute><VendorProfile /></ProtectedRoute>} />
        <Route path='/buyers' element={<ProtectedRoute><Buyers /></ProtectedRoute>} />
        <Route path='/addbuyer' element={<ProtectedRoute><AddBuyer /></ProtectedRoute>} />
        <Route path='/deliveryagent' element={<ProtectedRoute><DeliveryAgent /></ProtectedRoute>} />
        <Route path='/Agentprofile/:id' element={<ProtectedRoute><DeliveryAgentProfile /></ProtectedRoute>} />
        <Route path='/addAgent' element={<ProtectedRoute><AddDeliveryAgent /></ProtectedRoute>} />
        <Route path='/editagent/:id' element={<ProtectedRoute><EditDeliveryAgent /></ProtectedRoute>} />
        <Route path='/category' element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
        <Route path='/addcategory' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path='/editcategory/:id' element={<ProtectedRoute><Editcategory /></ProtectedRoute>} />
        <Route path='/CategoryDetail/:id' element={<ProtectedRoute><CategoryDetail cat='' /></ProtectedRoute>} />
        <Route path='/addsubcat' element={<ProtectedRoute><AddSubCat /></ProtectedRoute>} />
        <Route path='/subcat' element={<ProtectedRoute><SubCategory /></ProtectedRoute>} />
        <Route path='/requirementstatus' element={<ProtectedRoute><RequiremenStatus /></ProtectedRoute>} />
        <Route path='/addrequrement' element={<ProtectedRoute><AddRequirement /></ProtectedRoute>} />
        <Route path='/requirement-detail/:id' element={<ProtectedRoute><RequirementDetail /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/editRequirement/:id' element={<ProtectedRoute><EditRequirement /></ProtectedRoute>}></Route>
        <Route path='/ordermanagement' element={<ProtectedRoute><OrderManagement /></ProtectedRoute>}></Route>
        <Route path='/supplytable' element={<ProtectedRoute><SupplyTable /></ProtectedRoute>}></Route>


      </Routes>
      {/* <Sidebar/> */}

    </>
  )
}

export default App
