import React, { useState } from 'react'
import "./comp-css/navbar.css"
import { Link, Outlet } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <nav>
                <div className="icon">
                    <span>Edeazy</span>
                </div>
                <div className="listitem">
                    <ul>
                        <li>
                            <Link to="/">HOME</Link></li>
                        <li>ABOUT</li>
                        <li>CONTACT US</li>
                    </ul>
                </div>
                <div className="authenticate">
                    <Link to="/signin">
                        <button className='sign_in'>Sign In</button>
                    </Link>
                    <Link to="/register">
                        <button className='register'>Register</button>
                    </Link>

                </div>
                <div className='menu'>
                    <button onClick={() => { setOpen(!open) }}>
                        <MenuIcon />
                    </button>
                </div>
            </nav>
            <div className={`menu-items ${open ? "open" : ""}`}>
                <span>HOME</span>
                <span>ABOUT</span>
                <span>CONTACT US</span>
                <div>
                    <Link to="/signin">
                        <button className='sign_in' onClick={() => { setOpen(!open) }}>Sign In</button>
                    </Link>
                    <Link to="/register">
                        <button className='register' onClick={() => { setOpen(!open) }}>Register</button>
                    </Link>

                </div>
            </div>
            <Outlet />
        </>
    )
}
