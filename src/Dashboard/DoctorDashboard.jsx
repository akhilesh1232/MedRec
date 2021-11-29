import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { auth, firestore } from '../Firebase';
import { useHistory } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, 
    Container,   
    Col,
    Card, 
    CardBody,
    CardText,
    CardTitle, } from 'reactstrap';
import { browserSessionPersistence, setPersistence, signOut } from 'firebase/auth';
import { 
    getDoc, 
    doc,
    collection,
    onSnapshot,
    where,
    query     
} from 'firebase/firestore';
//function to get to *doctors* dashboard
function Dashboard() {
    const [firstname,SetFirstname]=useState('');
    const [healthId, setHealthId] = useState("");
    const parameters = useParams();
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);

    useEffect( async () => {
        await getDoc(doc(firestore, "authorised_doctor/", parameters.id))
        .then((docsnap) => {
          SetFirstname(docsnap.data()["first_name"]);
          setHealthId(docsnap.data()["adharNumber"]);
        })
        .catch((e) => {
          SetFirstname("Doctor");
          console.log("There is prblm!!");
        });
    }, [user]);
    
    const useFirestore = ( healthId ) => {
        const [docs, setDocs] = useState([]);
        useEffect(() => {
          const unsub = onSnapshot(
            query(
              collection(firestore, "reports"),
              where("Doctor_ID", "==", healthId),
              where('Status', "==", "Uploaded")
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

    return (
        <Container fluid>
              <div className="wrapper">
              <Navbar
          light={true}
          expand="md"
          className="navbar">
          <NavbarBrand>
            <strong>Medrec</strong>
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
                <div className="p-3">
        {docs.map((value, key)=>{
          console.log(value);
          return(
            <Col 
              sm = {12} xs = {12} md = {6} lg = {6} xl = {4} xxl = {4}
            >
              <Card className = "m-3">
                <CardBody>
                  <CardTitle tag = 'h3'> Report : {key + 1} </CardTitle>
                  <CardTitle tag = 'h3'> Name: {value.Report_Desc} </CardTitle>
                    <CardText>
                      <br/>
                        <a 
                        target = '_blank' 
                        href = {'https://ipfs.io/ipfs/'+value.ipfsHash} 
                        rel = 'noreferrer'>
                          Open the record
                        </a>
                        <br />
                        <h6>
                          Doctor Id: {value.Doctor_ID}
                        </h6>
                        <h6>
                          Patient Id: {value.Patient_ID}
                        </h6>
                        <h6>
                          Date Added: {value.dateUploaded}
                        </h6>  
                    </CardText>
                  </CardBody>
                </Card>
                </Col>
          );
        })}
      </div>
              </div>
        </Container>
    )
}

export default Dashboard;