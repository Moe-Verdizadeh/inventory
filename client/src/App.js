import React, { useEffect, useState }  from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';   
import Router  from './Router';
import Header from './components/Header';
import axios from 'axios';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() =>{
    axios.get('api/login/checkauth')
    .then(result => {
      console.log(result.status);
      setIsAuthenticated(true);
    })
    .catch(err => console.log('error'));
  });

  return (
    <div> 
      <Header isAuthenticated={isAuthenticated}/>
      <Router isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    </div>
  );
}

export default App;
