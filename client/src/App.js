import React, { useState }  from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';  
import Dashboard from './components/Dashboard/Dashboard'; 
import SignUp from  './components/Login/SignUp';
import SignIn from './components/Login/SignIn'

function App() {
 
  // const [token, setToken] = useState();
  // if(!token) {
  //   return <SignIn setToken={setToken} />
  // } 

  return (
    <div> 
      <Dashboard />  
      <SignUp /> 
    </div>
  );
}

export default App;
