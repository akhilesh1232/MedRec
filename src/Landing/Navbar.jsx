import React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import "./Navbar.css";



export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }
    
      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    render(){
    return(
            <Navbar className="navbar navbar-expand-lg navbar-light" style = {{margin: '0px', padding: '0px'}}>
                <NavbarBrand className="p-1" to="/">MedRec</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar}/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem className="active">
                            <NavLink className="nav-link" to = "/">Home <span class="sr-only">(current)</span></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to = "/login/patient">Patient Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/login/doctor">Doctor Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/login/administrator">Admin Login</NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
    );
    }
}