import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearLogged } from '../utils/local-storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import config from '../../config';

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
                <Link className="link" to="/dashboard" ><FontAwesomeIcon icon={faHome} size="2x" color="#FF8203"/></Link>
            <div className="containerAvatarNav">
            {(nbNewMassages > 0) && <div className="newMs">{nbNewMassages}</div>}
                <div className="headAvatar">
                    <img src={`${config.SERVE_URL}${user.avatar}`} />
                </div>
                <nav className="nAvatar">
                <ul className="nAvatarList">
                    <li className="linkColor">
                        <Link className="link" to="/dashboard/profile"><FontAwesomeIcon className="linkIco" icon={faUserCircle} size="2x" /></Link>
                    </li>
                    <li className="linkColor">
                        <Link className="link" to="/dashboard/messages"><FontAwesomeIcon className="linkIco" icon={faEnvelope} size="2x" /></Link>
                    </li>
                    <li className="linkColor">
                        <span className="link" onClick={() => { dispatch({type: "CLEAR_USER"}); clearLogged() }}><FontAwesomeIcon className="linkIco" icon={faPowerOff} size="2x" /></span>
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