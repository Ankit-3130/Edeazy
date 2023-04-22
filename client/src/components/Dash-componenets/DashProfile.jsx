import React, { useContext } from 'react'
import "./comp-css/profile.css"
import { Avatar } from '@mui/material';
import styled from "styled-components";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { Line, Circle } from 'rc-progress';
import { Appstate } from '../../context/contextApi';


const DashProfile = () => {
  const { user } = Appstate();

  return (<>
    <div className="profile-wrap wrap-res">
      <div className="profile-card card-res">
        <div className="profile-avatar">
          <Avatar className='header-avatar' sx={{ width: 100, height: 100 }}>A</Avatar>
        </div>
        <Name>
          <label htmlFor="">{user.name}</label>
        </Name>
        <College>
          <label>{user.institution}</label>
        </College>
        <Degree>
          <label htmlFor="">{user.course}</label>
        </Degree>

      </div>
      <div className="profile-progress progress-res" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          progress bar
          <Circle percent={10} strokeWidth={6} strokeColor="#FBC7D4" gapDegree="60" gapPosition="bottom" style={{ zIndex: "1" }}></Circle>
        </div>
      </div>
      <div className="profile-events events-res">
        <div className="event-heading" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "0% 5%"
        }}>
          <label style={{ margin: "2%" }} htmlFor="">Upcoming Events </label>
          <CampaignRoundedIcon />
        </div>
        <Eventdiv className="event-info">
          <div className="info-text" style={{ padding: "0 2%", paddingTop: "1px" }}>
            <label htmlFor="">slkjfdskdjfsiojdfdsfd</label>

          </div>
          <div className="info-date" style={{ textAlign: "right", paddingBottom: "1px" }}>
            <label htmlFor="" style={{ fontSize: "smaller" }}>due date 24-4-23 </label>
          </div>
        </Eventdiv>
      </div>
    </div>

  </>

  )

}
const Eventdiv = styled.div`
border-radius:10px;
box-shadow: 0 2px 10px -2px rgba(0,0,0,.2);
 z-index:1;
 position:relative;
 padding:0 5%;
 margin-bottom:1px;
`
const Name = styled.div`
text-align: center;
label{
  font-size:medium;
}
`
const College = styled.div`
text-align: center;
label{
  font-size:smaller;
}
`
const Degree = styled.div`
text-align: center;
label{
  font-size:smaller;
}
`
export default DashProfile;
