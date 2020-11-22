import React, {useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api, servURL } from '../../../utils/api';

const Messages = () => {

    const talks = useSelector(state => state.message.usersTalk.talks);
    console.log(talks)

    return (
        <div className="centralContainer">
            {
                talks.length > 0 ?
                talks.map((talk) => {
                    return (<div key={talk.id} className="talkCard">
                        <div className="talkAvatar">
                            <img src={`${servURL}${talk.avatar}`} />
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