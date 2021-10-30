import React, { useState } from 'react';
import { Col, Container, Label, Row, Input } from 'reactstrap';
import image from '/Users/akhileshpatki/medrec/src/Assets/login_page_image.svg';
import './Login.css';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../Firebase';
import { getDoc, doc } from 'firebase/firestore';
import {useHistory} from 'react-router';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
//import { setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
    const [healthId, setHealthId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');
    const [spinner, isSpinning] = useState(false);

    const history = useHistory();

    const LogInWithHealthId = () => {
        isSpinning(true);
        if(role==='Patient')
        {
            getDoc(doc(firestore, 'authorised_patients/',healthId))
            .then((docsnap)=> {
                console.log(docsnap.data()['email'] +' '+ docsnap.data()['password']);
                if(password === docsnap.data()['password'])
                {
                    setPersistence(auth, browserSessionPersistence)
                    .then(()=>{
                        signInWithEmailAndPassword(auth, docsnap.data()['email'], docsnap.data()['password'])
                        .then((e)=>{
                            alert('Logged in successfully');
                            history.push('/dashboard/'+healthId);
                        })
                    })
                    .catch((e)=>{
                        console.log('error');
                    })
                }
                else{
                    alert('Wrong Credentials');
                    setHealthId('');
                    setPassword('');
                    setRole('Patient');
                }
            })
            .catch((e)=>{
                alert('Such accounts does not exist');
                console.log(e);
            })
        }
        else if(role === 'Doctor')
        {
            getDoc(doc(firestore, 'authorised_doctors/',healthId))
            .then((docsnap)=> {
                console.log(docsnap.data()['email'] +' '+ docsnap.data()['password']);
                if(password === docsnap.data()['password'])
                {
                    setPersistence(auth, browserSessionPersistence)
                    .then(()=>{
                        signInWithEmailAndPassword(auth, docsnap.data()['email'], docsnap.data()['password'])
                        .then((e)=>{
                            alert('Logged in successfully');
                            history.push('/dashboard/'+healthId);
                        })
                    })
                    .catch((e)=>{
                        console.log('error');
                    })
                }
                else{
                    alert('Wrong Credentials');
                    setHealthId('');
                    setPassword('');
                    setRole('Patient');
                }
            })
            .catch((e)=>{
                alert('Such accounts does not exist');
                console.log(e);
            })
        }
        else
        {
            getDoc(doc(firestore, 'administrators/',healthId))
            .then((docsnap)=> {
                console.log(docsnap.data()['email'] +' '+ docsnap.data()['password']);
                if(password === docsnap.data()['password'])
                {
                    setPersistence(auth, browserSessionPersistence)
                    .then(()=>{
                        signInWithEmailAndPassword(auth, docsnap.data()['email'], docsnap.data()['password'])
                        .then((e)=>{
                            alert('Logged in successfully');
                            history.push('/dashboard/'+healthId);
                        })
                    })
                    .catch((e)=>{
                        console.log('error');
                    })
                }
                else{
                    alert('Wrong Credentials');
                    setHealthId('');
                    setPassword('');
                    setRole('Patient');
                }
            })
            .catch((e)=>{
                alert('Such accounts does not exist');
                console.log(e);
            })
        }
    }
    
    return (
        <Container>
        <Row>
            <div className = 'signupbox'>
                    <Row>
                        <Col className = 'left'>
                        <form>
                            <h1 className = 'h1'>
                                Log In
                            </h1>
                            <p className = 'para'>
                                Don't have an account? 
                                <br />
                                <Link to = '/signup'>
                                <button className = 'button'>
                                    Sign up
                                </button> 
                                </Link>
                            </p>
                            <Row>
                            <Label> Choose a role to login: </Label>
                            <Input 
                                required = {true}
                                className = 'input' 
                                type = 'select' 
                                name = 'select' 
                                onChange = {(e)=>setRole(e.target.value)}>
                            <option value = 'Doctor'>Doctor</option>
                            <option value = 'Patient'>Patient</option>
                            <option value = 'Administrator'>Administrator</option>
                            </Input>
                            <input 
                                className = 'input'
                                placeholder = {(role === 'Administrator')?'Enter the Id':'Enter the Health Id'}
                                onChange = {(e)=>setHealthId(e.target.value)}
                            />
                            <input 
                                type = 'password'
                                className = 'input'
                                placeholder = 'Enter Password'
                                onChange = {(e)=>setPassword(e.target.value)}
                            />
                            </Row>
                            <Row>
                            <button 
                            className = 'button'
                            onClick = {(e)=>{
                                e.preventDefault();
                                LogInWithHealthId();
                            }}>
                                {(spinner === false)?'Login':'Logging in...'}
                            </button>
                            </Row>
                        </form>
                        </Col>
                        <Col>
                         <img className = 'img' src = {image} alt = 'login'/> 
                        </Col>
                    </Row>
            </div>
        </Row>
    </Container>
    )
}

export default Login;
