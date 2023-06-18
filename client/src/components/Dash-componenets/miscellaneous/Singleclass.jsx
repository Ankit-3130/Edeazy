import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Appstate } from '../../../context/contextApi';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


const Singleclass = (props) => {
  const [assign, setAssign] = useState(false);
  const [file, setFile] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState("");
  const { user, selectClass, setSelectClass } = Appstate();
  const fileref = useRef();

  
  const onassign = () => {
    fileref.current.click();
  }

  //function to delete the class

  const deletefn = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("http://localhost:3001/api/group/delete", { groupid: selectClass._id }, config);
      props.onclick();
    } catch (error) {
      console.log(error);
    }
  }

  //functiont to assign an assignment 

  const onsubmit = async () => {
    const data1 = new FormData();
    data1.append("assignname", name);
    data1.append("dueDate", date);
    data1.append("grp", selectClass._id);
    data1.append("file", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("http://localhost:3001/assignment", data1, config);
      setAssign(false);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <SingleHeader>
          <Button onClick={() => { props.onclick() }}>
            <ArrowBackIcon />
          </Button>
          <label style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{selectClass.className}</label>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button onClick={() => { deletefn() }}>
              <DeleteIcon />
            </button>
          </div>
        </SingleHeader>
        <SingleContent>
          {
            assign ? <>
            {/*uploading  assignment interface  */}

              <Classcard style={{ width: "30%", height: "80%", justifyContent: "space-evenly" }}>
                <div style={{
                  display: 'flex',
                  justifyContent: ' right',
                  justifyItems: 'right',
                  width: '90%'
                }}>
                  <Button onClick={() => { setAssign(false) }}>
                    <CloseIcon />
                  </Button>

                </div>
                <h2 style={{}}>Assignment Detail</h2>
                <div>
                  <label htmlFor="assignname" style={{ textAlign: "center", marginBottom: "5%" }}>Assignment Name</label>
                  <input type="text" placeholder='Name' name='assignname' value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                  <label htmlFor="" style={{ textAlign: 'center' }}>Select File</label>
                  <Button onClick={() => { onassign() }} style={{
                    border: "dotted",
                    borderRadius: "10px",
                    background: "#fff",
                    height: "6vh",
                    width: "15vw",
                    color: "rgba(0,0,0,0.2)"
                  }}>Select
                  </Button>
                  <input type='file' ref={fileref} name='myfile' style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />

                </div>
                <div>
                  <label style={{ textAlign: "center" }}>Set Due Date</label>
                  <input type='datetime-local' value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <Button style={{ padding: "5%" }} onClick={onsubmit}>
                  <h3 style={{ padding: "2%" }}>Upload</h3>
                  <FileUploadIcon style={{ padding: "2%" }} />
                </Button>

              </Classcard>

            </> :
              <>
                <Classcard>
                  <h2 style={{ marginBottom: "10%", textAlign: "center" }}>Create Assignment</h2>
                  <Button style={{ padding: "5%" }} onClick={() => { setAssign(true) }}>
                    <h3 style={{ padding: "2%" }}>Create</h3>
                    <CreateIcon style={{ padding: "2%" }} />
                  </Button>

                </Classcard>
                <Classcard>
                  <h2 style={{ marginBottom: "10%" }}>Start Class</h2>
                  <Button>Upload</Button>
                </Classcard>
              </>
          }

        </SingleContent>
      </div>
    </>
  )
}
const SingleHeader = styled.div`
height:10%;
display:grid;
grid-template-columns:1fr 7fr 1fr;
background-color:#F0E2FF;
`
const Button = styled.div`
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
background:transparent;
font-weight:bold;
`
const SingleContent = styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
height:90%;
@media(max-width:500px){
  flex-direction:column;
}
`
const Classcard = styled.div`
height:40%;
width:20%;
background-color:#F0E2FF;
padding:2%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border-radius:10px;
@media(max-width:768px){
  width:30%;
}
@media(max-width:500px){
  width:60%;
}
`
export default Singleclass