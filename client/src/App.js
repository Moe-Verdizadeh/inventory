import React  from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';   
import Router  from './Router';
import Header from './components/Header';

function App() {
 
  // const [token, setToken] = useState();
  // if(!token) {
  //   return <SignIn setToken={setToken} />
  // } 

  return (
    <div> 
      <Header />
      <Router />   
    </div>
  );
}

export default App;
