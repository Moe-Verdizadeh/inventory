import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'

export default function SignOut() {
    async function signOut(e){ 
        axios.post('/api/login/signOut') 
    }
    return (
        <div>
            <Button>Sign Out</Button>
        </div>
    )
}
