import React from 'react'
import { Header } from './Dash-componenets/Header';
import { Sidebar } from './Dash-componenets/Sidebar';
import "./comp-css/dashboard.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  DashProfile  from './Dash-componenets/DashProfile';
import { Assignment } from './Dash-componenets/Assignment';
import { Chatroom } from './Dash-componenets/Chatroom';

export const Dashboard = () => {
  return (
    <>
    <BrowserRouter>
      <div className="dash-header">
        <Header />
      </div>
      <div className="dash-body">
        <div className="dash-sidebar">
          <Sidebar />
        </div>
        <div className="dash-content">
         <Routes>
          <Route path='/profile' element={<DashProfile/>} />
          <Route path='/chat' element={<Chatroom />} />
          <Route path='/assignment' element={<Assignment />} />
         </Routes>
        </div>
      </div>

      </BrowserRouter>
    </>
  )
}
