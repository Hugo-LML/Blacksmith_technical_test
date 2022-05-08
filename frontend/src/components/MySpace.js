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
    }, [])

    return (
        <div className='mySpace-container'>
            <div className="icon-and-number">
                <img src="./img/car-solid.svg" alt="car-icon" />
                {mySpace !== null ? (
                    <p>{mySpace[0].number}</p>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </div>
    );
};

export default MySpace;