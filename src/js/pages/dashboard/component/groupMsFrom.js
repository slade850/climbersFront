import React, { useEffect, useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { getConversations } from '../../../store/messageStore';
import { getTalkGroupFrom }from '../../../store/messageStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import config from '../../../../config';
import io from '../../../utils/socket';

const GroupMsFrom = () => {

    let { slug } = useParams();
    const dispatch = useDispatch();
    const formRef = useRef();
    const [msLoding, setMsLoding] = useState(false);
    const [errorMs, setErrorMs] = useState(null);
    const allMessages = useSelector(state => state.message.messagesFrom.group[slug]);
    const groupId = useSelector(state => state.message.messagesFrom.currentGroupId);
    const user = useSelector(state => state.auth.user.detail);
    const [msg, setMsg] = useState('');


    useEffect( () => {
        dispatch(getTalkGroupFrom(slug))
        .then(()=> dispatch(getConversations()))
        .catch(err => setErrorMs(err))
        .finally(() => {
            setMsLoding(true);
        })
        io.on('nvMs', (data) => {
            if(data.group == groupId){
                dispatch(getTalkGroupFrom(slug))
                .then(()=> dispatch(getConversations()))
                .catch(err => setErrorMs(err))
            }
        })
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);
        api.post('group-message/create',  data, {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            setMsg('');
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="centralContainer">
            {
                msLoding ?
                allMessages && allMessages.length > 0 &&
                allMessages.map((message) => {
                    return (<div key={message.id} className={message.author == user.id ? "messageSent" : "messageReceived"}>
                        <p>{message.created_at}</p>
                        <div className="message">
                            {message.message}
                        </div>
                        {
                                message.medias && message.medias.length > 0 ? (<div className="mediasContainer">{
                                message.medias.map((media) => {
                                return (<div key={media.id.split('-')[0]} className="mediaBlock">
                                {    
                                media.type == 'doc' ? <a href={`${config.SERVE_URL}${media.path}`} target="_blank">{media.path.split('/')[1]}</a>
                                        :
                                media.type == 'image' ? <img src={`${config.SERVE_URL}${media.path}`} /> :  <video width="200" height="200" src={`${config.SERVE_URL}${media.path}`} controls> Your browser does not support the video tag.</video> 
                                }
                                </div>)
                                })}
                                </div>) : <div className="mediasContainer"></div>
                            }
                    </div>)
                })
                :
                <div>
                    loading
                </div>
            }
            <form className="fromMessager" onSubmit={handleSubmit} ref={formRef} >
                <input type="hidden" name="group_id" value={groupId}/>
                <div className="formElement">
                    <textarea className="zoneMsg" onChange={(ev)=> setMsg(ev.target.value)} name='message' rows="5" resize="false">
                        {msg}
                    </textarea>
                </div>
                <div className="bottomBar">
                <input type="file" name='medias' id="mediasMsg" multiple className="joinFile"/>
                <label for="mediasMsg"><FontAwesomeIcon className="clip" icon={faPaperclip} /></label>
                    <button type="submit" className="submitButton">Envoyer</button>
                </div>
            </form>
        </div>
            )
}
export default GroupMsFrom;