import React, { useContext } from 'react'
import "./comp-css/profile.css"
import { Avatar } from '@mui/material';
import styled from "styled-components";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { Line, Circle } from 'rc-progress';
import { Appstate } from '../../context/contextApi';
import io from "socket.io-client";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ENDPOINT = "http://localhost:3001";
var socket, selectedChatCompare;

const DashProfile = () => {
  const { user } = Appstate();
  const { notification, setNotification, setSelectedChat, setChatSelect } = Appstate();
  const navigate = useNavigate();
  const [logged, setLogged] = useState({});

  const fetchnotif = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${logged.token}`,
        },
      };
      setNotification([]);
      const { data } = await axios.get("http://localhost:3001/notif", config);
      setNotification(data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    const userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    setLogged(userInfo1);

  }, [])
  useEffect(()=>{
    fetchnotif();
  },[logged]);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket.on("message recieved", async(newMessageRecieved) => {
      var i;
      var flag = 0;
      for (i = 0; i < notification.length; i++) {
        if (notification[i].sender._id === newMessageRecieved.sender._id) {
          notification[i] = newMessageRecieved;
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${logged.token}`,
              },
            };
            const { data } = await axios.post("http://localhost:3001/notif/update",{recChat:newMessageRecieved}, config);
          } catch (error) {
            console.log(error)
          }
          flag = 1;
        }
      }
      
      if (flag === 0 && !notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
        try {

          const config = {
            headers: {
              Authorization: `Bearer ${logged.token}`,
            },
          };
          flag=1;
          const { data } = await axios.post("http://localhost:3001/notif/",{recChat:newMessageRecieved}, config);
        } catch (error) {
          console.log(error)
        }
        
      }
    });
  });

  const onclick = async(chat) => {
    setChatSelect(true);
    setSelectedChat(chat.chatref);
    setNotification(notification.filter((n) => n !== chat));
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${logged.token}`,
        },
      };
      const { data } = await axios.post("http://localhost:3001/notif/remove",{recChat:chat}, config);
    } catch (error) {
      console.log(error)
    }
    navigate("/dashboard/chat");

  }
  return (<>
    <div className="profile-wrap wrap-res">
      <div className="profile-card card-res">
        <div className="profile-avatar">
          <Avatar className='header-avatar' sx={{ width: 100, height: 100 }}>A</Avatar>
        </div>
        <Name>
          <label htmlFor="">{user.name}</label>
        </Name>
        <College>
          <label>{user.institution}</label>
        </College>
        <Degree>
          <label htmlFor="">{user.course}</label>
        </Degree>

      </div>
      <div className="profile-events events-res">
        <div className="event-heading" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "0% 5%"
        }}>
          <label style={{ margin: "2%" }} htmlFor="">Notification</label>
          <CampaignRoundedIcon />
        </div>
        {console.log(notification)}
        {notification.map((notif) => {
          return (
            <Eventdiv className="event-info" key={notif._id} onClick={() => { onclick(notif) }}>
              <div className="info-text" style={{ padding: "0 2%", paddingTop: "1px" }}>
                <label htmlFor="">New message recieved from {notif.sender.name}</label>

              </div>
              <div className="info-date" style={{ textAlign: "right", paddingBottom: "1px" }}>
                <label htmlFor="" style={{ fontSize: "smaller" }}>{notif.updatedAt} </label>
              </div>
            </Eventdiv>
          )
        })
      }
      </div>
    </div>

  </>

  )

}
const Eventdiv = styled.div`
border-radius:10px;
box-shadow: 0 2px 10px -2px rgba(0,0,0,.2);
 z-index:1;
 position:relative;
 padding:0 5%;
 margin-bottom:1px;
`
const Name = styled.div`
text-align: center;
label{
  font-size:medium;
}
`
const College = styled.div`
text-align: center;
label{
  font-size:smaller;
}
`
const Degree = styled.div`
text-align: center;
label{
  font-size:smaller;
}
`
export default DashProfile;
