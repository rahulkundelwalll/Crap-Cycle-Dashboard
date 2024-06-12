import React from 'react'
import Sidebar from './component/Sidebar'
import Vendor from './pages/Vendors';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Buyers from './pages/Buyers';

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/vendors' element={<Vendor/>} />
      <Route path='/' element={<DashBoard/>} />
      <Route path='/buyers' element={<Buyers/>} />
    </Routes>
      {/* <Sidebar/> */}
      
    </>
  )
}

export default App
