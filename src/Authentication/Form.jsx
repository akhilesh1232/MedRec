import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router';
import {Form as InputForm, Input, Label, FormGroup} from 'reactstrap';
import { auth, storage, firestore } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import './Form.css';

function Form() {
    

    const [role, setRole] = useState('Doctor');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [adharImage, setAdharImage] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [degree, setDegree] = useState(null);
    const [adhar_number, setAdharNumber] = useState('');
    let history = useHistory();


    function getAndSetData(){
        let email = localStorage.getItem('email');
        let password = localStorage.getItem('password');
        createUserWithEmailAndPassword(auth, email, password)
        .then((user) =>{
        const storageRef1 =  ref(storage, 'auth/Adhar/adharImage'+adhar_number);
        uploadBytes(storageRef1, adharImage)
        .then( (snapshot)=>{
             getDownloadURL(snapshot.ref)
            .then( (downloadURL) => {
                setDoc(doc(firestore, 'unauthorised/', adhar_number),{
                    AdharUrl: downloadURL,
                },{merge: true})
                .then((e)=>console.log('successfully added adhar url'))
                .catch((e)=>console.log(e));
            })
        })
        .then(()=>{
        const storageRef2 =  ref(storage, 'auth/Selfie/selfieImage'+adhar_number);
        uploadBytes(storageRef2, selfie)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
                setDoc(doc(firestore, 'unauthorised/', adhar_number),{
                    SelfieUrl: downloadURL,
                },{merge: true})
                .then((e)=>console.log('successfully added selfie url'))
                .catch((e)=>console.log(e));                
            })
        })
        .then(()=>{ 
            if(degree !== null)
            {
                const storageRef3 =  ref(storage, 'auth/Degree/degreeImage'+adhar_number);
                uploadBytes(storageRef3, degree)
                .then((snapshot)=>{
                    getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        setDoc(doc(firestore, 'unauthorised/', adhar_number),{
                            DegreeUrl: downloadURL,
                        }, {merge: true})
                        .then((e)=>console.log('successfully added degree url'))
                        .catch((e)=>console.log(e));
                    })
                    .catch((e)=>console.log(e.message))
                })
                .catch((e)=>console.log(e.message))
            }
            setDoc(doc(firestore, 'unauthorised/',adhar_number),{
                first_name : firstName.trim(),
                middle_name: middleName.trim(),
                last_name: lastName.trim(),
                email: email,
                password: password,
                adharNumber: adhar_number,
                time: Timestamp.now(),
            }, {merge: true})
            .then((e)=>console.log('data added successfully'))
            .catch((e)=>console.log(e))
        })
        .catch((e)=>alert(e.message))
    })
    .catch((e)=>alert(e.message))
    })
    .catch((e)=>alert(e.message))
}

    useEffect(()=>{
        const credential = localStorage.getItem('email');
        if(!credential){
            alert('You are on wrong page');
            history.push('/signup');
        }
    }, [history]);


    function submitData(){
        getAndSetData();
        //add the remove from localstorage here
        localStorage.clear();
    }


    return (
        <div>
            <InputForm className = 'form'>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'firstName'>First Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Enter First Name (According to Adhar Card)' 
                        onChange = {(e)=>setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'middleName'>Middle Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Enter Middle Name (According to Adhar Card)' 
                        onChange = {(e)=>setMiddleName(e.target.value)}
                />
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'lasttName'>Last Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Enter Last Name (According to Adhar Card)' 
                        onChange = {(e)=>setLastName(e.target.value)}
                />
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'role'>You want to sign up as?</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'select' 
                        name = 'select' 
                        onChange = {(e)=>setRole(e.target.value)}>
                            <option value = 'Doctor'>Doctor</option>
                            <option value = 'Patient'>Patient</option>
                    </Input>
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'adhar_no'>Enter Adhar Number</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        name = 'text' 
                        onChange = {(e)=>setAdharNumber(e.target.value)}
                        placeholder = 'Enter Adhar Number (without spaces)'>
                    </Input>
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                <label class="file_upload">
                    <input 
                        required = {true}
                        type="file"
                        onChange = {(e)=>setAdharImage(e.target.files[0])}
                    />
                        Upload Adhar Card Photo
                </label>
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                <label class="file_upload">
                    <input 
                        required = { true }
                        type="file"
                        onChange = {(e)=>setSelfie(e.target.files[0])}
                    />
                        Upload Your Selfie with Adhar Card
                </label>
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                <label class="file_upload">
                    <input 
                        type="file"
                        onChange = {(e)=>setDegree(e.target.files[0])}
                        disabled = {(role === 'Patient')}
                    />
                        Upload Last Year Degree Certificate ({(role==='Doctor')?'Enabled':'Disabled'})
                </label>
                </FormGroup>
                <button onClick = {(e)=>{
                    e.preventDefault();
                    submitData();
                }}>
                    Submit KYC form...
                </button>
            </InputForm>
        </div>
    )
}

export default withRouter(Form);
