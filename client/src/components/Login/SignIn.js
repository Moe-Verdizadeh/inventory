import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SignIn() {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  async function signIn(e){
    e.preventDefault();
    try{
    const signInData = {
      email, 
      password,
    };

    await axios.post('http://localhost:8000/login/signin', signInData);
    }  catch(err) {
      console.error(err);
    } 
  }

  return (
    <div> 
      <div className="display-4 offset-4 col-4">Please Login</div>
      <div className="offset-4 col-4">
        <Form onSubmit={signIn}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={( e ) => setEmail(e.target.value)} value={email} /> 
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={( e ) => setPassword(e.target.value)} value={password} />
          </Form.Group>

          {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <Button variant="primary" type="submit">Sign In</Button>
        </Form>
      </div> 
    </div>
  )
}


