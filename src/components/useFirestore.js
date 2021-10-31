import { useState, useEffect } from 'react';
import  {firestore}  from  '../Firebase';
import { collection, getDocs ,doc,onSnapshot,query,where} from "firebase/firestore"; 
const useFirestore = () => {
  const [docs, setDocs] = useState([]);
useEffect(() => {
  const unsub = onSnapshot(query(collection(firestore,'reports'),where('Patient_ID','==','123')), (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
    });
    setDocs(documents);
  });
    return () => unsub();
  }, ['reports']);
  return { docs };
}
export default useFirestore;
