import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Appstate } from '../../../context/contextApi'
import SendIcon from '@mui/icons-material/Send';
import Chatarea from './Chatarea';
import { getchatFull } from '../helper/chatfn';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001"; 
var socket, selectedChatCompare;


const Chatbox = () => {

  const [message, setMessage] = useState([]);
  const [inputmsg, setInputMsg] = useState("");
  const { chatSelect, user, setChatSelect, selectedChat} = Appstate();
  
  //Api call to fetch messages

  const fetchMessages = async () => {
    if (!chatSelect) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3001/api/message/${selectedChat._id}`,
        config
      );
      setMessage(data);
      socket.emit("join chat", selectedChat._id);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||selectedChatCompare !== newMessageRecieved
      ) {
        
      } else {
        setMessage([...message, newMessageRecieved]);
      }
    });
  });
  //Api call to send message

  const sendmsg = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setInputMsg("");
      const { data } = await axios.post(
        "http://localhost:3001/api/message",
        {
          content: inputmsg,
          chatid: selectedChat,
        },
        config
      );
      socket.emit("new message", data);
      setMessage([...message, data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        chatSelect ? <>
          <div style={{ height: "100%", width: "100%", position: "relative",background:"#936cbe3f"}}>
            <Boxhead>
              <button style={{ position: 'absolute', left: '0' }} onClick={() => { setChatSelect(false) }}>
                <ArrowBackIcon />
              </button>
              <label htmlFor="Username">{(getchatFull(selectedChat.users, user)).name}</label>
            </Boxhead>
            <MsgBox>
              <Chatarea message={message} />
            </MsgBox>
            <Boxinput>
              <input style={{ flex: "6", cursor: "text", margin: "1%", marginLeft: "1%", height: "80%" }} placeholder='Write Your Message Here'
                name='inputmsg'
                value={inputmsg}
                onChange={(e) => {
                  const { value } = e.target;
                  setInputMsg(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputmsg) {
                    document.getElementById("sendbtn").click();
                  }
                }}
              />
              <Sendbtn id='sendbtn' onClick={() => { sendmsg(); }}>
                <SendIcon style={{ flex: "1", marginLeft: "1%" }} />
              </Sendbtn>
            </Boxinput>
          </div>
        </>
          :
          <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              Select Chat to start Messaging
            </div>
          </>

      }


    </>
  )
}
const Boxhead = styled.div`
height:8%;
background-color: #936cbe3f;
color:#fff;
display:flex;
justify-content:center;
align-items:center;

`;
const Boxinput = styled.div`
height:8%;
display:flex;
justify-content:center;
align-items:center;
width:100%;
bottom:0;
position:absolute;
background-color:#936cbe3f;
padding:0;

`;
const Sendbtn = styled.button`
background:transparent;
flex:1;
cursor:pointer;
border:none;
outline:none;
`;
const MsgBox = styled.div`
height:82%;
display:flex;
flex-direction:column;
padding:2%;
background:#936cbe3f;
overflow-y: scroll;
`
export default Chatbox;