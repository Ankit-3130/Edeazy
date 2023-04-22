import React, { useState } from 'react'
import { Header } from './Dash-componenets/Header';
import { Sidebar } from './Dash-componenets/Sidebar';
import "./comp-css/dashboard.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashProfile from './Dash-componenets/DashProfile';
import { Assignment } from './Dash-componenets/Assignment';
import Chatroom from './Dash-componenets/Chatroom';
import Classes from './Dash-componenets/Classes';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

  
  return (
    <>
      <div className="dash-header">
        <Header />
      </div>
      <div className="dash-body">
        <div className={open ? "dash-sidebar" : "dash-sidebar side"} >
          <Sidebar />
          <div className={!open ? "response-btn res-1 res" : "response-btn res-1"}>
            <button style={{ color: 'black' }} onClick={() => { setOpen(!open) }}>
              <KeyboardDoubleArrowLeftIcon />
            </button>
          </div>
        </div>
        <div className={open ? "response-btn res" : "response-btn"}>
          <button style={{ color: 'black' }} onClick={() => { setOpen(!open) }}>
            <KeyboardDoubleArrowRightIcon />
          </button>
        </div>
        <div className="dash-content">
          <Routes>
            <Route path='profile' element={<DashProfile />} />
            <Route path='/' element={<DashProfile />} />
            <Route path='chat' element={<Chatroom />} />
            <Route path="classes" element={<Classes />} />
            <Route path='assignment' element={<Assignment />} />
          </Routes>
        </div>
      </div>
    </>
  )
}
