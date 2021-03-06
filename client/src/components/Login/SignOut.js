import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'

export default function SignOut() { 

        axios.post('/api/login/signOut')  
        
    return (
        <div>
            <Button>Sign Out</Button>
        </div>
    )
}
