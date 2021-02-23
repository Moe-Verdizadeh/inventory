import React from 'react';
import './App.css';
import Header from './Header';
import Items from './Items';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="App"> 
      <div>
        <Header/>
        <Items />
      </div>
    </Container>
  );
}

export default App;
