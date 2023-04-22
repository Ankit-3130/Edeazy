import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./comp-css/header.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

  const [profOpen, setProfOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate=useNavigate();

  //logout functionality

  const logoutfn=()=>{
    localStorage.removeItem("userInfo");
   navigate("/");
  }
  
  return (
    <>
      <div className="header-wrap">
        <div className="header-logo">
          Edeazy
        </div>
        <div className="header-profile">
          <button onClick={() => { setNotifOpen(!notifOpen) }}>
            <NotificationsIcon className='header-icon' />
          </button>
          <button onClick={() => { setProfOpen(!profOpen) }}>
            <Avatar className='header-avatar' sx={{ width: 30, height: 30 }}>A</Avatar>
          </button>
        </div>
      </div>
      <div className="notification" style={{display:notifOpen?'flex':'none' }}>
        <span>new message arrived</span>
      </div>
      <div className='profile' style={{display:profOpen?'flex':'none'}}>
       
        <div className="prof-ele">
        <button>
          <SettingsIcon />
          </button>
          <span>Settings</span>
        </div>
        <div className="prof-ele">
          <button onClick={()=>{logoutfn()}}>
          <LogoutIcon style={{flex:"1"}}/>
          </button>
          <span>Log Out</span>
        </div>
      </div>
    </>
  )
}
