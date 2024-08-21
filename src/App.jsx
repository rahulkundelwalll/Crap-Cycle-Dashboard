import React from 'react'
import { Route, Routes } from 'react-router-dom';

// Dashboard
import DashBoard from './pages/DashBoard';
import Profile from './component/Profile';

// Vendor 
import Vendor from './pages/Vendors';
import AddVendor from './pages/AddVendor';
import VendorProfile from './pages/VendorProfile';
import EditVendor from './pages/EditVendor';

// Buyer
import Buyers from './pages/Buyers'
import AddBuyer from './pages/AddBuyer';
import BuyerProfile from './pages/BuyerProfile';
import EditBuyer from './pages/EditBuyer';

// Delivery
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

// Requirement
import RequiremenStatus from './pages/requirements/RequiremenStatus';
import AddRequirement from './pages/requirements/AddRequirement';
import RequirementDetail from './pages/requirements/RequirementDetail';
import EditRequirement from './pages/requirements/EditRequirement';
import Requirement_Table from './pages/Requirement_Table';
import CompletedRequirements from './pages/Completed_Requirement';


import LoginPage from './pages/login/LoginPage'

import SupplyTable from './pages/Supplytable';
import MainTable from './pages/MainTable';
import SpecificMainTable from './pages/SpecifyMainTable';
import ProtectedRoute from './protected/ProtectedRoute';

//Order
import Order_History from './pages/OrderHistory';
import OrderMangement from './pages/Order_Management';

import UpdateLinks from './pages/Other';
import UpdateContact from './pages/Other/UpdateContact';
import UpdatePrivacy from './pages/Other/UpdatePrivacy';
import UpdateTnc from './pages/Other/UpdateTnc';
import GetPassword from './pages/Other/GetPassword';




import DeactivateAccount from './pages/DeactivateAccount'
function App() {


  return (
    <>

      <Routes>
        {/* dashboard */}
        <Route path='/' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path='/dashboard/Profile' element={<div className="bg-gray-100 min-h-screen flex items-center justify-center"><ProtectedRoute ><Profile /></ProtectedRoute></div>}/>

        {/* Vendor */}
        <Route path='/dashboard/vendor/vendors' element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
        <Route path='/dashboard/vendor/profile/:id' element={<ProtectedRoute><VendorProfile /></ProtectedRoute>} />
        <Route path='/dashboard/vendor/add' element={<ProtectedRoute><AddVendor /></ProtectedRoute>} />
        <Route path='/dashboard/vendor/edit/:id' element={<ProtectedRoute><EditVendor /></ProtectedRoute>} />


        {/* Buyer */}
        <Route path='/dashboard/buyer/add' element={<ProtectedRoute><AddBuyer /></ProtectedRoute>} />
        <Route path='/dashboard/buyer/buyers' element={<ProtectedRoute><Buyers /></ProtectedRoute>} />
        <Route path='/dashboard/buyer/profile/:id' element={<ProtectedRoute><BuyerProfile /></ProtectedRoute>} />
        <Route path='/dashboard/buyer/edit/:id' element={<ProtectedRoute><EditBuyer /></ProtectedRoute>} />
        
        
        {/* Delivery agent */}
        <Route path='/dashboard/delivery_agent/allgents' element={<ProtectedRoute><DeliveryAgent /></ProtectedRoute>} />
        <Route path='/dashboard/delivery_agent/profile/:id' element={<ProtectedRoute><DeliveryAgentProfile /></ProtectedRoute>} />
        <Route path='/dashboard/delivery_agent/add' element={<ProtectedRoute><AddDeliveryAgent /></ProtectedRoute>} />
        <Route path='/dashboard/delivery_agent/edit/:id' element={<ProtectedRoute><EditDeliveryAgent /></ProtectedRoute>} />


        {/* category */}
        <Route path='/dashboard/category/category' element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
        <Route path='/dashboard/category/addcategory' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path='/dashboard/category/editcategory/:id' element={<ProtectedRoute><Editcategory /></ProtectedRoute>} />
        <Route path='/dashboard/category/CategoryDetail/:id' element={<ProtectedRoute><CategoryDetail cat='' /></ProtectedRoute>} />
       

        {/* Requirement */}
        <Route path='/dashboard/requirement/addrequirement' element={<ProtectedRoute><AddRequirement /></ProtectedRoute>} />
        <Route path='/dashboard/requirement/detail/:id' element={<ProtectedRoute><RequirementDetail /></ProtectedRoute>} />
        <Route path='/dashboard/requirement/editRequirement/:id' element={<ProtectedRoute><EditRequirement /></ProtectedRoute>}></Route>
        <Route path='/dashboard/requirement/allrequirement' element={<ProtectedRoute><Requirement_Table /></ProtectedRoute>}></Route>
        <Route path='/complete-requirement/:id' element={<ProtectedRoute><CompletedRequirements /></ProtectedRoute>}></Route>
        
       {/* Order */}
       <Route path='/order-history' element={<ProtectedRoute><Order_History /></ProtectedRoute>}></Route>
       <Route path='/order-mangagement/:id' element={<ProtectedRoute><OrderMangement /></ProtectedRoute>}></Route>

        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/supplytable' element={<ProtectedRoute><SupplyTable /></ProtectedRoute>}></Route>
         <Route path='/maintable' element={<ProtectedRoute><MainTable /></ProtectedRoute>}></Route>
         <Route path='/table/:req_id' element={<ProtectedRoute><SpecificMainTable /></ProtectedRoute>}></Route>
         <Route path='/update-links' element={<ProtectedRoute><UpdateLinks /></ProtectedRoute>}></Route>
         <Route path='/update-tnc' element={<ProtectedRoute><UpdateTnc /></ProtectedRoute>}></Route>
         <Route path='/update-privacy' element={<ProtectedRoute><UpdatePrivacy  /></ProtectedRoute>}></Route>
         <Route path='/update-contact' element={<ProtectedRoute><UpdateContact/></ProtectedRoute>}></Route>
         <Route path='/get-password' element={<ProtectedRoute><GetPassword/></ProtectedRoute>}></Route>

        
        <Route path='/dashboard/deactivateaccount' element= {<ProtectedRoute><DeactivateAccount/></ProtectedRoute>}></Route>

      </Routes>

      {/* <Sidebar/> */}

    </>
  )
}

export default App
