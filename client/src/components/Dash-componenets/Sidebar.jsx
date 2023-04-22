import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ClassIcon from '@mui/icons-material/Class';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import "./comp-css/sidebar.css"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

export const Sidebar = () => {

    return (<>
        <div className="side-wrap">
            <div className="side-icons">
                <Link className='icons-links' to={"/dashboard/profile"}>
                    <PersonIcon />
                    <label htmlFor="">Profile</label>
                </Link>
            </div>
            <div className="side-icons">
                <Link className='icons-links' to={"/dashboard/chat"}>
                    <ChatIcon />
                    <label htmlFor="">Chat</label>
                </Link>
            </div>
            <div className="side-icons">
                <Link className='icons-links' to={"/dashboard/classes"}>
                    <ClassIcon />
                    <label htmlFor="">Class</label>
                </Link>
            </div>
            <div className="side-icons">
                <CalendarMonthIcon />
                <label htmlFor="">Calender</label>
            </div>
            <div className="side-icons">
                <Link className='icons-links' to={"/dashboard/assignment"}>
                    <AssignmentSharpIcon />
                    <label htmlFor="">Assignment</label>
                </Link>
            </div>
        </div>
        <Outlet />
    </>
    )
};
