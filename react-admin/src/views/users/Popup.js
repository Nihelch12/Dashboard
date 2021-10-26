
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Dialog, Button } from '@material-ui/core';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'


export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;


  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [C_password, setCPassword] = useState("");
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();

  const [Status, setStatus] = useState(true);

 



  const addToForum = () => {
    axios.post("http://localhost:8000/api/register",
      {
        email: Email,
        firstname,
        lastname,
        password: Password,
        role: Role,
        c_password: C_password,
        status : Status
      }).then((response)=> {

        //console.log(response.data.data);
          
      //props.setRes(...(props.Res), response.data.data);

    axios.get("http://localhost:8000/api/displayadmins").then(response => {
      console.log(response.data);

      const tab = [];
      response.data.forEach(item => {
        const data = {
          
          "Firstname" : item.first_name,
          "Lastname": item.last_name,
         "Email" : item.email,
         "Status": item.status
          
        };
        tab.push(data);
      });
      props.setRes(tab);
    }
   
    );
      } ) ;
  };



  function add() {

   addToForum()
  
   setOpenPopup(false);
   // window.location.reload();
    console.log("ekhdemmmmmmm")
  }

  return (
    <Dialog  open={openPopup}
    >
        <div className="ml-auto">
        <Button
          color="secondary"

          onClick={() => setOpenPopup(false)}
        >
          <div style={{ diplay: ' flex' }}> x</div>

        </Button>
      </div>
      

      <CCard style={{  height: 500 , width: 600 }}>
            <CCardHeader>
              
              Add Administrator
            </CCardHeader>
            <CCardBody>
              <CForm  method="post">
              <CFormGroup>
                  <CLabel htmlFor="nf-password">First name</CLabel>
                  <CInput type="text" id="nf-name" name="nf-name" placeholder="Enter firstname.." autoComplete="current-name"onChange={(event) => {
              setFirstName(event.target.value);
            }}/>
                  <CFormText className="help-block" >Please enter firstname</CFormText>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-password">Last name</CLabel>
                  <CInput type="text" id="nf-name" name="nf-name" placeholder="Enter lasttname.." autoComplete="current-name"onChange={(event) => {
              setLastName(event.target.value);
            }}/>
                  <CFormText className="help-block" >Please enter lastname</CFormText>
                </CFormGroup>
                <CFormGroup >
                  <CLabel htmlFor="nf-email">Email</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email" onChange={(event) => {
              setEmail(event.target.value);
            }}/>
                  <CFormText className="help-block" > Please enter email</CFormText>
                  
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password" onChange={(event) => {
              setPassword(event.target.value);
            }}/>
                  <CFormText className="help-block" >Please enter  password</CFormText>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-password">Confirm Password</CLabel>
                  <CInput type="password" id="nf-cpassword" name="nf-cpassword" placeholder="Confirm Password.." autoComplete="current-cpassword" onChange={(event) => {
              setCPassword(event.target.value);
            }}/>
                  <CFormText className="help-block" >Please confirm password</CFormText>
                </CFormGroup>
                
               

                <CFormGroup>
                  <CLabel htmlFor="nf-password">Role</CLabel>
                  <CInput type="text" id="nf-role" name="nf-role" placeholder="Enter Role.." autoComplete="current-role" onChange={(event) => {
              setRole(event.target.value);
            }}/>


                  <CFormText className="help-block" >Please enter role</CFormText>
                </CFormGroup>
                
                <CButton type="submit" size="sm" color="primary" onClick={()=> add() }><CIcon name="cil-scrubber"  /> Submit</CButton>              

              </CForm>
            </CCardBody>
          
          </CCard>
    





    </Dialog>

  );

};

