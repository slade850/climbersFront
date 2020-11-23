import React,  {useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {api, servURL }from '../../../utils/api';

const Profile = () => {

    const user = useSelector(state => state.auth.user.detail);
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);
        setIsLoading(true);
        const data = new FormData(formRef.current);
        console.log(data)

        api.post('user/avatar', data, {headers: { 'content-type': 'multipart/form-data' }})
        .then(response => {
            setMessage(response.data.message)
        })
        .catch(err => {
            setMessage(err.response.data.message);
        })
        .finally(() => {
            setIsLoading(false) 
        })

    }    

    return (
        <>
            { isLoading ? <h2>loading</h2> :
        <div className="centralContainer">
        <form className="fromCard" onSubmit={handleSubmit} ref={formRef} >
            <div className="formElement">
                <label className="profilAvatar"><img src={`${servURL}${user.avatar}`} /></label>
                <input type="file" onChange={(ev)=> setAvatar(ev.target.files)} name='avatar' />
            </div>
            <button type="submit">Mettre a jour</button><br />
            {message && <span>{message}</span>}
            <div className="infoContainer">
            <p className="infoCardLine">Pseudo: {user.pseudo}</p>
            <p className="infoCardLine">Prénom: {user.firstName}</p>
            <p className="infoCardLine">Nom: {user.lastName}</p>
            <p className="infoCardLine">Email: {user.email}</p>
            </div>
        </form> 
        </div>}
        </>
            )
}
export default Profile;