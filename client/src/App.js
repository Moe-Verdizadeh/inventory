import React, { useState }  from 'react';
import './App.css';
import Header from './components/Header';
import Items from './pages/Items'; 
import Locations from './pages/Locations'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences'; 
import Login from './components/Login/Login'

function App() {
 
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  } 

  return (
    <div> 
      <Header/> 
      <div >
        <Locations />
        <Items />  
        {/* <div className="wrapper">
          <h1>Application</h1>
          <BrowserRouter>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/preferences">
                <Preferences />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>  */} 
      </div>
    </div>
  );
}

export default App;
