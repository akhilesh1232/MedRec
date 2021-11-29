import React from 'react';
import NavBar from './Navbar';
import { NavLink } from 'react-router-dom';
import img1 from '../Assets/asset1.jpg';
// import './Home.css';


const Home = () => {
    return(
        <>
            <div className="container-fluid">
                <div className="row m-0 p-0">
                    <div className="col m-0">
                        <div className="row m-0 p-0">
                            <NavBar />
                        </div>
                        <div className="row">
                            <h1 style = {{margin: '0px', 
                            padding: '0px', 
                            color: '#14279B', 
                            textAlign: 'center',
                            fontSize: '3vw',
                            }}>
                                <span style = {{fontSize: '6vw'}}>
                                    Medrec
                                </span> 
                                <br />
                                The Blockchain Based Health Record Management 
                            </h1>
                        
                        </div>
                        <div className="row">
                            <div className="col">
                                <img 
                                src = {img1} style = {{padding: '0px', width: '80%',height: '80%' , margin: 'auto'}}
                                alt = "Medical"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <h2>
                            <strong > How do we use blockchain? </strong>
                            </h2>
                            <p className = "my-3" style = {{fontSize: '1.5vw'}}>
                                We use the ethereum technology to save your 
                                Electronic Medical Records.The IPFS technology 
                                helps upload and hash your records, and then they 
                                will securely be added to our blockchain. Your data 
                                will only be added to the chain, once you gave the 
                                permission to store it. You can deny it before uploading,
                                 when you KYC-verified doctor will ask you about it. 
                            </p>
                        </div>
                        <div className="row">
                        <h2>
                            <strong > Register Yourself here 👇🏻 </strong>
                        </h2>
                                <NavLink to = '/signup' className = "button" style = {{textAlign: 'center', textDecoration: 'none', padding: '20px', margin: 'auto'}}>
                                Here
                                </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;