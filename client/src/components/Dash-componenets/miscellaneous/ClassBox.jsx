import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Appstate } from '../../../context/contextApi'

const ClassBox = (props) => {

  const { selectClass, setSelectClass } = Appstate()

  //function to handle click on classes

  const onclick = () => {
    setSelectClass(props.clas);
    props.onclick();
  }

  return (
    <BoxWrap onClick={onclick}>
      <Avatar style={{ margin: "10% 0", height: "50px", width: "50px" }} >C</Avatar>
      <label style={{ wordWrap: "break-word", width: "80%", textAlign: "center" }}>{props.classname}</label>
      <label style={{ fontSize: "small" }}>
        {props.admin}
      </label>
    </BoxWrap>
  )
}


const BoxWrap = styled.div`
background: linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%);
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
overflow:hidden;
padding:2%;
border-radius:10px;
min-width:200px;
max-width:350px;
height:240px;
color:#fff;
`
export default ClassBox;