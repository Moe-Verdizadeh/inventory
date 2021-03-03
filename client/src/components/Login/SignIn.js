import axios from 'axios';
import React, { useState } from 'react'

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
        <h1>
          Please Sign In
        </h1>
        <form onSubmit={signIn}>
          <input type="email" placeholder="Email" onChange={( e ) => setEmail(e.target.value)} value={email}/> 
          <input type="password" placeholder="Password" onChange={( e ) => setPassword(e.target.value)} value={password}/>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}
