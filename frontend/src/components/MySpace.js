import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpace, getMySpace } from '../features/space.slice';
import { UidContext } from './AppContext';

const MySpace = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const mySpace = useSelector(state => state.space.mySpaceValue);
    const isParked = useSelector(state => state.space.parkedValue);

    const handleLiberation = () => {
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
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/space/findSpaceByUser/${uid}`, {withCredentials: true})
            .then(res => dispatch(getMySpace(res.data)))
            .catch(err => console.log(err));

    }, [uid, dispatch, isParked])

    return (
        <div className='mySpace-container'>
            <p className='title'>Où est ma voiture ?</p>
            {mySpace && mySpace[0] ? (
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
                    <button className='free' onClick={handleLiberation}>Libérer la place</button>
                </>
            ) : (
                <>
                    <p className='not-parked'>Vous n'êtes pas encore garé dans notre parking.</p>
                    <p>Trouvez la place qui vous correspond !</p>
                </>
            )}
        </div>
    );
};

export default MySpace;