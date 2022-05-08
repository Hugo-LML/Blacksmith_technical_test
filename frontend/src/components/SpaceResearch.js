import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpace, getSpaces } from '../features/space.slice';
import { getUser, getUsers } from '../features/user.slice';
import { UidContext } from './AppContext';
import SpaceCard from './SpaceCard';

const SpaceResearch = () => {
    const [stageSelected, setStageSelected] = useState('all');

    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const spacesData = useSelector(state => state.space.spacesValue);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
            .then(res => dispatch(getUsers(res.data)))
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, {withCredentials: true})
            .then(res => dispatch(getUser(res.data)))
            .catch(err => console.log(err));
        
        axios.get(`${process.env.REACT_APP_API_URL}/api/space`, {withCredentials: true})
            .then(res => dispatch(getSpaces(res.data)))
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_URL}/api/space/findSpaceByUser/${uid}`, {withCredentials: true})
            .then(res => dispatch(getMySpace(res.data)))
            .catch(err => console.log(err));

    }, [dispatch, uid]);

    return (
        <div className='researchContainer'>
            <div className='stageSelection'>
                <p>Je cherche une place &nbsp;</p>
                <select onChange={e => setStageSelected(e.target.value)} name="stage" id="stage">
                    <option value="all">à tous les étages</option>
                    <option value="1">au premier étage</option>
                    <option value="2">au deuxième étage</option>
                    <option value="3">au troisième étage</option>
                </select>
            </div>
            <div className="cards-container">
                {spacesData !== null ? (
                    spacesData.map(space => {
                        if (stageSelected === 'all' && space.availability === 1) {
                            return <SpaceCard key={space.id} space={space} />;
                        }
                        else if (space.stage === parseInt(stageSelected) && space.availability === 1) {
                            return <SpaceCard key={space.id} space={space} />;
                        }
                        else {
                            return null;
                        }
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default SpaceResearch;