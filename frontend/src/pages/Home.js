import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddPlace from '../components/AddPlace';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import MySpace from '../components/MySpace';
import ParkingInfos from '../components/ParkingInfos';
import SpaceResearch from '../components/SpaceResearch';
import { getSpaces } from '../features/space.slice';
import { getUser, logUser } from '../features/user.slice';

const Home = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const blurEverything = useRef();
    const userData = useSelector(state => state.user.userValue);
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

    const updateDimensions = () => {
        if (displayForm === true) {
            blurEverything.current.style.width = document.body.scrollWidth + "px";
            blurEverything.current.style.height = document.body.scrollHeight + "px";
        }
    }

    const setStateDisplayForm = () => {
        setDisplayForm(!displayForm);
        blurEverything.current.style.width = document.body.scrollWidth + "px";
        blurEverything.current.style.height = document.body.scrollHeight + "px";
        if (displayForm === true) {
            blurEverything.current.style.display = "none";
        }
        else {
            blurEverything.current.style.display = "block";
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
            .then(res => dispatch(getUser(res.data)))
            .catch(err => console.log(err));
        
        axios.get(`${process.env.REACT_APP_API_URL}/api/space`, {withCredentials: true})
            .then(res => dispatch(getSpaces(res.data)))
            .catch(err => console.log(err));

        window.addEventListener("scroll", scrollFunction);
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("scroll", scrollFunction);
            window.removeEventListener("resize", updateDimensions);
        }

    }, [dispatch, uid, displayForm]);

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
                        {userData && userData[0].admin === 1 ? (
                            <>
                                <div id='scroll-to-top' className='scroll-to-top admin' onClick={topFunction}>
                                    <img src="./img/chevron-up-solid.svg" alt="chevron-up" />
                                </div>
                                <div className='add-place' onClick={setStateDisplayForm}>
                                    <img src="./img/plus-solid.svg" alt="plus" />
                                </div>
                            </>
                        ) : (
                            <div id='scroll-to-top' className='scroll-to-top' onClick={topFunction}>
                                <img src="./img/chevron-up-solid.svg" alt="chevron-up" />
                            </div>
                        )}
                        {displayForm && <AddPlace displayForm={displayForm} setDisplayForm={setDisplayForm} />}
                        <div className='blur-everything' ref={blurEverything}></div>
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