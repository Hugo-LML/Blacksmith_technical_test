import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpace } from '../features/space.slice';
import { UidContext } from './AppContext';

const MySpace = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const mySpace = useSelector(state => state.space.mySpaceValue);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/space/findSpaceByUser/${uid}`, {withCredentials: true})
            .then(res => dispatch(getMySpace(res.data)))
            .catch(err => console.log(err));

    }, [uid, dispatch])

    return (
        <div className='mySpace-container'>
            <p className='title'>Où est ma voiture ?</p>
            {mySpace !== null ? (
                <>
                    <div className="icon-and-number">
                        <img src="./img/car-solid.svg" alt="car-icon" />
                        <p>{mySpace[0].number}</p>
                    </div>
                    <div className="infos">
                        <p>Étage numéro {mySpace[0].stage}</p>
                        <p>Temps d'occupation : {mySpace[0].occupation_time}h</p>
                    </div>
                    <div className="parking-map">
                        <img src="./img/parkingMap.svg" alt="parking-map"/>
                    </div>
                </>
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};

export default MySpace;