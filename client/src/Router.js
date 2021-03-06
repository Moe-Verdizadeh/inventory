import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Login/SignIn';
import Signup from './components/Login/SignUp';
import Home from './pages/Home';

export default function Router({isAuthenticated, setIsAuthenticated}) {
    if(!isAuthenticated) {
        return(
            <SignIn setIsAuthenticated={setIsAuthenticated} />
        )
    } else {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path='/signin'>
                    <SignIn />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route> 
                <Route path='/dashboard'>
                    <Dashboard />
                </Route> 
            </Switch>
        )
    }
}
