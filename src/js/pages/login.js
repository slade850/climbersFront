import React, {useState} from 'react';
import { doLogin } from '../store/authStore';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.authMessage.message);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lostPassword, setLostPassword] = useState(false);
    const [lostMessage, setLostMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if(!lostPassword){
        dispatch({type: "CLEAR_AUTH_MESSAGE"})
        const body = {
            login,
            password
        }
        dispatch(doLogin(body))
        .then(res => {
            history.push('/dashboard')
        })
        .catch(err => {
            setIsLoading(false);
        })
        } else {
            const body = { email }
            api.post('user/lost-password', body)
            .then(response => {
                setLostMessage(response.data.message)
                setIsLoading(false);
            })
            .catch(err => {
                setLostMessage(err.response.data.message)
                setIsLoading(false);
            })
        }
    }
    

    return (
        <div className="centralContainer">
            { isLoading ? <h2>loading</h2>
        : 
        lostPassword ?
        <form className="fromCard" onSubmit={handleSubmit} >
            <h1 className="formHeader">Connecter vous à votre compte Fastblock !</h1>
            {lostMessage && <div className="">{lostMessage}</div>}
            <div className="formElement">
                <label>Email</label>
                <input type="text" onChange={(ev)=> setEmail(ev.target.value)} name='email' value={email} required />
            </div>
            <button type="submit">Valider</button><br />
            <p onClick={() => setLostPassword(false)}>connecter vous</p>
        </form> 
        : 
        <form className="fromCard" onSubmit={handleSubmit} >
            <h1 className="formHeader">Connecter vous à votre compte Fastblock !</h1>
            {message && <div className="">{message}</div>}
            <div className="formElement">
                <label>Login* (Pseudo Ou Email)</label>
                <input type="text" onChange={(ev)=> setLogin(ev.target.value)} name='login' value={login} required />
            </div>
            <div className="formElement">
                <label>Password</label>
                <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
            </div>
            <button type="submit">Se Connecter</button><br />
            <p onClick={() => setLostPassword(true)}>Mot de pass Perdu?</p>
        </form>
        }
        </div>
    )
}

export default Login;