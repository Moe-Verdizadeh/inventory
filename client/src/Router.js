import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Login/SignIn';
import Signup from './components/Login/SignUp';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <div>Home</div>
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
        </BrowserRouter>
    )
}
