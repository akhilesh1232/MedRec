import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { collection, doc, setDoc,getDoc } from "firebase/firestore"; 
import { firestore } from '../Firebase';
import {Form as InputForm, Input, Label, FormGroup} from 'reactstrap';
import './permission.css';
export default function Permission(){
    const [DrID, setDrID] = useState('');
    const [PatID, setPatID] = useState('');
    const [PatName, setPatName] = useState('');
    const [DrName, setDrName] = useState('');
    const [RepoName, setRepoName] = useState(null);
    const [RepoDesc, setRepoDesc] = useState(null);
    const [msg,setMsg]=useState(null);
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
            Patient_Name:PatName,
            Report_ID:(docRef.path).slice(8),
            Report_Name:RepoName,
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
            rep_nm:RepoName,
            rep_desc:RepoDesc,
        };
        emailjs.send('service_72de69u', 'template_ovqh5ed', params,'user_x1hWWoi4vf2KW1pb7KVsQ')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    }
    // return(
    //     <div>
    //         <form onSubmit={setData}>
    //         <input type="text" placeholder="Your ID" onChange = {(e)=>setDrID(e.target.value)} name="dr_id"/>
    //         <input type="text" placeholder="Your Name"  onChange = {(e)=>setDrName(e.target.value)}name="dr_nm"/>
    //         <input type="text" placeholder="Patient ID" onChange = {(e)=>setPatID(e.target.value)}name="pat_id"/>
    //         <input type="text" placeholder="Patient Name"  onChange = {(e)=>setPatName(e.target.value)}name="pat_nm"/>
    //         <input type="text" placeholder="Report Name" onChange = {(e)=>setRepoName(e.target.value)}name="rep_nm"/>
    //         <textarea placeholder="Report Description"  onChange = {(e)=>setRepoDesc(e.target.value)}name="rep_desc" rows="3" cols="40" ></textarea>
    //         <input type="submit" value="Ask for Permission" ></input>
    //         </form>
    //     </div>
    // )



    return(
        <div id="main-body">
            <h2 >Permission to upload records</h2>
            <p>We strongly believe that patients' privacy is atmost important..So take their consent before you upload any of their records on our system.</p>
            <InputForm className = 'form'>
                <h4>Fill up the form below to ask for patient's permission</h4>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'drID'>Doctor's ID</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Your ID' 
                        onChange = {(e)=>setDrID(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'drnm'>Doctor's Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Your Name' 
                       // onChange = {(e)=>setMiddleName(e.target.value)}
                       onChange = {(e)=>setDrName(e.target.value)}
                />
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'patID'>Patient's ID</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        placeholder = 'Patient ID (whose report you want to upload)' 
                        //onChange = {(e)=>setLastName(e.target.value)}
                        onChange = {(e)=>setPatID(e.target.value)}
                />
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'patnm'>Patient's Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        name = 'text' 
                       // onChange = {(e)=>setAdharNumber(e.target.value)}
                       onchange={(e)=>setPatName(e.target.value)}
                        placeholder = 'Patient Name'>
                    </Input>
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'repnm'>Report Name</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'text' 
                        name = 'text' 
                       // onChange = {(e)=>setAdharNumber(e.target.value)}
                       onchange={(e)=>setRepoName(e.target.value)}
                        placeholder = 'Report Name'>
                    </Input>
                </FormGroup>
                <FormGroup style = {{margin: '30px'}}>
                    <Label className = 'label' for = 'repdesc'>Description</Label>
                    <Input 
                        required = {true}
                        className = 'input' 
                        style = {{marginTop: '15px', border: '2px solid black'}} 
                        type = 'textarea' 
                        name = 'text' 
                       // onChange = {(e)=>setAdharNumber(e.target.value)}
                       onChange = {(e)=>setRepoDesc(e.target.value)}
                        placeholder = 'Description (What the report is about)'>
                    </Input>
                </FormGroup>
               

                <button onClick = {(e)=>{
                    e.preventDefault();
                    setData(e);
                }}>
                    Ask for permission
                </button>
                <div id="msg">{msg}</div>
            </InputForm>
           
        </div>
    )


}
 // function sendEmail (e){
    //     e.preventDefault();
    // emailjs.sendForm('service_72de69u', 'template_ovqh5ed',e.target, 'user_x1hWWoi4vf2KW1pb7KVsQ')
    //   .then((result) => {
    //       console.log(result.text);
    //     setData();
    //   }, (error) => {
    //       console.log(error.text);
    //   });
    //   e.target.reset()
    // }

//    async function getEmail(adhar)
//     {
//         const docRef = doc(firestore, "authorised_patients",adhar);
// const docSnap = await getDoc(docRef);
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data().email);
//   {setPatMail(docSnap.data().email);}
//   console.log(PatMail);
// } else {
//   console.log("No such document!");
// }
// }