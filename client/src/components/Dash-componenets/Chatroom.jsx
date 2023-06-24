import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';
import "./comp-css/chat.css"
import SearchIcon from '@mui/icons-material/Search';
import ChatList from './miscellaneous/ChatList';
import CloseIcon from '@mui/icons-material/Close';
import { Appstate } from '../../context/contextApi';
import axios from "axios";
import Chatbox from './miscellaneous/Chatbox';
import { getchat, getchatFull } from './helper/chatfn';


//main Chatroom function


const Chatroom = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [logu, setLogu] = useState({});
  const { user, chat, setChat, setSelectedChat, selectedChat, chatSelect, setChatSelect } = Appstate();


  //Api Get request for searching users


  const onclick = async () => {
    if (search) {
      setOpen(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`http://localhost:3001/api/auth?search=${search}`, config);
        setSearchResult(data);
      } catch (error) {
        console.log(error);
      }
    }
  }


  //To update the Search input


  const onchange = (e) => {
    setSearch(e.target.value);
  }


  //Post request to select the Chat with selected User


  const handlesubmit = async (userId) => {

    try {

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:3001/api/chat`, { userId }, config);
      console.log(data);
      setSelectedChat(data);

      setChatSelect(true);
      setOpen(false);
      setSearchResult([]);
      setSearch("");
    } catch (error) {
      console.log(error);
    }

  }


  //Get request to fetch all the Chats of current User


  const fetchChats = async () => {
   
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${logu.token}`,
        },
      };
      //console.log(config);
      const { data } = await axios.get("http://localhost:3001/api/chat", config);
      //console.log(data);
      setChat(data);
    } catch (error) {
      //console.log(error)
    }
  };

  //use Effects to trigger the fetch chat function

  useEffect(() => {
    const userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    setLogu(userInfo1);
  }, []);
  useEffect(() => {
    fetchChats();
  }, [open])
  useEffect(() => {
    fetchChats();
  }, [logu])





  


  return (
    <>
      <div className="chat-outer">
        <div className={chatSelect ? "chat-contact contact-res" : "chat-contact"}>
          <label htmlFor="" className='contact'>Contacts</label>
          <div className="search">
            <input type="text" name='search' placeholder='Search User' onChange={onchange} value={search} />
            <button onClick={onclick}><SearchIcon /></button>
          </div>
          <div className="searched-contacts" style={{ display: open ? "block" : "none" }}>
            {loading ? <CircularProgress /> :
              <>
                {searchResult.map((cred) => {
                  return (
                    <ChatList
                      key={cred._id}
                      userId={cred._id}
                      handlesubmit={handlesubmit}
                      name={cred.name}
                      email={cred.email}
                    />
                  );
                })}

                <div className="List-btn">
                  <button onClick={() => {
                    setOpen(false);
                    setSearchResult([]);
                    setSearch("");
                  }}><CloseIcon /></button>
                </div>
              </>}
          </div>

          <div className="created-contacts" style={{ display: !open ? "block" : "none" }}>
           
            {chat.map((cred) => {
              return (
                <ChatList
                  key={cred._id}
                  handlesubmit={() => { setChatSelect(true); setSelectedChat(cred) }}
                  name={getchat(cred.users, logu)}
                  email={cred.id}
                />
              );
            })}


          </div>

        </div>
        <div className={chatSelect ? "chat-text" : "chat-text text-res"}>
          <Chatbox />
        </div>
      </div>
    </>
  )
}

export default Chatroom;