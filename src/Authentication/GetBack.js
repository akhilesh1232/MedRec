import React from 'react'
import { withRouter } from 'react-router';
import { Container, Row } from 'reactstrap';
import img from '../Assets/goBack.svg';
function GetBack() {
    return (
        <Container>
            <Row>
                <p style = {{color: '#B8B5FF', fontSize: '100px', margin: 'auto'}}> Soon, You will receive the email about your KYC</p>
                <h4>Till then, PEACE ✌🏻</h4>
            </Row>
            <Row>
                <img src = {img} alt = 'go back'/>
            </Row>
        </Container>
    )
}
export default withRouter(GetBack);