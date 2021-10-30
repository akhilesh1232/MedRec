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
                            <h1 className = 'h1'>
                                Sign Up
                            </h1>
                            <p className = 'para'>
                                Alerady have an account? 
                                <br />
                            <Link to = '/login'>
                            <button className = 'button m-2'>
                                    Login here
                                </button> 
                            </Link>
                            </p>
                            <Row>
                            <input className = 'input my-3 p-2' type = 'email'  onChange = { (e) => setEmail(e.target.value) } placeholder = 'Enter Email'/>
                            <input className = 'input my-3 p-2' type = 'password'  onChange = { (e) => setPassword(e.target.value) } placeholder = 'Set Password'/>
                            <input className = 'input my-3 p-2' type = 'password'  onChange = { (e) => setConfirmPassword(e.target.value) } placeholder = 'Confirm Password'/>
                            </Row>
                            <Row>
                            <button className = 'button' onClick = {sendEmail}>
                                Send the verification mail
                            </button>
                            </Row>
                        </Col>
                        <Col>
                         <img className = 'img' src = {image} alt = 'signup'/> 
                        </Col>
                    </Row>
            </div>
        </Row>
    </Container>
    )
}

export default Signup
