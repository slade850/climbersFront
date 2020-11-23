import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearLogged } from '../utils/local-storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { servURL } from '../utils/api';

const Header = () => {

    const dispatch = useDispatch()
    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail);
    const nbNewMassages = useSelector(state => state.message.usersTalk.totalNewMessages);

    return (
        <header>
            <div className="fastBlockLogo">
                <img src={require('../../asset/fastblock0.png')} />
            </div>
            { !userIslogged ?
            <nav className="navAnonymous">
                <ul>
                    <li>
                        <Link to="/login">Connexion</Link>
                    </li>
                    <li>
                        <Link to="/register">Inscription</Link>
                    </li>
                </ul>
            </nav>
            :
            <div className="flexContainer">
                <Link className="link" to="/dashboard" ><FontAwesomeIcon icon={faHome} size="2x" color="orange"/></Link>
            <div className="containerAvatarNav">
            {(nbNewMassages > 0) && <div className="newMs">{nbNewMassages}</div>}
                <div className="headAvatar">
                    <img src={`${servURL}${user.avatar}`} />
                </div>
                <nav className="nAvatar">
                <ul>
                    <li>
                        <Link className="link" to="/dashboard/profile">Profile</Link>
                    </li>
                    <li>
                        <Link className="link" to="/dashboard/messages">Messages</Link>
                    </li>
                    <li>
                        <span className="link" onClick={() => { dispatch({type: "CLEAR_USER"}); clearLogged() }}>Deconnexion</span>
                    </li>
                </ul>
            </nav>
            </div>
            </div>
            }
        </header>
    )
}

export default Header;