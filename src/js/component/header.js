import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearLogged } from '../utils/local-storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import config from '../../config';
import api from '../utils/api';

const Header = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail);
    const nbNewMassages = useSelector(state => state.message.usersTalk.totalNewMessages);
    const nbInvitations = useSelector(state => state.message.usersInvitation.totalInvitations);
    const [searchValue, setSearchValue] = useState('');



    const handleSearch = (e) => {
        e.preventDefault();
        if(searchValue.length > 1){
            api.get(`user/find?user=${searchValue}`)
            .then(data => dispatch({type: "SET_SEARCH_LIST", payload: data.data.users}))
            .catch(err => console.log(err))
            .finally(() => history.push(`/dashboard/search`))
        } else {
            api.get(`user/find?limit=20&start=0`)
            .then(data => dispatch({type: "SET_SEARCH_LIST", payload: data.data.users}))
            .catch(err => console.log(err))
            .finally(() => history.push(`/dashboard/search`))
        }
    }

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
                <div className="searchUser">
                    <input list="srhList" type="text" onChange={(ev)=> setSearchValue(ev.target.value) } name='search' value={searchValue} />
                    <button onClick={(e) => handleSearch(e)}>recherche</button>
                </div>
                <Link className="link" to="/dashboard" ><FontAwesomeIcon icon={faHome} size="2x" color="#FF8203"/></Link>
            <div className="containerAvatarNav">
            {(nbInvitations > 0) && <div className="newIv">{nbInvitations}</div>}
            {(nbNewMassages > 0) && <div className="newMs">{nbNewMassages}</div>}
                <div className="headAvatar">
                    <img src={`${config.SERVE_URL}${user.avatar}`} />
                </div>
                <nav className="nAvatar">
                <ul className="nAvatarList">
                    <li className="linkColor">
                        <Link className="link" to="/dashboard/me"><FontAwesomeIcon className="linkIco" icon={faUserCircle} size="2x" /></Link>
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