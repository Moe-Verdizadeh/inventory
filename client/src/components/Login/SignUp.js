import axios from 'axios';
import React, { useState } from 'react'

export default function Signup() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp(e){
    e.preventDefault();
    try{
    const signUpData = {
      userName,
      email,
      password,
    };

    await axios.post('http://localhost:8000/login/signup', signUpData);
    }  catch(err) {
      console.error(err);
    } 
  }

  return (
    <div>
        <h1>
          Please Register New Account
        </h1>
        <form onSubmit={signUp}>
          <input type="userName" placeholder="User Name" onChange={( e ) => setUserName(e.target.value)} value={userName}/>
          <input type="email" placeholder="Email@example.com" onChange={( e ) => setEmail(e.target.value)} value={email}/>
          <input type="password" placeholder="Password" onChange={( e ) => setPassword(e.target.value)} value={password}/>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}
