import axios from 'axios';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { editSpace } from '../features/space.slice';
import { UidContext } from './AppContext';

const SpaceCard = ({ space }) => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    
    const handleReservation = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/space/${space.id}`, {
            availability: 1,
            occupation_time: space.occupation_time,
            user_id: null,
            avaUpdated: 0,
            occUpdated: space.occupation_time,
            useUpdated: uid
        }, {withCredentials: true})
            .then(res => {
                const dataObject = {id: space.id, availability: 0, user_id: uid, parked: true};
                dispatch(editSpace(dataObject));
            })
            .catch(err => {
                console.log(err);
                alert("Vous devez d'abord libérer votre place");
            }); 
    }

    return (
        <div className='card-container'>
            <div className="icon-and-number">
                <img src="./img/car-solid.svg" alt="car-icon" />
                <p>{space.number}</p>
            </div>
            <div className="infos">
                <p>Étage numéro {space.stage}</p>
                <p>Temps d'occupation : {space.occupation_time}h</p>
            </div>
            <button className='reservation' onClick={handleReservation}>Réserver</button>
        </div>
    );
};

export default SpaceCard;