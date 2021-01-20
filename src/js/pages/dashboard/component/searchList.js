import React, {useState, useRef}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../../../config';

const SearchList = () => {
    
    const history = useHistory();
    const usrList = useSelector(state => state.contact.searchUser.searchList);
    const goToProfile = (slug) => {
        history.push(`/dashboard/view/${slug}`)
    }

    return (
        <div className="centralContainer">
            {
                usrList.length > 0 ?
                usrList.map((usr) => {
                    return (<div key={usr.id} className="usrCard" onClick={() => goToProfile(usr.slug)}>
                        <div className="usrAvatar">
                            <img src={`${config.SERVE_URL}${usr.avatar}`} />
                        </div>
                        <div className="usrName">
                        <h2>{usr.pseudo}</h2>
                        <h3>{`${usr.firstName} ${usr.lastName}`}</h3>
                        </div>
                    </div>)
                })
                :
                <h2 className="noUsr">Aucun utilisateurs trouvé</h2>
            }
        </div>
            )
}
export default SearchList;