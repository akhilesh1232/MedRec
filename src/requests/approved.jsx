import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row} from "reactstrap";
import { useState, useEffect } from "react";
import { firestore, auth } from "../Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, 
    Container,   
    Col } from 'reactstrap';
import { browserSessionPersistence, setPersistence, signOut } from 'firebase/auth';
import "./approval.css";


export default function Approved() {

  const parameters = useParams();
  const history = useHistory();

  const useFirestore = (doctor_id) => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
      const unsub = onSnapshot(
        query(
          collection(firestore, "reports"),
          where("Doctor_ID", "==", doctor_id),
          where("Status", "==", 'G')
        ),
        (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        }
      );
      return () => unsub();
    }, ["reports"]);
    return { docs };
  };
  const { docs } = useFirestore(parameters.id);
  const [isOpen, setIsOpen] = useState(false);
  function update_profile_function(){
      history.push('/update_profile_doctor/'+parameters.id);
  }
  function requestPatient(){
      history.push('/permission/'+parameters.id);
  }
  function approved(){
      console.log(parameters.id);
      history.push('/approved/'+parameters.id);
  }

  const toggle = () => setIsOpen(!isOpen);

  function home(){
    history.push('/doctorDashboard/'+parameters.id);
}

  //logout function
  function logout(){
      setPersistence(auth, browserSessionPersistence)
      .then(async (e)=>{
          return signOut(auth)
          .then((e)=>{
              console.log('Signed out successfully');
              localStorage.removeItem('id');
              localStorage.removeItem('role');
              history.push('/login/doctor');
          })
          .catch((e)=>{
              console.log('Problem occurred while signing out');
          }) 
      })
  }
  //return
  return (
    <>
      <Container>
      <div className="wrapper">
              <Navbar
          light={true}
          expand="md"
          className="navbar">
          <NavbarBrand>
            <NavLink onClick={home}>
                <strong>Medrec</strong>
              </NavLink>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" style={{ padding: "1%" }} navbar>
              <NavItem>
                <NavLink className="NavItem" onClick = {update_profile_function}>
                   MyProfile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavItem" onClick={requestPatient}>
                  Send Request
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavItem" onClick={approved}>
                  Upload Window
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavItem" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <hr />
            <h2 style = {{color: '#14279b'}}>Upload Window</h2>
            <hr />
        <Row>
          {docs.map((value, index) => {
            return (
              <Col>
                <h6>
                  {index + 1 + ") " + value.Report_Desc}
                  <br />
                  {"Doctors Name: " + value.Doctor_Name}
                  <br />
                  {"Doctor's Id: " + value.Doctor_ID}
                  <br />
                  {"Patient's Id: " + value.Patient_ID}
                  <br />
                  {"Report Id: " + value.Report_ID}
                  <br />
                  {"Status: " + value.Status}
                  <br />
                </h6>
                <button
                  disabled={!(value.Status === "G")}
                  onClick={() => {
                    localStorage.setItem("doctor", value.Doctor_ID);
                    localStorage.setItem("patient", value.Patient_ID);
                    localStorage.setItem("reportId", value.Report_ID);
                    history.push("/block/" + value.Doctor_ID);
                  }}
                >
                  {value.Status === "G" ? "Upload" : "Uploaded"}
                </button>
              </Col>
            );
          })}
        </Row>
        </div>
      </Container>
    </>
  );
}
