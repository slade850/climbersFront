import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import DashboardHome from './component/home';
import Profile from './component/profile';
import Messages from './component/messages';
import { useDispatch } from 'react-redux';
import { getConversations } from '../../store/messageStore';
import { getPosts } from '../../store/postStore';
import MessagesFrom from './component/messageFrom';
import io from '../../utils/socket';

const Dashboard = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getConversations())
        dispatch(getPosts())
        io.on("connect", () => {
            console.log(io.id);
            dispatch({type: 'SET_IO_ID', payload: io.id}) 
        });
        io.on('event', (data) => {
            console.log(data);
        })
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
                <Route exact path="/dashboard/messages">
                    <Messages />
                </Route>
                <Route path="/dashboard/messages/:id">
                    <MessagesFrom />
                </Route>
            </Switch>
            )
}

export default Dashboard;