import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,

  
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import {Switch} from "antd";
import usersData from "./UsersData";
import Popup from "./Popup";
import "antd/dist/antd.css";
const getBadge = status => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [Res, setRes] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [status, setStatus] = useState(false);
  const [id, setId] = useState();

  


  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  const toggler = () => {
    status ?  setStatus(false) : setStatus(true);

  } 

  
 

  const update = async (e) => {
    e.preventDefault();
    try {
     
    const User = {
        id,
        status
    };
    await axios.put(
      "http://localhost:8000/api/updatestatus",
      User,
      
  ); 
        } catch (err) {console.log("error");}
};

   function admins() {
   
    axios.get("http://localhost:8000/api/displayadmins").then(response => {

      const tab = [];
      response.data.forEach(item => {
        const data = {
          
          "First name" : item.first_name,
          "Last name": item.last_name,
         "Email" : item.email,
         "Status": item.status,
         
        };
        tab.push(data);
      });
      setRes(tab);
    }
   
    );
  //  console.log("dddd");
  }
  
 


  useEffect(
    () => {
      currentPage !== page && setPage(currentPage);
    },
    [currentPage, page]
  );
  useEffect(() => {
   admins()

  }, []);

  return (

    <>
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}
    Res = {Res} setRes = {setRes}
    
    
    
    />
    <CRow>
      <CCol>
          

        <CCard>
          <CCardHeader> Administrators </CCardHeader>
          <CCardBody>
          <CCol col="2" className="mb-3 mb-xl-0 text-right">
              <CButton shape="pill" color="warning" size="lg" onClick={() => setOpenPopup(true)} > Add  <CIcon name="cil-user-follow"/> </CButton>
            </CCol>
            <br/>
            <CDataTable
              items={Res}
              // fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots={{
                Status: item =>
                  <td>
                    {/* <CBadge color={getBadge(item.status)}>
                      {item.status  }
         
                    </CBadge> */}
                   <Switch onClick={toggler}/>
                   {  status ? <span>Active</span> : <span>Inactive</span> }
               </td>
              }}
              
              
            />
              
          </CCardBody>
        </CCard>
       
        
      </CCol>
    </CRow>
    </>
  );
  
};

export default Users;
