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
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'

import { useEffect, useState } from 'react';
import axios from "axios";
import CamembertChart from './CamembertChart.js';
import Sorting from './Sorting.js';
import GeoChart from './GeoChart.js';
import GameBarChart from './GameBarChart.js';
import LineChart from './LineChart.js';
import SortingCountries from './SortingCountries';
import TransactionsChart from './TransactionsChart.js';



export default function Gamers() {

  const [Res, setRes] = useState(true);

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))



useEffect(() => {
  axios.get("http://localhost:8000/api/gamersLC").then((response) => {
    setRes(response.data);
    console.log(response.data);
  });
}, []);


  return (
    <>
    
      <CCard>
        
     <GeoChart/>
           </CCard>

           <CCard>
        
     <LineChart/>
           </CCard>

      

   

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Traffic {' & '} Sales
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <SortingCountries/>
                </CCol>

                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  

<Sorting/>


                  

                </CCol>
              </CRow>

              <br />

              <TransactionsChart/>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}


