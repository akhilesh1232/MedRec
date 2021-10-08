import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import image from '/Users/akhileshpatki/medrec/src/Assets/login_page_image.svg';
import './Signup.css';
import { Link } from 'react-router-dom';
import {auth} from '/Users/akhileshpatki/medrec/src/Firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';
function Signup() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const actionCodeSettings = {
    url: 'http://localhost:3000/form',
    handleCodeInApp: true,
  };

  const sendEmail = () => {
    if(password === confirmPassword)  
    {

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(()=>{
            alert('Close this window & Click on verification link sent in email');
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    else
    {
        alert('Passwords should match');
    }
  }
  
    return (
        <Container className = 'container'>
        <Row className = 'row'>
            <div className = 'signupbox'>
                    <Row>
                        <Col className = 'left'>
                            <h1>
                                Sign Up
                            </h1>
                            <p style = {{marginTop: '20px'}}>
                                Alerady have an account? 
                                <br />
                            <Link to = '/login'>
                            <button style = {{marginTop: '10px'}}>
                                    Login here
                                </button> 
                            </Link>
                            </p>
                            <Row>
                            <input type = 'email' style = {{marginTop: '20px' }} onChange = { (e) => setEmail(e.target.value) } placeholder = 'Enter Email'/>
                            <input type = 'password' style = {{marginTop: '20px' }} onChange = { (e) => setPassword(e.target.value) } placeholder = 'Set Password'/>
                            <input type = 'password' style = {{marginTop: '20px' }} onChange = { (e) => setConfirmPassword(e.target.value) } placeholder = 'Confirm Password'/>
                            </Row>
                            <Row>
                            <button onClick = {sendEmail}>
                                Send the verification mail
                            </button>
                            </Row>
                        </Col>
                        <Col>
                         <img style = {{height: '400px', marginTop: '30px'}} src = {image} alt = 'signup'/> 
                        </Col>
                    </Row>
            </div>
        </Row>
    </Container>
    )
}

export default Signup
