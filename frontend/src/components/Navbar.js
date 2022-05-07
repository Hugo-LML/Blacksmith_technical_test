import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../features/user.slice';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
    const uid = useContext(UidContext);
    const [width, setWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userValue);

    const updateDimensions = () => setWidth(window.innerWidth);

    useEffect(() => {
        if (uid) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
            	.then(res => dispatch(getUser(res.data)))
            	.catch(err => console.log(err));
        }

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);

    }, [uid, dispatch]);

    return (
        <nav>
            <NavLink end to="/">
                <h1>Parkmanager Corp</h1>
            </NavLink>
            {uid && userData !== null ? (
                <div className='links'>
                    <NavLink end to="/profil">
                        {width > 768 ? (
                            <p>Mon compte</p>
                        ) : (
                            <img className='nav-user-pic' src="./img/user-solid.svg" alt="user-pic" />
                        )}
                    </NavLink>
                    <Logout />
                </div>
            ) : (
                <NavLink end to="/profil">
                    <p>Go to login</p>
                </NavLink>
            )}
        </nav>
    );
};

export default Navbar;