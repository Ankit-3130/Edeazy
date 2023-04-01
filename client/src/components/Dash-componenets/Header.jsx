import React from 'react'
import { Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import "./comp-css/header.css";

export const Header = () => {
  return (
    <div className="header-wrap">
        <div className="header-logo">
            hello
        </div>
        <div className="header-profile">
        <MoreVertIcon className='header-icon'/>
           <Avatar className='header-avatar' sx={{ width: 30, height: 30 }}>A</Avatar>
           
        </div>
    </div>
  )
}
