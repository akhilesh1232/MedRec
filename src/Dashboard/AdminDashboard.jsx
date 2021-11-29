import React, {useState} from 'react'
import PatientList from './PatientList';
import { auth } from '../Firebase';
import { browserSessionPersistence, setPersistence, signOut } from 'firebase/auth';
import { Col,
     Container, 
     Row,
    Navbar,
NavItem, NavLink, NavbarBrand, Collapse, NavbarToggler, Nav } from 'reactstrap';
import './AdminDashboard.css';
import { useHistory } from 'react-router';

function AdminDashboard() {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    function logout(){
        setPersistence(auth, browserSessionPersistence)
        .then(async (e)=>{
            return signOut(auth)
            .then((e)=>{
                console.log('Signed out successfully');
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                history.push('/login/administrator');
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
                <NavLink className="NavItem" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>  
        <hr />
                <div className = 'data'> 
                    <PatientList />
                </div>   
            </div>        
        </Container>
    )
}


export default AdminDashboard;