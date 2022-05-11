import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpaces } from '../features/space.slice';

const ParkingInfos = () => {
    const [occupationRate, setOccupationRate] = useState('');
    const [numberOfSpaces, setNumberOfSpaces] = useState('');
    const [averageOccupation, setAverageOccupation] = useState('');
    const spacesData = useSelector(state => state.space.spacesValue);
    const isParked = useSelector(state => state.space.parkedValue);
    const dispatch = useDispatch();

    const sum = (array) => {
        const listOccupation = [];
        array.forEach(e => listOccupation.push(parseInt(e.occupation_time)));
        let mySum = 0;
        for (let i = 0; i < listOccupation.length; i++) {
            mySum += listOccupation[i];
        }
        mySum /= array.length;
        return Math.round(mySum * 10) / 10;
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/space`, {withCredentials: true})
            .then(res => {
                dispatch(getSpaces(res.data));
                setOccupationRate((res.data.filter(e => parseInt(e.availability) === 0)).length);
                setNumberOfSpaces(res.data.length);
                setAverageOccupation(sum(res.data));
            })
            .catch(err => console.log(err));
        
    }, [dispatch, isParked]);

    return (
        <>
            {spacesData ? (
                <div className='parking-infos-container'>
                    <p className='title'>État du parking</p>
                    <div className='infos'>
                        <p>Taux d'occupation : {occupationRate} / {numberOfSpaces}</p>
                        <p>Temps d'occupation moyen : {averageOccupation}h</p>
                    </div>
                </div>

            ) : (
                <p>Loading</p>
            )}
        </>
    );
};

export default ParkingInfos;