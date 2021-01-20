import React, {useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import config from '../../../../config';
import api from '../../../utils/api';
import { getInvitations } from '../../../store/messageStore';

const Messages = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const talks = useSelector(state => state.message.usersTalk.talks);
    const groups = useSelector(state => state.message.usersTalk.groups);
    const invitations = useSelector(state => state.message.usersInvitation.invitations);
    const goToTalk = (slug) => {
        history.push(`/dashboard/messages/${slug}`)
    }
    const goToGroup = (slug) => {
        history.push(`/dashboard/goup-messages/${slug}`)
    }
    const handleCheck = (e, act, body) => {
        console.log(e.target.className)
        e.preventDefault();
        if(act === 'val'){
            api.post('user/accept-contact', body)
            .then(() => dispatch(getInvitations()))
            .catch(err => console.log(err))
        } else {
            api.delete(`private-message/delete/${body.msgId}`, { crossdomain: true })
            .then(() => dispatch(getInvitations()))
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="centralContainer rows flexEvenly">
            <div className="splitrow-10 flexEvenly">
                {
                    invitations.length > 0 ?
                    invitations.map((invit) => {
                        return (<div key={invit.id} className="talkCard" >
                        <div className="talkAvatar">
                            <img src={`${config.SERVE_URL}${invit.avatar}`} />
                        </div>
                        <h2>{invit.pseudo}</h2>
                        <h3>{`${invit.firstNme} ${invit.lastName}`}</h3>
                        <div className="respInv">
                            <div><FontAwesomeIcon className="val" icon={faCheckCircle} onClick={(e) => handleCheck(e, 'val' ,{msgId: invit.id, contactId: invit.senderId})} /></div>
                            <div><FontAwesomeIcon className="rej" icon={faTimesCircle} onClick={(e) => handleCheck(e, 'rej',{msgId: invit.id, contactId: invit.senderId})} /></div>
                        </div>
                    </div>)
                    })
                    :
                    <h2 className="noInvit">Vous n'avez pas d'invitation</h2>
                }
            </div>
            <div className="userConv splitrow-5">
                <h2 className="cols-12">Messages privés</h2>
            {
                talks.length > 0 ?
                talks.map((talk) => {
                    return (<div key={talk.id} className="talkCard" onClick={() => goToTalk(talk.slug)}>
                        <div className="talkAvatar">
                            <img src={`${config.SERVE_URL}${talk.avatar}`} />
                        </div>
                        <h2>{talk.pseudo}</h2>
                        {
                            talk.new_messages > 0 &&
                            <div className="talkNewMs">
                                {talk.new_messages}
                            </div>
                        }
                    </div>)
                })
                :
                <h2 className="noTalks">Vous n'avez aucune conversation en cour!</h2>
            }
            </div>
            <div className="groupConv splitrow-5">
            <h2 className="cols-12">Messages groupés</h2>
            {
                groups.length > 0 ?
                groups.map((group) => {
                    return (<div key={group.id} className="talkCard" onClick={() => goToGroup(group.slug)}>
                        <div className="talkAvatar">
                            <img src={`${config.SERVE_URL}${group.picture}`} />
                        </div>
                        <h2>{group.name}</h2>
                        {
                            group.new_messages > 0 &&
                            <div className="talkNewMs">
                                {group.new_messages}
                            </div>
                        }
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