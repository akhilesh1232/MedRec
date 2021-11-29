import { useParams,useHistory } from 'react-router-dom';
import React,{useState} from 'react'
import {firestore, auth } from '../Firebase';
import {
    browserSessionPersistence,
    setPersistence,
    signOut,
  } from "firebase/auth";
  import {
    Container, Col, Row, Form, FormGroup, Label, Input,
    Nav,
    NavItem,
    Navbar,
    Collapse,
    NavbarBrand,
    NavbarToggler,
    NavLink,
  } from "reactstrap";
  import {setDoc, getDoc, doc } from 'firebase/firestore';

import './UpdateProfile.css';

function UpdateProfilePatient(){
    const [firstname,SetFirstname]=useState(" ");
    const [middlename,SetMiddlename]=useState(" ");
    const [lastname,SetLastname]=useState(" ");
    const [adharnumber,Setadharnumber]=useState('');
    const [emailid,Setemailid]=useState('');
    const [healthId, setHealthId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const parameters = useParams();
    const history = useHistory();

    const toggle = () => setIsOpen(!isOpen);

    getDoc(doc(firestore, 'authorised_patients/',parameters.id))
            .then((docsnap)=> {
                SetFirstname(docsnap.data()['first_name']);
                SetMiddlename(docsnap.data()['middle_name']);
                SetLastname(docsnap.data()['last_name']);
                Setemailid(docsnap.data()['email']);
                Setadharnumber(docsnap.data()['adharNumber']);
                setHealthId(parameters.id);
    });

    function submitData(){
        console.log(
            document.getElementById("mname").value
        )
        setDoc(doc(firestore, 'authorised_patient/',parameters.id),{
            first_name : document.getElementById("fname").value,
            middle_name: document.getElementById("mname").value,
            last_name: document.getElementById("lname").value,
            email: document.getElementById("email").value,
        }, {merge: true})
        .then((e)=>console.log('data added successfully'))
        .catch((e)=>console.log(e))
    }

    function home(){
        history.push('/patientDashboard/'+parameters.id);
    }

  function update_profile_function() {
    history.push("/update_profile_patient/" + parameters.id);
  }
  function permission() {
    history.push("/approval/" + parameters.id);
  }

  function logout() {
    setPersistence(auth, browserSessionPersistence).then(async (e) => {
      return signOut(auth)
        .then((e) => {
          console.log("Signed out successfully");
          localStorage.removeItem("id");
          localStorage.removeItem("role");
          history.push("/login/patient");
        })
        .catch((e) => {
          console.log("Problem occurred while signing out");
        });
    });
  }

    
    return(
        <Container fluid>
            <div className="wrapper">
                <div>
                <Navbar
          light={true}
          expand="md"
          className="navbar p-3">
          <NavbarBrand>
            <NavLink onClick = {home} >
                <strong>Medrec</strong>
            </NavLink>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" style={{ padding: "1%" }} navbar>
              <NavItem>
                <NavLink className="NavItem" onClick={update_profile_function}>
                  MyProfile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavItem" onClick={permission}>
                  Approval Request
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
                </div>
                <div>
                <Form className = "p-5">
            <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input type="text" id="fname" defaultValue={firstname}
                    onChange = {(e)=>SetFirstname(e.target.value)}/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup>
                    <Label>Middle Name</Label>
                    <Input type="text" defaultValue={middlename} id="mname"
                    onChange = {(e)=>SetMiddlename(e.target.value)}/>
                </FormGroup>
                </Col>
                <Col md={2}>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input type="text" defaultValue={lastname} id="lname"
                    onChange = {(e)=>SetLastname(e.target.value)}/>
                </FormGroup>
                </Col>
            </Row>
            <Row form>
                <FormGroup md={2}>
                    <Label>Email</Label>
                    <Input type="text" defaultValue={emailid} id="email"
                    onChange = {(e)=>Setemailid(e.target.value)}/>
                </FormGroup>
            </Row>
            <Row form>
                <FormGroup md={2}>
                    <Label>Adhar Number</Label>
                    <Input type="number" defaultValue={adharnumber} id="adnum"
                    readOnly={true}/>
                </FormGroup>
            </Row>
            <button type="submit" className="saveButton" onClick={submitData}>Save</button>
        </Form>
                </div>
            </div>
        </Container>
    )
}

export default UpdateProfilePatient;
