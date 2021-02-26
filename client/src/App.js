import React from 'react';
import './App.css';
import Header from './components/Header';
import Items from './pages/Items'; 
import Locations from './pages/Locations'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div> 
      <Header/> 
      <div >
        <Locations />
        <Items /> 
      </div>
    </div>
  );
}

export default App;
