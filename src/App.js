import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./Authentication/Signup";
import LoginPatient from "./Authentication/LoginPatient";
import LoginDoctor from "./Authentication/LoginDoctor";
import LoginAdmin from "./Authentication/LoginAdministrator";
import Form from "./Authentication/Form";
import GetBack from "./Authentication/GetBack";
import DoctorDashboard from "./Dashboard/DoctorDashboard";
import PatientDashboard from "./Dashboard/PatientDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import BlockChainData from "./BloackChainData";
import Permission from "./requests/permission";
import Approval from "./requests/appoval";
import Approved from "./requests/approved";
import UpdateProfilePatient from "./Dashboard/UpdateProfilePatient";
import UpdateProfileDoctor from "./Dashboard/UpdateProfileDoctor";
import Landing from './Landing/LandingPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/block/:id">
            <BlockChainData />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
          <Route exact path="/login/patient">
            <LoginPatient />
          </Route>
          <Route exact path="/login/doctor">
            <LoginDoctor />
          </Route>
          <Route exact path="/login/administrator">
            <LoginAdmin />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/getback">
            <GetBack />
          </Route>
          <Route exact path="/adminDashboard/:id">
            <AdminDashboard />
          </Route>
          <Route exact path="/doctorDashboard/:id">
            <DoctorDashboard />
          </Route>
          <Route exact path="/patientDashboard/:id">
            <PatientDashboard />
          </Route>
          <Route exact path="/permission/:id">
            <Permission />
          </Route>
          <Route exact path="/approval/:id">
            <Approval />
          </Route>
          <Route exact path="/approved/:id">
            <Approved />
          </Route>
          <Route exact path="/update_profile_patient/:id">
            <UpdateProfilePatient />
          </Route>
          <Route exact path="/update_profile_doctor/:id">
            <UpdateProfileDoctor />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
