import React, { useState, useEffect } from "react";
import setRecord from "./SmartContract";
import { Buffer } from "buffer";
import { useHistory, useParams } from "react-router";
import { Container } from "reactstrap";
import { updateDoc, doc, getDoc } from "@firebase/firestore";
import { firestore } from "./Firebase";
const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default function BloackChainData() {
  const [file, setfile] = useState(null);
  const [ipfshash, setIpfshash] = useState(null);
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const parameters = useParams();
  const history = useHistory();
  useEffect(() => {
    async function getval() {
      getDoc(
        doc(firestore, "authorised_patients", localStorage.getItem("patient"))
      )
        .then((res) => {
          setPatientCount(res.data().totalRecords);
          getDoc(
            doc(firestore, "authorised_doctor", localStorage.getItem("doctor"))
          )
            .then((res) => {
              setDoctorCount(res.data().totalRecords);
            })
            .catch((e) => {
              setDoctorCount(0);
            });
        })
        .catch((e) => {
          setPatientCount(0);
        });
    }
    getval();
  }, []);
  const getBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        resolve(Buffer.from(event.target.result));
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const upload = async (event) => {
    var today = new Date();
    event.preventDefault();
    var value = '';
    if (file) {
      getBuffer(file)
        .then((res) => {
          ipfs
            .add(res)
            .then((res) => {
              setIpfshash(res[0].path);
              value = res[0].path;
              console.log(res);
              setRecord(localStorage.getItem('doctor'), localStorage.getItem('patient'), res[0].path)
              .then((res)=>{
              updateDoc(
                doc(firestore, "reports", localStorage.getItem("reportId")),
                {
                  Status: "Uploaded",
                  ipfsHash: value,
                  dateUploaded:
                    today.getFullYear() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getDate() +
                    " " +
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds(),
                }
              ).then((e) => {
                updateDoc(
                  doc(
                    firestore,
                    "authorised_patients",
                    localStorage.getItem("patient")
                  ),
                  {
                    totalRecords: patientCount + 1,
                  }
                ).then((res) => {
                  updateDoc(
                    doc(
                      firestore,
                      "authorised_doctor",
                      localStorage.getItem("doctor")
                    ),
                    {
                      counter: doctorCount + 1,
                    }
                  );
                }).then((res)=>{
                    history.push('/approved/'+localStorage.getItem('doctor'));
                })
              });
              })
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else 
    {
      alert("Please choose the file");
    }
  };
  useEffect(() => {
    console.log("file", file);
    if (!localStorage.getItem("doctor")) {
      history.push("/login");
    }
  }, [file]);

  return (
    <Container>
      <h1>Hey {parameters.id}!!!</h1>
      <label
        style={{ border: "2px solid green", padding: "5px", marginLeft: "40%" }}
      >
        <input
          type="file"
          onChange={(event) => {
            setfile(event.target.files[0]);
          }}
        />
        Choose file
      </label>
      <h1>
        {file ? file.name : "Nothing"}
      </h1>
      <button onClick = {upload} type = "submit">
            Upload now (click only after selecting the file)
     </button>
      <p>IPFS hash is: {ipfshash}</p>
    </Container>
  );
}
