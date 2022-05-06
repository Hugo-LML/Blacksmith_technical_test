import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';


const Home = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    return (
        <>
            {uid ? (
                <div className="home-userConnected">
                    <h1>User connected</h1>
                </div>
            ) : (
                <div className="home-userNotConnected">
                    <h1>User not connected</h1>
                </div>
            )}
        </>
    );
};

export default Home;