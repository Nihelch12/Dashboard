import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CNav,
  CNavItem,
  CNavLink
} from '@coreui/react'

import { useEffect, useState } from 'react';
import axios from "axios";
import DuelPerDay from './DuelPerDay.js';
import DuelPerMonth from './DuelPerMonth.js';
import DuelPerWeek from './DuelPerWeek.js';




export default function Duels() {

const [active, setActive]=useState("FirstCard")

return(
<>
<CCard>
  {active ==="FirstCard" && <DuelPerDay/> }
  {active ==="SecondCard" &&  <DuelPerWeek/>}
  {active ==="ThirdCard" && <DuelPerMonth/>}
</CCard>

<CNav variant="tabs" >
    <CNavLink active  onClick={()=>setActive("FirstCard")}>Day</CNavLink> 
    <CNavLink  active onClick={()=>setActive("SecondCard")}>Week</CNavLink>
    <CNavLink active onClick={()=>setActive("ThirdCard")}>Month</CNavLink>

     

</CNav>


</>
);



}


