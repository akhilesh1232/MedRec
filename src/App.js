import './App.css';
import React, {Component} from 'react';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Form from './Authentication/Form';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GetBack from './Authentication/GetBack';
import Dashboard from './AdminDashboard/DoctorDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import BloackChainData from './BloackChainData';
class App extends Component {
  render() {
    return (
        <BrowserRouter>
      <Switch>
      <Route>
          <BloackChainData />
      </Route>
      <Route exact path = '/admin/:id'>
          <AdminDashboard />  
        </Route> 
        <Route exact path = '/form'>
            <Form />
        </Route>
        <Route exact path = '/login'>
            <Login />
        </Route>
        <Route exact path = '/signup'>
            <Signup />
        </Route>   
        <Route exact path = '/getback'>
          <GetBack />  
        </Route>  
        <Route exact path = '/dashboard/:id'>
            <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
    );
  }
}


export default App;