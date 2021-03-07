import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default function SignIn({setIsAuthenticated}) {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function signIn(e){
    e.preventDefault(); 
    const signInData = {
      email,
      password,
    };

    axios.post('/api/login/signin', signInData)
    .then(result => {
      console.log(result);
      setIsAuthenticated(true);
      setShouldRedirect(true);
    })
    .catch();
    // try{
    //   const signInData = {
    //     email, 
    //     password,
    //   };

    //   let data = await axios.post('http://localhost:8000/login/signin', signInData);
    //   if (data) {
    //     console.log(data);
    //     setShouldRedirect(true);
    //   }
    // }  catch(err) {
    //   console.error(err);
    // }
  }

  if (shouldRedirect) {
    return <Redirect to='/dashboard' />;
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


