import React, {useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../../../config';

const Messages = () => {

    const history = useHistory();
    const talks = useSelector(state => state.message.usersTalk.talks);
    const goToTalk = (id) => {
        history.push(`/dashboard/messages/${id}`)
    }

    return (
        <div className="centralContainer">
            {
                talks.length > 0 ?
                talks.map((talk) => {
                    return (<div key={talk.id} className="talkCard" onClick={() => goToTalk(talk.id)}>
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
            )
}
export default Messages;