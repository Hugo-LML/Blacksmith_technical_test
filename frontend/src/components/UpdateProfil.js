import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpace } from '../features/space.slice';
import { deleteUser, editUser, getUser } from '../features/user.slice';
import { UidContext } from './AppContext';

const UpdateProfil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userValue);
    const mySpace = useSelector(state => state.space.mySpaceValue);

    const [firstName, setFirstName] = useState(userData[0].first_name);
    const [lastName, setLastName] = useState(userData[0].last_name);
    const [phone, setPhone] = useState(userData[0].phone);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {
            first_name: firstName,
            last_name: lastName,
            phone: phone
        }, {withCredentials: true})
            .then(res => {
                const dataObject = {id: uid, firstName, lastName, phone};
                dispatch(editUser(dataObject));
                document.querySelector('.phone-error').innerHTML = '';
                alert('Modifications validées !');
            })
            .catch(err => {
                console.log(err);
                document.querySelector('.phone-error').innerHTML = err.response.data.errorPhone;
            });
    }
    
    const handleDelete = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/space/${mySpace[0].id}`, {
            availability: 0,
            occupation_time: mySpace[0].occupation_time,
            user_id: uid,
            avaUpdated: 1,
            occUpdated: mySpace[0].occupation_time,
            useUpdated: null
        }, {withCredentials: true})
            .then(res => {
                const dataObject = {id: mySpace[0].id, availability: 1, user_id: null, parked: false};
                dispatch(editSpace(dataObject));
                axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
                    .then(res => {
                        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {withCredentials: true})
                            .then(res => {
                                dispatch(deleteUser(uid));
                                window.location = '/';
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
            .then(res => dispatch(getUser(res.data)))
            .catch(err => console.log(err));

    }, [dispatch, uid]);

    return (
        <>
            {userData && userData[0] ? (
                <div className="page-container">
                    <div className='profil-container'>
                        <p className='title'>Profil de {userData[0].first_name}</p>
                        <form action="" onSubmit={handleUpdate} className='form-update'>
                            <div className='containerLabelInput'>
                                <label htmlFor="firstName">Prénom</label>
                                <input type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="John" />
                            </div>
                            <div className='containerLabelInput'>
                                <label htmlFor="lastName">Nom</label>
                                <input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Doe" />
                            </div>
                            <div className='containerLabelInput'>
                                <label htmlFor="phone">Téléphone</label>
                                <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="0123456789" />
                                <div className="phone-error"></div>
                            </div>
                            <input type="submit" value="Valider modifications" className='submit'/>
                        </form>
                        <button className='delete' onClick={() => {
                            if (window.confirm("Voulez-vous supprimer votre compte ?")) {
                                handleDelete();
                            }
                        }}>Supprimer le compte</button>
                    </div>
                </div>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
};

export default UpdateProfil;