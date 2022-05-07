import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';
import { logUser } from '../features/user.slice';

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
                <div className='main'>
                    <div className="home-userNotConnected">
                        <h1>Parkmanager Corp</h1>
                        <div className="buttons">
                            <NavLink onClick={() => dispatch(logUser(true))} end to='/profil'>
                                <button>S'inscrire</button>
                            </NavLink>
                            <NavLink onClick={() => dispatch(logUser(false))} end to='/profil'>
                                <button>Se connecter</button>
                            </NavLink>
                        </div>
                        <img className='background' src="./img/parking.jpg" alt="background" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;