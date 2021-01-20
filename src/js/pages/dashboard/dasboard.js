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
import { getConversations, getInvitations } from '../../store/messageStore';
import { getPosts } from '../../store/postStore';
import { getContact } from '../../store/contactStore';
import MessagesFrom from './component/messageFrom';
import GroupMsFrom from './component/groupMsFrom';
import io from '../../utils/socket';
import SearchList from './component/searchList';
import ViewProfile from './component/viewProfile';

const Dashboard = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user.detail);

    useEffect( () => {
        dispatch(getContact())
        dispatch(getConversations())
        dispatch(getInvitations())
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
        <div className="rows flexCenter">
            <Switch>
                <Route exact path="/dashboard">
                    <Redirect to="/dashboard/home" />
                </Route>
                <Route path="/dashboard/home">
                    <DashboardHome />
                </Route>
                <Route path="/dashboard/me">
                    <Profile />
                </Route>
                <Route exact path="/dashboard/messages">
                    <Messages />
                </Route>
                <Route path="/dashboard/messages/:slug">
                    <MessagesFrom />
                </Route>
                <Route path="/dashboard/search">
                    <SearchList />
                </Route>
                <Route path="/dashboard/view/:slug">
                    <ViewProfile />
                </Route>
                <Route path="/dashboard/goup-messages/:slug">
                    <GroupMsFrom />
                </Route>
            </Switch>
        </div>
            )
}

export default Dashboard;