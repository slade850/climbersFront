import React, { useState } from 'react';
import api from '../utils/api';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

    let { token } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);
        setIsLoading(true);
        const body = {
            key,
            password,
            passConfirm
        };
        api.post(`user/reset-password/${token}`, body)
        .then(response => {
            setMessage(response.data.message)
        })
        .catch(err => {
            setMessage(err.response.data.message);
        })
        .finally(() => setIsLoading(false) )
    }    

    return(
        <div className="centralContainer">
            { isLoading ? <h2>loading</h2> :
        <form className="fromCard" onSubmit={handleSubmit} >
            <h1 className="formHeader">Réinitialisation de mot de passe</h1>
            <div className="formElement">
                <label>Clef</label>
                <input type="text" onChange={(ev)=> setKey(ev.target.value)} name='key' value={key} required />
            </div>
            <div className="formElement">
                <label>Mot de passe</label>
                <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
            </div>
            <div className="formElement">
                <label>Confirmer Mot de passe</label>
                <input type="password" onChange={(ev)=> setPassConfirm(ev.target.value)} minLength="8" name='passConfirm' value={passConfirm} required />
            </div>
            <button type="submit">Valider</button><br />
            {message && <span>{message}</span>}
            </form> }
        </div>
    )
}

export default ResetPassword;