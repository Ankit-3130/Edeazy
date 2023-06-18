import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import ClassBox from './miscellaneous/ClassBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Appstate } from '../../context/contextApi';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Singleclass from './miscellaneous/Singleclass';

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState({});
  const [selected, setSelected] = useState(false);
  const [join, setJoin] = useState(false);
  const [creat, setCreat] = useState(false);
  const [classInput, setClassInput] = useState("");
  const { user, classes, setClasses, selectClass, setSelectClass } = Appstate();

  //function to perform API call to fetch all classes

  const fetchClasses = async () => {
    try {
      console.log(logged);
      const config = {
        headers: {
          Authorization: `Bearer ${logged.token}`,
        },
      };
      console.log(config);
      const { data } = await axios.get("http://localhost:3001/api/group/", config);
      console.log(data);
      setClasses(data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    const userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    setLogged(userInfo1);

  }, [])
  useEffect(() => {
    fetchClasses();
  }, [open])
  useEffect(() => {
    fetchClasses();
  }, [logged]);
  useEffect(() => {
    fetchClasses();
  }, [selected]);

 //function to create classes or join class using Class code
 
  const handleSubmit = async () => {
    if (!classInput) {
      setOpen(false);
      setCreat(false);
      setJoin(false);
      setClassInput("");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logged.token}`,
          },
        };
        if (join) {
          const { data } = await axios.post("http://localhost:3001/api/group/", { className: classInput }, config);
          setOpen(false);
          setCreat(false);
          setJoin(false);
          setClassInput("");
        } else if (creat) {
          const { data } = await axios.post("http://localhost:3001/api/group/join", { classCode: classInput }, config);
          setOpen(false);
          setCreat(false);
          setJoin(false);
          setClassInput("");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

  }

  return (
    <Classdiv>
      {!selected ?
        <>
          <Classheader>
            {open ? <>
              <ClassInput>
                <input type="text"
                  placeholder={join ? "Enter Class Name" : "Enter Class Code"}
                  style={{ flex: 10 }}
                  name='classInput'
                  value={classInput}
                  onChange={(e) => { setClassInput(e.target.value) }}
                />
                <Button
                  style=
                  {{
                    background: "rgba(0,0,0,0.02)",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    height: "100%",
                    color: 'black',
                    padding: "2%",
                  }}
                  onClick={handleSubmit}
                >

                  <AddCircleOutlineIcon />
                </Button>
              </ClassInput>
            </>
              :
              <>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: "100%", height: '8vh' }}>
                  <Button onClick={() => { setOpen(true); setJoin(true) }}>
                    <AddIcon />
                    Create a Class
                  </Button>
                  <Button onClick={() => { setOpen(true); setCreat(true) }}>
                    <AddIcon />
                    Join a Class
                  </Button>
                </div>
              </>
            }
          </Classheader>
          <ClassContet>
            {
              classes.map((c, i) => {
                return <ClassBox key={c._id} classid={c._id} classname={c.className} admin={c.admin.name} clas={c}
                  onclick={() => { setSelected(true) }}
                />
              })
            }
          </ClassContet>
        </> : <>
          <Singleclass onclick={() => { setSelected(false) }} />
        </>
      }
    </Classdiv>

  )
}
const Classdiv = styled.div`
overflow-y:scroll;
overflow-x:hidden;
padding:2%;
width:96%;
height:96%;
box-shadow: 0 2px 10px -2px rgba(0,0,0,0.2);
border-radius:10px;

`;
const ClassContet = styled.div`
padding:1.8%;
width:96%;
height:77.4%;
display:flex;
flex-wrap:wrap;

grid-gap:10%;


`;
const Classheader = styled.div`
height:8%;
display:flex;
justify-content:center;
align-content:center;
align-items:center;
`;
const Button = styled.button`
height:100%;
display:flex;
justify-content:center;
align-content:center;
align-items:center;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight:bold;
    font-size:medium;
    width: fit-content;
    border-radius: 30px;
    background: transparent;
    background: linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%);
`;
const ClassInput = styled.div`
height:6vh;
width:40%;
border-radius:30px;
display:flex;
justify-content:center;
align-items:center;
border-style:solid;
 border-color:rgb(115, 103, 240);
input{
  background:rgba(0,0,0,0.02);
  border-top-right-radius:0 ;
  border-bottom-right-radius:0 ;
  padding:2% 0;
  height:100%;
}
`
export default Classes