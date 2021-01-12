import React, {useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../../../config';

const Messages = () => {

    const history = useHistory();
    const talks = useSelector(state => state.message.usersTalk.talks);
    const groups = useSelector(state => state.message.usersTalk.groups);
    const goToTalk = (slug) => {
        history.push(`/dashboard/messages/${slug}`)
    }
    const goToGroup = (slug) => {
        history.push(`/dashboard/goup-messages/${slug}`)
    }

    return (
        <div className="centralContainer">
            <div className="userConv">
            {
                talks.length > 0 ?
                talks.map((talk) => {
                    return (<div key={talk.id} className="talkCard" onClick={() => goToTalk(talk.slug)}>
                        <div className="talkAvatar">
                            <img src={`${config.SERVE_URL}${talk.avatar}`} />
                        </div>
                        <h2>{talk.pseudo}</h2>
                        <div className="talkNewMs">
                            {talk.new_messages}
                        </div>
                    </div>)
                })
                :
                <h2 className="noTalks">Vous n'avez aucune conversation en cour!</h2>
            }
            </div>
            <div className="groupConv">
            {
                groups.length > 0 ?
                groups.map((group) => {
                    return (<div key={group.id} className="talkCard" onClick={() => goToGroup(group.slug)}>
                        <div className="talkAvatar">
                            <img src={`${config.SERVE_URL}${group.picture}`} />
                        </div>
                        <h2>{group.name}</h2>
                        <div className="talkNewMs">
                            {group.new_messages}
                        </div>
                    </div>)
                })
                :
                <h2 className="noGroup">Vous n'avez aucune conversation de group en cour!</h2>
            }
            </div>
        </div>
            )
}
export default Messages;