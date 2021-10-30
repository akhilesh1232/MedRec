import { browserSessionPersistence, setPersistence, signOut } from 'firebase/auth';
import React from 'react'
import { useParams } from 'react-router-dom';
import  {Button} from 'reactstrap';
import { auth } from '../Firebase';
import {useHistory} from 'react-router';
function Dashboard() {
    const parameters = useParams();
    const history = useHistory();

    function logout(){
        setPersistence(auth, browserSessionPersistence)
        .then((e)=>{
            signOut(auth)
            .then((e)=>{
                console.log('Signed out successfully');
                history.push('/login');
            })
            .catch((e)=>{
                console.log('Problem occurred while signing out');
            })
        })
    }

    return (
        <div>
            <p>
                {parameters.id}
            </p>
            <Button 
            color = 'danger'
            onClick = { logout }>
                Log out    
            </Button>      
        </div>
    )
}

export default Dashboard;