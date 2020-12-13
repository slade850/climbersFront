import React from 'react';

const Home = (props) => {

    return (
        <div className="introContainer">
            <img src={require('../../asset/home-header.jpg')}></img>
            {props.res}
        </div>
            )
}
export default Home;