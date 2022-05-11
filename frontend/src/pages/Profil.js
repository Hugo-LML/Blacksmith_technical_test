import axios from 'axios';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Log from '../components/Log/Log';
import UpdateProfil from '../components/UpdateProfil';
import { getUser, getUsers } from '../features/user.slice';

const Profil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const userSignUp = useSelector(state => state.user.userSignUpOrIn);

    axios.get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
        .then(res => {
            dispatch(getUser(res.data));
        })
        .catch(err => console.log(err));

    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
        .then(res => {
            dispatch(getUsers(res.data));
        })
        .catch(err => console.log(err));

    return (
        <>
            {uid ? (
                <>
                    <UpdateProfil />
                    <Footer />
                </>
            ) : (
                userSignUp ? <Log signIn={false} signUp={true} /> : <Log signIn={true} signUp={false} />
            )}
        </>
    );
};

export default Profil;