import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  where,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  browserSessionPersistence,
  setPersistence,
  signOut,
} from "firebase/auth";
import {
  Container, Col, Row, Form, FormGroup, Label, Input,
  Nav,
  NavItem,
  Navbar,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  NavLink,
} from "reactstrap";
import emailjs from "emailjs-com";
import { firestore,  auth } from "../Firebase";
import "./approval.css";
import { useHistory, useParams } from "react-router";

export default function Approval() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const parameters = useParams();
  const history = useHistory();
  const useFirestore = (patient_id) => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
      const unsub = onSnapshot(
        query(
          collection(firestore, "reports"),
          where("Patient_ID", "==", patient_id)
        ),
        (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        }
      );
      return () => unsub();
    }, ["reports"]);
    return { docs };
  };
  const { docs } = useFirestore(parameters.id);
  const toggle = () => setIsOpen(!isOpen);
  function get(doc1) {
    console.log(doc1);
    setMsg(
      <>
        <div>Doctor ID:{doc1.Doctor_ID}</div>
        <div>Doctor Name:{doc1.Doctor_Name}</div>
        <div>Report ID:{doc1.Report_ID}</div>
        <div>Report Name:{doc1.Report_Name}</div>
        <div>Report Description:{doc1.Report_Desc}</div>
        <div>Current Status:{doc1.Status}</div>
        {doc1.Status === "NA" ? (
          <>
            <button
              style={{ paddingRight: "10px" }}
              onClick={() => {
                statusChange(doc1, "G");
                history.push("/patientDashboard/" + parameters.id);
              }}
            >
              Grant Permission
            </button>
            <button onClick={() => statusChange(doc1, "D")}>
              Deny Permission
            </button>
          </>
        ) : null}
      </>
    );
  }
  async function statusChange(doc1, status) {
    let docmail;
    let pstatus = "Denied";
    console.log(doc1.id);
    const ref = doc(firestore, "reports", doc1.id);
    await updateDoc(ref, {
      Status: status,
    });
    const docRef = doc(firestore, "authorised_doctor", doc1.Doctor_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Mail:", docSnap.data().email);
      docmail = docSnap.data().email;
    } else {
      console.log("No such document");
      return;
    }
    if (status === "G") pstatus = "Granted";
    var params = {
      dr_id: doc1.Doctor_ID,
      pat_id: doc1.Patient_ID,
      pat_nm: doc1.Patient_Name,
      rep_id: doc1.Report_ID,
      rep_nm: doc1.Report_Name,
      rep_desc: doc1.Report_Desc,
      dr_mail: docmail,
      status: pstatus,
    };
    emailjs
      .send(
        "service_72de69u",
        "template_umh695a",
        params,
        "user_x1hWWoi4vf2KW1pb7KVsQ"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }
  function home(){
    history.push('/patientDashboard/'+parameters.id);
}

function update_profile_function() {
history.push("/update_profile_patient/" + parameters.id);
}
function permission() {
history.push("/approval/" + parameters.id);
}

function logout() {
  setPersistence(auth, browserSessionPersistence).then(async (e) => {
    return signOut(auth)
      .then((e) => {
        console.log("Signed out successfully");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        history.push("/login/patient");
      })
      .catch((e) => {
        console.log("Problem occurred while signing out");
      });
  });
}

  return (
    <Container fluid>
      <div className="wrapper">
        <div>
          <Navbar light={true} expand="md" className="navbar p-3">
            <NavbarBrand>
              <NavLink onClick={home}>
                <strong>Medrec</strong>
              </NavLink>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" style={{ padding: "1%" }} navbar>
                <NavItem>
                  <NavLink
                    className="NavItem"
                    onClick={update_profile_function}
                  >
                    MyProfile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="NavItem" onClick={permission}>
                    Approval Request
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="NavItem" onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <hr />
        <div>
          <p>
            {" "}
            We strongly believe that patients' privacy is atmost important. <br />So
            you are the one to choose whether you want a particular report to
            get uploaded or not. You may grant or deny permission asked by
            Doctor.{" "}
          </p>
        </div>
        <hr />
        <Row style={{ padding: "0" }}>
          <Col sm={12} xs={12} md={12} lg={6} xl={6} xxl={6}>
            <h1 style={{ paddingLeft: "20px" }}>Records</h1>
            {docs.map((doc1) => (
              <Row id="row">
                <div>
                  <button id="btns" onClick={() => get(doc1)} key={doc1.id}>
                    {doc1.Report_Name}
                  </button>
                </div>
              </Row>
            ))}
          </Col>
          <Col sm={12} xs={12} md={12} lg={6} xl={6} xxl={6} style = {{borderLeft: '2px solid gray'}}>
            <div
              style={{
                backgroundColor: "#7868E6",
                textAlign: "center",
                padding: "10px",
                borderRadius: "20px",
                fontWeight: 900,
                fontSize: "20px",
              }}
            >
              Details here
            </div>
            <div style={{ padding: "20px" }}>{msg}</div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
