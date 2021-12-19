import React from 'react';
import Register from './Register';
import Login from './Login';

function Landing() {

    let key = localStorage.getItem('tokenStarwarsApp');

    return (
        <>
            {key?
            <Login/>
            :
            <Register/>
            }
        </>
    )
}

export default Landing
