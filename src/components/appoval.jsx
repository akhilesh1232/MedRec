// import React, { Component } from "react";
// import { useState } from "react";
// import { doc,updateDoc,getDoc } from "firebase/firestore"; 
// import emailjs from "emailjs-com";
// import { firestore } from '../Firebase';
// import useFirestore from "./useFirestore";
// import { Button } from "reactstrap";
// export default function Approval(){
//     const [msg, setMsg] = useState(null);
//     const { docs } = useFirestore();

//     function get(doc1)
//     {
//        console.log(doc1); 
//         // items.push(<div key={items.length}>Hello</div>);
//         // setItems({ items: [...items] });
// //         setMsg(
// // 'Doctor ID:'+doc1.Doctor_ID+'Doctor Name:'+doc1.Doctor_Name
// // 
// //         );
// //         setBut(
// //           <><button onClick={()=>statusChange(doc1,'G')}>Grant Permission</button><button onClick={()=>statusChange(doc1,'D')}>Deny Permission</button></>
// //         );
// setMsg(
//   <>
//   <div>Doctor ID:{doc1.Doctor_ID}</div>
//   <div>Doctor Name:{doc1.Doctor_Name}</div>
//   <div>Report ID:{doc1.Report_ID}</div>
//   <div>Report Name:{doc1.Report_Name}</div>
//   <div>Report Description:{doc1.Report_Desc}</div>
//   <div>Current Status:{doc1.Status}</div>
//   {doc1.Status == 'NA'?<><button onClick={() => statusChange(doc1, 'G')}>Grant Permission</button><button onClick={() => statusChange(doc1, 'D')}>Deny Permission</button></> : null }
//   </>
// )
//     }
//     async function statusChange(doc1,status)
//     {
//       let docmail;
//       let pstatus='Denied';
//       console.log(doc1.id);
//       const ref = doc(firestore, "reports", doc1.id);
//   await updateDoc(ref, {
//     Status:status
//   });
//   const docRef = doc(firestore, "authorised_doctor",doc1.Doctor_ID);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Mail:", docSnap.data().email);
//     docmail=docSnap.data().email;
//   } else {
//     console.log("No such document");
//     return;
//   }
//   if(status=='G')
//   pstatus='Granted';
//   var params={
//     dr_id:doc1.Doctor_ID,
//     pat_id:doc1.Patient_ID,
//     pat_nm:doc1.Patient_Name,
//     rep_id:doc1.Report_ID,
//     rep_nm:doc1.Report_Name,
//     rep_desc:doc1.Report_Desc,
//     dr_mail:docmail,
//     status:pstatus,
// };
// emailjs.send('service_72de69u', 'template_umh695a', params,'user_x1hWWoi4vf2KW1pb7KVsQ')
//     .then(function(response) {
//        console.log('SUCCESS!', response.status, response.text);
//     }, function(error) {
//        console.log('FAILED...', error);
//     });
//     }
//     return (
//         <div>
//             <h2>Approval page</h2>
//             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam deserunt optio corporis explicabo mollitia! Accusamus fugit aut aliquid quibusdam expedita, autem architecto. Cum iusto accusantium minus reprehenderit cupiditate atque fuga?</p>
//       {docs.map(doc1 => (
//           <div>
//         {/* <Button color='primary'size="lg" block onClick={()=>get(doc1)} key={doc1.id}>{doc1.Report_Name} </Button> */}
//         <button onClick={()=>get(doc1)} key={doc1.id}>{doc1.Report_Name}</button>
//         </div>
//       ))}
//       <div>
//           Details here
//       </div>
     
// <div>
//     {msg}
// </div>
// </div>
//     );
    
// }






import React, { Component } from "react";
import { useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import { doc,updateDoc,getDoc } from "firebase/firestore"; 
 import emailjs from "emailjs-com";
import { firestore } from '../Firebase';
import useFirestore from "./useFirestore";
import { Button } from "reactstrap";
import './approval.css';

export default function Approval(){
    const [msg, setMsg] = useState(null);
    const { docs } = useFirestore();

    function get(doc1)
    {
      console.log(doc1); 
      setMsg(
        <>
        <div>Doctor ID:{doc1.Doctor_ID}</div>
        <div>Doctor Name:{doc1.Doctor_Name}</div>
        <div>Report ID:{doc1.Report_ID}</div>
        <div>Report Name:{doc1.Report_Name}</div>
        <div>Report Description:{doc1.Report_Desc}</div>
        <div>Current Status:{doc1.Status}</div>
        {doc1.Status == 'NA'?<><button style={{paddingRight:"10px"}} onClick={() => statusChange(doc1, 'G')}>Grant Permission</button><button onClick={() => statusChange(doc1, 'D')}>Deny Permission</button></> : null }
        </>
      )
    }
    async function statusChange(doc1,status)
    {
      let docmail;
      let pstatus='Denied';
      console.log(doc1.id);
      const ref = doc(firestore, "reports", doc1.id);
      await updateDoc(ref, {
        Status:status
      });
      const docRef = doc(firestore, "authorised_doctor",doc1.Doctor_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Mail:", docSnap.data().email);
        docmail=docSnap.data().email;
      } else {
        console.log("No such document");
        return;
      }
      if(status=='G')
      pstatus='Granted';
      var params={
        dr_id:doc1.Doctor_ID,
        pat_id:doc1.Patient_ID,
        pat_nm:doc1.Patient_Name,
        rep_id:doc1.Report_ID,
        rep_nm:doc1.Report_Name,
        rep_desc:doc1.Report_Desc,
        dr_mail:docmail,
        status:pstatus,
      };
      emailjs.send('service_72de69u', 'template_umh695a', params,'user_x1hWWoi4vf2KW1pb7KVsQ')
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
            console.log('FAILED...', error);
          });
    }
    return (
    <Container style={{ backgroundColor:"#EDEEF7",padding:"20px 0px 20px 0px",borderRadius:"20px"}}>
      <Row>
          <Col>
              <h2>Approval page</h2>
              <p id="para"> We strongly believe that patients' privacy is atmost important. So you are the one to choose whether you want a particular repost to get uploaded or not.
               You may grant or deny permission asked by Doctor. </p>
          </Col>
      </Row>
      <Row>
          <Col style={{borderRadius:"20px"}}>
            <h1 style={{paddingLeft:"20px"}}>Records</h1>
            {docs.map(doc1 => (
            <Row id="row">
              <div >
                <button id="btns"onClick={()=>get(doc1)} key={doc1.id}>{doc1.Report_Name}</button>
              </div>
            </Row>
            ))}
          </Col>
          <Col>
            <div style={{backgroundColor:"#7868E6",textAlign:"center",padding:"10px",borderRadius:"20px",fontWeight:900,fontSize:"20px"}}>
                Details here
            </div>
            <div style={{padding:"20px"}}>
                {msg}
            </div>
          </Col>
      </Row>
    </Container>
    );  
}