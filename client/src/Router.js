import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Login/SignIn';
import Signup from './components/Login/SignUp';
import SignOut from './components/Login/SignOut';
import Home from './pages/Home';

export default function Router({isAuthenticated, setIsAuthenticated}) {
    if(!isAuthenticated) {
        return(
            <Switch> 
                <Route exact path='/signin'>
                    <SignIn setIsAuthenticated={setIsAuthenticated}/>
                </Route> 
                <Route exact path='/signup'>
                    <Signup />
                </Route>  
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/">
                    <Home setIsAuthenticated={setIsAuthenticated} />
                </Route>
                <Route path='/signin'>
                    <SignIn />
                </Route> 
                    {!isAuthenticated && <Route path='/signup'>
                        <Signup />
                </Route>  }
                <Route path='/dashboard'>
                    <Dashboard setIsAuthenticated={setIsAuthenticated} />
                </Route> 
                <Route path='/signout'>
                    <SignOut setIsAuthenticated={setIsAuthenticated} />
                </Route> 
            </Switch>
        )
    }
}
