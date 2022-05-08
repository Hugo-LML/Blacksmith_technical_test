import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsers } from '../features/user.slice';
import { UidContext } from './AppContext';

const SpaceResearch = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.user.usersValue);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
            .then(res => {
                dispatch(getUsers(res.data));
                console.log(usersData);
            })
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
            .then(res => dispatch(getUser(res.data)))
            .catch(err => console.log(err));

    }, [dispatch, uid]);

    return (
        <div className='researchContainer'>
            <div className='stageSelection'>
                <p>Je cherche une place &nbsp;</p>
                <select name="stage" id="stage">
                    <option value="all">à tous les étages</option>
                    <option value="1">au premier étage</option>
                    <option value="2">au deuxième étage</option>
                    <option value="3">au troisième étage</option>
                </select>
            </div>
        </div>
    );
};

export default SpaceResearch;