import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import './comp-css/home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';

export const Home = () => {
  //AOS config
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 3000
    });
  }, []);
  return (
    <>
      <div className="cover">
        <div className='outer'>
          <div data-aos="fade-up" className="quotes">
            <p>
              "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education." - Martin Luther King Jr.
            </p>
          </div>
        </div>
        <div className="aboutus">
          <h1>About us</h1>
          <div className="aboutdata">
            <div data-aos="fade-up" className="data">
              <p>
                We are a team of educators, administrators, and technologists who are passionate about transforming education through the power of technology. Our mission is to provide schools with a comprehensive and integrated platform that simplifies administrative tasks, streamlines communication, and enhances the learning experience for students.
                We are dedicated to providing exceptional customer service and support to ensure that our clients have a seamless and hassle-free experience with our platform. We welcome feedback and suggestions, and we are always looking for ways to improve and enhance our platform to meet the evolving needs of our clients.
              </p>
              <p style={{ textAlign: "right", margin: '2rem' }}>- team Edeazy</p>
            </div>
            <div className="imgdiv" data-aos="fade-down"></div>
          </div>
        </div>
        <div className="footer">

          <span className='footer-head'>Edeazy</span>
          <div className="social-media">
            <a rel="noopener noreferrer" href='https://www.instagram.com'><InstagramIcon /></a>
            <a rel="noopener noreferrer" href='https://www.linkedin.com'><LinkedInIcon /></a>
            <a rel="noopener noreferrer" href='https://www.twitter.com'><TwitterIcon /></a>
          </div>
          <div className='footer-contact'>
            <span>Contact No.:+917878100424</span>
            <span>Email:ankitnssingh@gmail.com</span>
          </div>
          <div className='copyright'>
            <CopyrightIcon />
            <span>
              Edeazy. All rights are reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
