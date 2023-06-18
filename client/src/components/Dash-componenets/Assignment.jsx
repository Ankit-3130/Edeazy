import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components'
import axios from 'axios';


export const Assignment = () => {

  const [allAssign, setAllAssign] = useState([]);
  const [logged, setLogged] = useState({});
  const [open, setOpen] = useState(false);

  //use Effects to trigger the fetchAssignments function
  useEffect(() => {
    const userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
    setLogged(userInfo1);
  }, []);
  useEffect(() => {
    fetchAssignments();
  }, [logged]);

  //function to fetch all assignments 

  const fetchAssignments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${logged.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:3001/assignment/${logged.user_type}`, config);
      console.log(data);
      setAllAssign(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Assignouter>
      <Header style={{backgroundColor:'#9932CC', color:'#fff'}}>
        <span style={{ gridColumn: '1/2' }}>Assignment Name</span>
        <Midspan style={{ gridColumn: '2/3' }}>Assigned By</Midspan>
        <span style={{ gridColumn: '3/4' }}>Due Date</span>
      </Header>
      {
        allAssign && allAssign.map((a, i) => {
          console.log(a);
          return (
            <>
              <Header>
                <span style={{ gridColumn: '1/2' }}>{a.assignname}</span>
                <Midspan style={{ gridColumn: '2/3' }}>{a.admin.name}</Midspan>
                <span style={{ gridColumn: '3/4' }}>{a.dueDate.substring(0,10)}</span>
              </Header>

            </>
          )
        })
      }
    </Assignouter>
  )
};

const Assignouter = styled.div`
margin:4% 4%;
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;

`
const Header = styled.div`
background-color:#F0E2FF;
width:100%;
display:grid;
height:6vh;
gird-template-columns:2fr 1fr 1fr;
box-shadow: 0 2px 10px -2px rgba(0,0,0,.2);
border-radius:10px;
margin:4px 0;
span{
  overflow:hidden;
  display:flex;
  justify-content:center;
  align-items:center;
}
`;
const Midspan=styled.div`
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
@media(max-width:400px){
  display:none;
}
`
