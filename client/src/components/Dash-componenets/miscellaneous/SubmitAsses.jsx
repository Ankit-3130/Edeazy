import React,{ useRef, useState } from 'react'
import styled from 'styled-components';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { Appstate } from '../../../context/contextApi';

const SubmitAsses = (props) => {
    const [file, setFile] = useState('');
    const id=`http://localhost:3001/assignment/downloads/${props.assign._id}`;
    const fileref = useRef();
    const {user} = Appstate();

    const onassign = () => {
        fileref.current.click();
      }
    const onclick= ()=>{
        props.onclick();
    }

    const onsubmit = async () => {
        const data1 = new FormData();
        data1.append("user",user._id);
        data1.append("name",file.name);
        data1.append("file", file);
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(`http://localhost:3001/assignment/${props.assign._id}`, data1, config);
          onclick();
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <Submitouter>
        <SubmitHead>
          <Button style={{ padding: "3vh",height:"3vh",margin:"2vh"}} onClick={onclick}>
                    <ArrowBackIcon/>
                </Button>
           <h2 > 
            Submit Assignment</h2>
        </SubmitHead>
        <Submitbody>
            <Link href={id} >
                <Button style={{ padding: "3vh",height:"3vh", margin:"2vh"}}>
                    Download Assignment
                </Button>
            </Link>
            <FileUp>
                  <label htmlFor="" style={{ textAlign: 'center' }}>Select File</label>
                  <Button onClick={() => { onassign() }} style={{
                    border: "dotted",
                    borderRadius: "10px",
                    background: "#fff",
                    height: "50vh",
                    width: "50vw",
                    color: "rgba(0,0,0,0.2)"
                  }}>Select
                  </Button>
                  <input type='file' ref={fileref} name='myfile' style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />

                  <Button style={{ padding: "3vh",height:"3vh",margin:"5%"}} onClick={onsubmit}>
                  <h3 style={{ padding: "2%" }}>Submit</h3>
                  <FileUploadIcon style={{ padding: "2%" }} />
                </Button>
            </FileUp>
               
        </Submitbody>
    </Submitouter>
  )
}
const FileUp=styled.div`
height:80%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Submitouter=styled.div`
width:90%;
height:100%;
justify-content:center;
margin:5%;
margin-top:0%;
border-style: solid;
    border-color: #F0E2FF;
    border-width: 4px;
    box-shadow: 0 2px 10px -2px rgba(0,0,0,.2);
`;
const SubmitHead=styled.div`
text-align:center;
display:grid;
grid-template-rows:1fr;
grid-template-columns:1fr 4fr 1fr;
justify-content:center;
align-items:center;
width:100%;
height:15%;
`;
const Button = styled.button`

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
const Submitbody=styled.div`
height:70%;
width:100%;
`;
const Link=styled.a`
    justify-content:center;
    display:flex;
    height:16%;
    margin:2%;
`
export default SubmitAsses;