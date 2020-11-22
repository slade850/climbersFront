import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import DashboardHome from './component/home';
import Profile from './component/profile';
import Messages from './component/messages';
import { useSelector, useDispatch } from 'react-redux';
import { getConversations } from '../../store/messageStore';

const Dashboard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getConversations())
    }, [])

    return (
            <Switch>
                <Route exact path="/dashboard">
                    <Redirect to="/dashboard/home" />
                </Route>
                <Route path="/dashboard/home">
                    <DashboardHome />
                </Route>
                <Route path="/dashboard/profile">
                    <Profile />
                </Route>
                <Route path="/dashboard/messages">
                    <Messages />
                </Route>
            </Switch>
            )
}

export default Dashboard;