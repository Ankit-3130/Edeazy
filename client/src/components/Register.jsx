import React from 'react'
import "./comp-css/register.css"

export const Register = () => {
    return (
        <>
            <div className="outer_div">
                <div className="profession">
                    <button className='prof-btn colr'>DOCTOR</button>
                    <button className='prof-btn'>USER</button>

                </div>
                <div className="form-data">
                    <form >
                        <label htmlFor="fname">First Name</label>
                        <input type="text" placeholder='First Name' name='fname'/>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" placeholder='Last Name' name='lname'/>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email' name="email"/>
                        <label htmlFor="password">Password</label>
                        <input type={'password'} placeholder='Password' name="password"/>
                        <button className='reg-btn'>Register</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}
