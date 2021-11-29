import { getDoctorRecords, getPatientRecords } from '../SmartContract';
export const getArray = async (role, length, healthId) => {
        if(role === 'Patient')
        {
            getPatientRecords(length, healthId)
            .then((res)=>{
                return res;
            })
            .catch((err)=>{
                console.log('error', err);
            });
        }
        else
        {
            getDoctorRecords(length, healthId)
            .then((res)=>{
                return res;
            })
            .catch((err)=>{
                console.log('error', err);
            });
        }
    }




//     if(returnArray) 
//         return(
//         <div>
//             <Row>
//             {returnArray.map((value, index)=>{
//                 return(
//                 <Col 
//                 sm = {12} xs = {12} md = {6} lg = {6} xl = {4} xxl = {4}
//                 >
//                     <Card className = "m-3">
//                     <CardBody>
//                         <CardTitle tag = 'h3'> Report : {index + 1} </CardTitle>
//                         <CardText>
//                             The report submitted on the 14 Nov.
//                             <br />
//                             <a target = '_blank' href = {'https://ipfs.io/ipfs/' + value} rel = 'noreferrer'>
//                                 Open the record
//                             </a>
//                         </CardText>
//                     </CardBody>
//                 </Card>
//                 </Col>
//             );
//             })}
//             </Row>
//         </div>
//     );
//     else
//     return(
//         <h1>
//             hello world
//         </h1>
//     )
// }
//98765432
//12836437

// <a target = '_blank' href = {'https://ipfs.io/ipfs/' + value} rel = 'noreferrer'>
//                         Click here to open {index}'th record
//                     </a>