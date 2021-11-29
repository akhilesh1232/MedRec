import { collection, getDocs, setDoc } from 'firebase/firestore';
import React, {useState, useEffect} from 'react'
import './PatientList.css';
import { Container, Table, Button } from 'reactstrap';
import {firestore} from '../Firebase';
import {doc, deleteDoc} from 'firebase/firestore';
import nothing_image from '../Assets/nothing.svg';
export default function PatientList() {
    const [data, setData] = useState([]);
    const allowed = (index) => {
        console.log(index);
        if(data[index].degreeUrl === '-')
        {
            setDoc(doc(firestore, 'authorised_patients/',data[index].adharNumber),data[index], {merge: true})
            .then((e)=>{
                console.log('You have successfully authorised patient');
                    deleteDoc(doc(firestore, 'unauthorised/',data[index].adharNumber))
                    .then((e)=>{
                        console.log('Patient has been deleted from unauthorised');
                        console.log(data);
                    })
            })
            .then((e)=>{
                alert('The name has added successfully');
                window.location.reload();
            })
            .catch((e)=>{
                console.log('Something went wrong here...');
                window.location.reload();
            })
        }
        else
        {
            setDoc(doc(firestore, 'authorised_doctor/',data[index].adharNumber),data[index],{merge: true})
            .then((e)=>{
                console.log('You have successfully authorised doctor');
                deleteDoc(doc(firestore, 'unauthorised/', data[index].adharNumber))
                .then((e)=>{
                    console.log('Doctor has been deleted from the unauthorised');
                    console.log(data);
                })
            })
            .then((e)=>{
                alert('The name has added successfully');
                window.location.reload();
            })
            .catch((e)=>{
                console.log('Something went wrong here...');
                window.location.reload();
            })
        }
    }


    const deny = (index) => { 
        deleteDoc(doc(firestore, 'unauthorised/', data[index].adharNumber))
        .then((e)=>{
            alert('Removed Successfully');
            window.location.reload();
        })
        .catch((e)=>{
            console.log(e.message);
            alert('Problem in deletion of user');
            window.location.reload();
        })
        
    }
    useEffect(()=>{
        const dataArray = []
        getDocs(collection(firestore, 'unauthorised'))
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                let userData = doc.data();
                dataArray.push({
                    adharUrl: userData.AdharUrl,
                    selfieUrl: userData.SelfieUrl,
                    first_name: userData.first_name,
                    middle_name: userData.middle_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    password: userData.password,
                    adharNumber: userData.adharNumber ,
                    degreeUrl: (userData.DegreeUrl)?userData.DegreeUrl:'-'
                });
            })
            //dataArray.pop();
            setData(dataArray);
            console.log(data);
        })
    },[data.length]);
    if(data.length === 0)
    {
        return(
           <Container>
               <img className = "my-5" src = {nothing_image} alt = 'Nothing here image'/>
           </Container>
        );
    }
    else
    {
            return (
                    <div className="wrapper">
                    <Table >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Adhar Card Image</th>
                                <th>Selfie Image</th>
                                <th>Degree Image(if doctor)</th>
                                <th>Accept</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, index)=>{
                                return(
                                    <tr key = {index}>
                                        <th scope = 'row'>{value.adharNumber}</th>
                                        <td>{value.first_name}</td>
                                        <td>{value.middle_name}</td>
                                        <td>{value.last_name}</td>
                                        <td>
                                            <a href = {value.adharUrl} target = "_blank" rel = 'noreferrer'>
                                                {value.first_name}'s Adhar
                                            </a>
                                        </td>
                                        <td>
                                            <a href = {value.selfieUrl} target = "_blank" rel = "noreferrer">
                                                {value.first_name}'s Selfie
                                            </a>
                                        </td>
                                        <td>
                                            <a href= {value.degreeUrl} target = '_blank' rel = "noreferrer">
                                                {value.first_name}'s degree
                                            </a>
                                        </td>
                                        <td>
                                            <Button 
                                            color = 'success'
                                            onClick = {()=>allowed(index)}
                                            >
                                                Allow
                                            </Button>
                                        </td>
                                        <td>
                                            <Button 
                                            color = 'danger'
                                            onClick = {()=>deny(index)}
                                            >
                                                Deny
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    </div>
            );
    }
}
