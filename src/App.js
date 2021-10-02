import './App.css';
import {Button} from '@mui/material'
import {Container, Row, Col} from 'reactstrap';
function App() {
  return (
    <Container>
      <Row>
        <Col>
        <Button variant = 'outlined'>Hi there</Button>
        </Col>
        <Col>
        <Button variant = 'outlined'>Hi there</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
