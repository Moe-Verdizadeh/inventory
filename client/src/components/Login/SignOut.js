import React, { useEffect } from 'react';
import axios from 'axios'; 
import { Redirect } from 'react-router-dom';

export default function SignOut({setIsAuthenticated}) { 

     useEffect(() => {
        axios.post('/api/login/signout')
        .then(result => {
            setIsAuthenticated(false);
        })
        .catch(err => {
            setIsAuthenticated(false);
        });
     });
        
    return (
        <Redirect to="/" />
    )
}
