import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default function Signup() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");

  async function signUp(e){
    e.preventDefault();
    try{
    const signUpData = {
      userName,
      email,
      password,
    };

    await axios.post('http://localhost:8000/api/login/signup', signUpData);
      setRedirect(true);
    }  catch(err) {
      console.error(err);
    } 
  }

  if (redirect) {
    return <Redirect to='/signin' />;
  }

  return ( 
    <div>
      <div className="display-4 offset-4 col-4">Please Sign up</div>
      <div className="offset-4 col-4">
        <Form onSubmit={signUp}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name" onChange={( e ) => setUserName(e.target.value)} value={userName} /> 
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={( e ) => setEmail(e.target.value)} value={email} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={( e ) => setPassword(e.target.value)}  />
          </Form.Group>

          {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <Button variant="primary" type="submit">Sign Up</Button>
        </Form>
      </div>  
    </div>
  )
}




