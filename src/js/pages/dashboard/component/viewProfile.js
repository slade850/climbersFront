import React,  {useState, useRef, useEffect}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import config from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const ViewProfile = () => {

    let { slug } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errMs, setErrMs] = useState(null);
    const contact = useSelector(state => state.contact.contacts.contacts)

    const sendInvit = (id) => {
        let body = {contactId: id};
        api.post('user/add-contact', body)
        .then(res => setErrMs('invitation send'))
        .catch((err) => setErrMs(err.message))
        .finally(() => setTimeout(() => setErrMs(null), 2000))
    }

    useEffect(() => {
        api.get(`user/profile/${slug}`)
        .then(res => {
            setUser(res.data.user);
            setIsLoading(false);
        })
        .catch(err => console.log(err))
    },[])

    

    return (
        <>
            { isLoading ? <h2>loading</h2> :
        <div className="centralContainer">
            <div className="formElement">
                <label className="profilAvatar"><img src={`${config.SERVE_URL}${user.avatar}`} /></label>
            </div>
            <div className="infoContainer">
            <p className="infoCardLine">Pseudo: {user.pseudo}</p>
            <p className="infoCardLine">Prénom: {user.firstName}</p>
            <p className="infoCardLine">Nom: {user.lastName}</p>
            { 
            <div className="openPopForm" onClick={() => sendInvit(user.id) }>
                {errMs && <p>{errMs}</p>}
                <p>demande de contact<FontAwesomeIcon className="popIco" icon={faPlusCircle} /></p>
            </div>
            }
            </div>
        </div>}
        </>
            )
}
export default ViewProfile;