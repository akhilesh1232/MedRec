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
        <Container className = 'container'>
        <Row className = 'row'>
            <div className = 'signupbox'>
                    <Row>
                        <Col className = 'left'>
                        <form>
                            {/* <Row> */}
                            <h1>
                                Log In
                            </h1>
                            <p style = {{marginTop: '20px'}}>
                                Don't have an account? 
                                <br />
                                <Link to = '/signup'>
                                <button style = {{marginTop: '10px'}}>
                                    Sign up
                                </button> 
                                </Link>
                            </p>
                            {/* </Row> */}
                            <Row>
                            <Label> Choose a role to login: </Label>
                            <Input 
                                required = {true}
                                className = 'input' 
                                style = {{marginTop: '15px', border: '2px solid black'}} 
                                type = 'select' 
                                name = 'select' 
                                onChange = {(e)=>setRole(e.target.value)}>
                            <option value = 'Doctor'>Doctor</option>
                            <option value = 'Patient'>Patient</option>
                            <option value = 'Administrator'>Administrator</option>
                            </Input>
                            <input 
                                style = {{ marginTop: '20px' }} 
                                placeholder = {(role === 'Administrator')?'Enter the Id':'Enter the Health Id'}
                                onChange = {(e)=>setHealthId(e.target.value)}
                            />
                            <input 
                                type = 'password'
                                style = {{ marginTop: '20px' }} 
                                placeholder = 'Enter Password'
                                onChange = {(e)=>setPassword(e.target.value)}
                            />
                            </Row>
                            <Row>
                            <button onClick = {(e)=>{
                                e.preventDefault();
                                LogInWithHealthId();
                            }}>
                                {(spinner === false)?'Login':'Logging in...'}
                            </button>
                            </Row>
                        </form>
                        </Col>
                        <Col>
                         <img style = {{ width: '100%',height: '100%', marginTop: '30px' }} src = {image} alt = 'login'/> 
                        </Col>
                    </Row>
            </div>
        </Row>
    </Container>
    )
}

export default Login;
