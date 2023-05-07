import React from 'react'
import styled from 'styled-components'
import ScrollableFeed from "react-scrollable-feed";
import { Appstate } from '../../../context/contextApi';


const Chatarea = ({ message }) => {

  const { user } = Appstate();


  return (
    <>
      {
        message && message.map((m, i) => {
          return (
            <>
              <div key={m._id} style={
                {
                  backgroundColor: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                  marginLeft: m.sender._id === user._id ? "auto" : "0",
                  marginBottom: "2%",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  width: "fit-content"
                }
              }>
                <span> {m.content} </span>
              </div>
            </>)
          })
      }
  </>)
}
const AreaOuter = styled.div`
height:100%;
background-color:blue;
`
export default Chatarea