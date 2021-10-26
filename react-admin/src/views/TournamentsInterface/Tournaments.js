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
  CNav
} from '@coreui/react'

import { useEffect, useState } from 'react';
import axios from "axios";
import DayEvolution from './DayEvolution.js';
import WeekEvolution from './WeekEvolution.js';
import MonthEvolution from './MonthEvolution.js';




export default function Tournaments() {

const [active, setActive]=useState("FirstCard")

return(
<>
<CCard>
  {active ==="FirstCard" && <DayEvolution/> }
  {active ==="SecondCard" &&  <WeekEvolution/>}
  {active ==="ThirdCard" && <MonthEvolution/>}
</CCard>

<CNav >
    <CButton color="secondary" onClick={()=>setActive("FirstCard")}>Day</CButton> 
    <CButton color="info" onClick={()=>setActive("SecondCard")}>Week</CButton>
    <CButton color="secondary" onClick={()=>setActive("ThirdCard")}>Month</CButton>

     

</CNav>

</>
);



}


