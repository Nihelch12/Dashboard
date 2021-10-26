import React from "react";
import { Link, Redirect } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import '../../../scss/style.scss'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // useEffect(() => {
  // //   if (localStorage.getItem("message")) {
  // //     // history.push("/games");
  // //   }
  // // }, []);
  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(item)
    });

    console.log(result);
    result = await result.json();
    if (result.success) {
     // localStorage.getItem("message", JSON.stringify(result));
      localStorage.token = result.message.token;
      var token = localStorage.token;
      var decoded = jwt_decode(token);
      console.log(result.message.user.role);
      
      if (result.message.user.role === "Administrateur") {
        history.push("/gamers");
       // window.location.reload();
      } else if (result.message.user.role === "Super Administrateur") {
        history.push("/games");

       // window.location.reload();
      }
    } else {
      console.log("didn't get it");
    }
    console.log(localStorage.token);
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">


      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={login}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                       
                        <CButton
                          type="submit"
                         // size="sm"
                        //  className="btn-yahoo btn-brand mr-1 mb-1"
                        color="dark"
                        >
                          <span className="mfs-2">Login</span>
                        </CButton>
                        
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-dark p-5 d-md-down-none"
               
              >
                    <img                  src={require("src/assets/icons/seemba.png").default}
                                 // className="photo"
                                
                               style={{
                                 textAlign:"center",
                                 width: "129%",
                                 height: "50%",
                                 marginTop: "0%",
                                 marginLeft: "-14%"
                               }}
                                  alt="..."
                                ></img>{" "}
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p />
                    <Link to="/register">
                      <CButton
                        color="dark"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
