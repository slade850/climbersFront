import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import DashboardHome from './component/home';
import Profile from './component/profile';
import Messages from './component/messages';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../store/messageStore';
import { getPosts } from '../../store/postStore';
import MessagesFrom from './component/messageFrom';
import GroupMsFrom from './component/groupMsFrom';
import io from '../../utils/socket';

const Dashboard = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user.detail);

    useEffect( () => {
        dispatch(getConversations())
        dispatch(getPosts())
        io.on("connect", () => {
            dispatch({type: 'SET_IO_ID', payload: io.id}) 
        });
        io.on('nvMs', (data) => {
            if(('receiver' in data && data.receiver == user.id) || 'group' in data){
                dispatch(getConversations())
            }
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
                <Route path="/dashboard/messages/:slug">
                    <MessagesFrom />
                </Route>
                <Route path="/dashboard/goup-messages/:slug">
                    <GroupMsFrom />
                </Route>
            </Switch>
            )
}

export default Dashboard;