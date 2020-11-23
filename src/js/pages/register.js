import React, { useState, useRef } from 'react';
import api from '../utils/api';

const Register = () => {

    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);
        setIsLoading(true);
        const data = new FormData(formRef.current);
        console.log(data)

        api.post('user/register', data, {headers: { 'content-type': 'multipart/form-data' }})
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
        <form className="fromCard" onSubmit={handleSubmit} ref={formRef} >
            <h1 className="formHeader">Créer votre compte Fastblock !</h1>
            <div className="formElement">
                <label>Nom</label>
                <input type="text" onChange={(ev)=> setLastName(ev.target.value)} name='lastName' value={lastName} required />
            </div>
            <div className="formElement">
                <label>Prénom</label>
                <input type="text" onChange={(ev)=> setFirstName(ev.target.value)} name='firstName' value={firstName} required />
            </div>
            <div className="formElement">
                <label>Pseudo</label>
                <input type="text" onChange={(ev)=> setPseudo(ev.target.value)} name='pseudo' value={pseudo} required />
            </div>
            <div className="formElement">
                <label>Email</label>
                <input type="email" onChange={(ev)=> setEmail(ev.target.value)} name='email' value={email} required />
            </div>
            <div className="formElement">
                <label>Avatar</label>
                <input type="file" onChange={(ev)=> setAvatar(ev.target.files)} name='avatar' />
            </div>
            <div className="formElement">
                <label>Mot de passe</label>
                <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
            </div>
            <div className="formElement">
                <label>Confirmer Mot de passe</label>
                <input type="password" onChange={(ev)=> setPassConfirm(ev.target.value)} minLength="8" name='passConfirm' value={passConfirm} required />
            </div>
            <button type="submit">S'enregistrer</button><br />
            {message && <span>{message}</span>}
            </form> }
        </div>
    )
}

export default Register;