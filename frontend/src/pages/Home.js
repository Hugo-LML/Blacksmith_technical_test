import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';


const Home = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    return (
        <div className='main'>
            {uid ? (
                <div className="home-userConnected">
                    <h1>User connected</h1>
                </div>
            ) : (
                <div className="home-userNotConnected">
                    <h1>Parkmanager corp</h1>
                    <div className="buttons">
                        <NavLink  end to='/profil'>
                            <button>S'inscrire</button>
                        </NavLink>
                        <NavLink  end to='/profil'>
                            <button>Se connecter</button>
                        </NavLink>
                    </div>
                    <img className='background' src="./img/parking.jpg" alt="background" />
                </div>
            )}
        </div>
    );
};

export default Home;