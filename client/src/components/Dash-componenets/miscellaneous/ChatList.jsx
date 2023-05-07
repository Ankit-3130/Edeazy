import React from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'


const ChatList = (props) => {
  
  return (
    <ListOuter>
      <ListAvatar onClick={async () => { await props.handlesubmit(props.userId) }}>
        <Avatar>A</Avatar>
      </ListAvatar>
      <Listcred onClick={async () => { await props.handlesubmit(props.userId) }}>
        <label style={{ cursor: 'pointer' }}>{props.name}</label>
        {/* <label style={{fontSize:"small",paddingBottom:"2px",fontWeight:"100"}}>{props.email}</label> */}
      </Listcred>
    </ListOuter>
  )
}
const ListOuter = styled.div`
background-color:#936cbe3f;
color:#fff;
cursor:pointer;
margin:2%;
border-radius:10px;
display:flex;
`;
const Listcred = styled.div`
display: flex;
   flex: 3;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`;
const ListAvatar = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex:1;
`
export default ChatList