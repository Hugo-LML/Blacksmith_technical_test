import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import MySpace from '../components/MySpace';
import ParkingInfos from '../components/ParkingInfos';
import SpaceResearch from '../components/SpaceResearch';
import { logUser } from '../features/user.slice';

const Home = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const scrollFunction = () => {
        if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
            document.getElementById('scroll-to-top').style.visibility = "visible";
            document.getElementById('scroll-to-top').style.opacity = "1";
        }
        else {
            document.getElementById('scroll-to-top').style.visibility = "hidden";
            document.getElementById('scroll-to-top').style.opacity = "0";
        }
    }

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollFunction);
        return () => window.removeEventListener("scroll", scrollFunction);
    }, []);

    return (
        <>
            {uid ? (
                <>
                    <div className="home-userConnected">
                        <SpaceResearch />
                        <div className='aside-cards'>
                            <MySpace />
                            <ParkingInfos />
                        </div>
                        <div id='scroll-to-top' className='scroll-to-top' onClick={topFunction}>
                            <img src="./img/chevron-up-solid.svg" alt="chevron-up" />
                        </div>
                    </div>
                    <Footer />
                </>
                
            ) : (
                <div className='home-userNotConnected'>
                    <div className="main">
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