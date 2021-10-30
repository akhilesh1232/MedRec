import React from 'react'
import 'reactstrap';
import { Col, Container, Row } from 'reactstrap';
import './AdminDashboard.css';
import PatientList from './PatientList';

function AdminDashboard() {
    return (
        <Container fluid = {true} className = 'wrapper'> 
            <Row className = 'wrapper2'>
                <Row className = 'titleplate'>
                <Col>
                    <h1 className = 'title left'>
                        MedRec  - Admin Dashboard
                    </h1>
                </Col>
                <Col>
                    <h1 className = 'title right'>
                        Akhilesh Patki
                    </h1>
                </Col>
                </Row>   
                <Row className = 'data'> 
                    <PatientList />
                </Row>           
            </Row>
        </Container>
    )
}


export default AdminDashboard;