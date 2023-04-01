import React from 'react'
import "./comp-css/navbar.css"
import {Link, Outlet} from "react-router-dom";

export const Navbar = () => {
  return (
    <>
    <nav>
        <div className="icon">
            <span>freshFam</span>
        </div>
        <div className="listitem">
            <ul>
                <li>HOME</li>
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
    </nav>
    <Outlet/>
    </>
  )
}
