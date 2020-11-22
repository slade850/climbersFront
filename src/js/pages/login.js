import React, {useState} from 'react';
import { doLogin } from '../store/authStore';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.authMessage.message);
    const logged = useSelector(state => state.auth.user.isLogged);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
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
    }
    

    return (
        <div className="centralContainer">
            { isLoading ? <h2>loading</h2>
        : <form className="fromCard" onSubmit={handleSubmit} >
            <h1 className="formHeader">Connecter vous à votre compte Fastblock !</h1>
            {message && <div className="">{message}</div>}
            <div className="formElement">
                <label>Login* (Pseudo Or Email)</label>
                <input type="text" onChange={(ev)=> setLogin(ev.target.value)} name='login' value={login} required />
            </div>
            <div className="formElement">
                <label>Password</label>
                <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
            </div>
            <button type="submit">Se Connecter</button><br />
        </form> }
        </div>
    )
}

export default Login;