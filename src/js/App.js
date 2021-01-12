import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from './component/header';
import RouteGuard from './component/routeGuard';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard/dasboard';

import api, { servURL } from './utils/api';
import { getStorageLogged, clearLogged } from './utils/local-storage';
import ResetPassword from './pages/resetPassword';


const App = () => {

    const dispatch = useDispatch();
    const [appRun, setAppRun] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        getStorageLogged() ? api.get('user/me')
            .then(res => {
                dispatch({type: 'SET_USER', payload: res.data.user})
                dispatch({type: 'SET_SOCKETOKEN', payload: res.data.sockeToken})
            })
            .catch(err => {
                dispatch({type: 'SET_USER_LOGGED', payload: false});
                clearLogged();
            })
            .finally(() => setAppRun(true))
            :
            setAppRun(true);
    }, [])

    return (
        <>
        {
        !appRun ? 
        <div>
            app loading
        </div>
        :
        <Router>
            <Header />
                <Switch>
                    <Route exact path="/">
                        <Home res={response} />
                    </Route>
                    <Route path="/register">
					    <Register />
				    </Route>
                    <Route path="/reset-password/:token">
					    <ResetPassword />
				    </Route>
                    <Route path="/login">
					    <Login />
				    </Route>
                    <RouteGuard path="/dashboard" component={Dashboard}/>
                </Switch>
        </Router>
        }
        </>
    )
}

export default App;