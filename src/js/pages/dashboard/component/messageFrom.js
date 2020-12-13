import React, { useEffect, useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { getTalkFrom }from '../../../store/messageStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import io from '../../../utils/socket';

const MessagesFrom = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const formRef = useRef();
    const [msLoding, setMsLoding] = useState(false)
    const [errorMs, setErrorMs] = useState(null);
    const allMessages = useSelector(state => state.message.messagesFrom.from[id]);
    const user = useSelector(state => state.auth.user.detail);
    const [msg, setMsg] = useState('');


    useEffect( () => {
        dispatch(getTalkFrom(id))
        .then()
        .catch(err => setErrorMs(err))
        .finally(() => setMsLoding(true))
        io.on('nvMs', (data) => dispatch({type: 'SET_MESSAGES_FROM', payload: { [id]: data } }))
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);
        api.post('private_message/create',  data, {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            setMsg('');
            io.emit('nvMs', "new message")
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="centralContainer">
            {
                msLoding ?
                allMessages && allMessages.length > 0 &&
                allMessages.map((message) => {
                    return (<div key={message.id} className={message.sender == user.id ? "messageSent" : "messageReceived"}>
                        <p>{message.created_at}</p>
                        <div className="message">
                            {message.message}
                        </div>
                    </div>)
                })
                :
                <div>
                    loading
                </div>
            }
            <form className="fromMessager" onSubmit={handleSubmit} ref={formRef} >
                <input type="hidden" name="receiver" value={id}/>
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
export default MessagesFrom;