import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSelect,
  CToggler
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [c_password, setConfirmPassword] = useState();
  const [role, setRole] = useState();
  const [status, setStatus] = useState(true);

  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    try {
      const newUser = {
        first_name,
        last_name,
        email,
        password,
        c_password,
        role,
        status
      };
      await axios.post("http://localhost:8000/api/register", newUser);

      console.log("Account created successfully ");
      history.push("/login");
      console.log(newUser);
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-4">
              <img
                src={require("src/assets/icons/seembaimg.png").default}
                className="photo"
                alt="..."
              />{" "}
            </CCard>
          </CCol>
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="firstName"
                      onChange={e => setFirstName(e.target.value)}
                      type="text"
                      placeholder="Firstname"
                      autoComplete="firstname"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="lastName"
                      onChange={e => setLastName(e.target.value)}
                      type="text"
                      placeholder="Lastname"
                      autoComplete="lastname"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="Email"
                      onChange={e => setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="Password"
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="c_password"
                      onChange={e => setConfirmPassword(e.target.value)}
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <select
                      style={{ width: 401 }}
                      className=" px-3 py-2 "
                      placeholder="role"
                      onChange={e => setRole(e.target.value)}
                    >
                      <option selected value="Administrateur">
                        Administrateur
                      </option>

                      <option value="Super Administrateur">
                        Super Administrateur
                      </option>
                    </select>
                  </CInputGroup>

                  <br />
                  <CButton
                    type="submit"
                    size="sm"
                    className="btn-yahoo btn-brand mr-1 mb-1"
                  >
                    <span className="mfs-2">Create Account</span>
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Register;
