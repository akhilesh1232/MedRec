import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { collection, doc, setDoc,getDoc } from "firebase/firestore"; 
import { firestore, auth } from '../Firebase';
import { browserSessionPersistence, setPersistence, signOut } from 'firebase/auth';
import {Form as InputForm, 
    Input, 
    Label, 
    FormGroup, 
    Container, 
    Navbar, 
    Nav, 
    NavItem, 
    NavbarToggler, 
    NavLink, 
    NavbarBrand,
    Collapse

} from 'reactstrap';
import './permission.css';
import { useHistory, useParams } from "react-router";
export default function Permission(){
    const [isOpen, setIsOpen] = useState(false);
    const [DrID, setDrID] = useState('');
    const [PatID, setPatID] = useState('');
    const [PatName, setPatName] = useState('');
    const [DrName, setDrName] = useState('');
    const [RepoName, setRepoName] = useState(null);
    const [RepoDesc, setRepoDesc] = useState(null);
    const [msg,setMsg]=useState(null);
    const history = useHistory();
    const parameters = useParams();
    async function setData(e)
    {
        let pmail;
        e.preventDefault();
        const docRef2 = doc(firestore, "authorised_patients",PatID);
        const docSnap = await getDoc(docRef2);
        if (docSnap.exists()) {
          console.log("Mail:", docSnap.data().email);
          pmail=docSnap.data().email;
        } else {
          console.log("No such document");
        }
        console.log('setting data');
        const docRef = doc(collection(firestore, 'reports/'));
        await setDoc(docRef, {
            Doctor_ID:DrID,
            Patient_ID:PatID,
            Doctor_Name:DrName,
            Patient_Name:document.getElementById('patname').value,
            Report_ID:(docRef.path).slice(8),
            Report_Name:document.getElementById("repname").value,
            Report_Desc:RepoDesc,
            Status:'NA',
        });
      // await getEmail(PatID);
     
       sendEmail((docRef.path).slice(8),pmail);
        <div>Successfully asked for Permission</div>
        setMsg(
            <div>Successfully asked for Permission.Thank You!</div>
        )
    }
    function sendEmail(repid,mail)
    {
        var params={
            dr_id:DrID,
            dr_nm:DrName,
            pat_id:PatID,
            pat_nm:PatName,
            pat_email:mail,
            rep_id:repid,
            rep_nm: document.getElementById("repname").value,
            rep_desc:RepoDesc,
        };
        emailjs.send('service_72de69u', 'template_ovqh5ed', params,'user_x1hWWoi4vf2KW1pb7KVsQ')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    }

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

    return(
        <Container fluid>
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
            <hr/>
            <h2 style = {{color: '#14279b'}}>Permission to upload records</h2>
            <hr/>
            <p>We strongly believe that patients' privacy is atmost important..So take their consent before you upload any of their records on our system.</p>
            <hr />
            <InputForm>
                <h4>Fill up the form below to ask for patient's permission</h4>
                <FormGroup style = {{padding: '20px'}}>
                    <Label className = 'label' for = 'drID'>Doctor's ID</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{margin: '0px',border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Your ID' 
                        onChange = {(e)=>setDrID(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup style = {{padding: '20px'}}>
                    <Label className = 'label' for = 'drnm'>Doctor's Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{margin: '0px',border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Your Name' 
                       // onChange = {(e)=>setMiddleName(e.target.value)}
                       onChange = {(e)=>setDrName(e.target.value)}
                />
                </FormGroup>
                <FormGroup style = {{padding: '20px'}}>
                    <Label className = 'label' for = 'patID'>Patient's ID</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{margin: '0px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Patient ID (whose report you want to upload)' 
                        //onChange = {(e)=>setLastName(e.target.value)}
                        onChange = {(e)=>setPatID(e.target.value)}
                />
                </FormGroup>
                <FormGroup style = {{padding: '20px'}}>
                    <Label className = 'label' for = 'patnm'>Patient's Name</Label>
                    <Input 
                        id = "patname"
                        required = {true}
                        className = 'input' 
                        style = {{margin: '0px',border: '2px solid black'}} 
                        type = 'text' 
                        name = 'text' 
                       // onChange = {(e)=>setAdharNumber(e.target.value)}
                       onchange={(e)=>setPatName(e.target.value)}
                        placeholder = 'Patient Name'>
                    </Input>
                </FormGroup>
                <FormGroup style = {{padding: '20px'}}>
                    <Label className = 'label' for = 'repnm'>Report Name</Label>
                    <Input 
                        id = 'repname'
                        required = {true}
                        className = 'input' 
                        style = {{margin: '0px', border: '2px solid black'}} 
                        type = 'text' 
                        name = 'text' 
                       // onChange = {(e)=>setAdharNumber(e.target.value)}
                       onchange={(e)=>setRepoName(e.target.value)}
                        placeholder = 'Report Name'>
                    </Input>
                </FormGroup>
                <FormGroup style = {{padding: '20px'}}>
                    <Label className = 'label' for = 'repdesc'>Description</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{margin: '0px',border: '2px solid black'}} 
                        type = 'textarea' 
                        name = 'text' 
                       // onChange = {(e)=>setAdharNumber(e.target.value)}
                       onChange = {(e)=>setRepoDesc(e.target.value)}
                        placeholder = 'Description (What the report is about)'>
                    </Input>
                </FormGroup>
                <button 
                style = {{margin: '30px'}}
                onClick = {(e)=>{
                    e.preventDefault();
                    setData(e);
                }}>
                    Ask for permission
                </button>
                <div id="msg">{msg}</div>
            </InputForm>
            </div>
        </Container>  
    );


}