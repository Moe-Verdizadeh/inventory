import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Home() {
    function handleClick() {
        axios.get('/login/checkauth')
        .then(result => {
            console.log(result);
        })
        .catch();
    }
    return (
        <Button onClick={handleClick}> Click Me </Button>
    )
}

export default Home;
