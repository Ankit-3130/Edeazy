import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

const AppProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({});
  const [user, setUser] = useState({});
  const [chat, setChat] = useState([]);
  const [chatSelect,setChatSelect]=useState(false);
  const [classes,setClasses]=useState([]);
  const [selectClass,setSelectClass]=useState({});
  const [notification,setNotification]=useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    setUser(userInfo);
  }, [navigate]);

  return (
    <Appcontext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chat,
        setChat,
        chatSelect,
        setChatSelect,
        classes,setClasses,
        selectClass,
        setSelectClass,
        notification,
        setNotification
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const Appstate = () => {
  return useContext(Appcontext);
};

export default AppProvider;