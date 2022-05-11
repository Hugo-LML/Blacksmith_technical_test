import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, getSpaces } from '../features/space.slice';

const AddPlace = ({ displayForm, setDisplayForm }) => {
    const [number, setNumber] = useState('');
    const [stage, setStage] = useState('');
    const [occupation_time, setOccupation_time] = useState('');

    const spacesData = useSelector(state => state.space.spacesValue);
    const dispatch = useDispatch();

    const handleAddPlace = (e) => {
        e.preventDefault();
        
        const numberList = spacesData.map(e => e.number);
        if (numberList.includes(parseInt(number))) {
            alert('Cette place existe déjà');
        }
        const pattern = /[^0-9]/;
        if (pattern.test(number) || pattern.test(stage) || pattern.test(occupation_time)) {
            alert('Rentrez un nombre');
        }
        else {
            axios.post(`${process.env.REACT_APP_API_URL}/api/space`, {
                number,
                stage,
                occupation_time
            }, {withCredentials: true})
                .then(res => {
                    axios.get(`${process.env.REACT_APP_API_URL}/api/space`, {withCredentials: true})
                        .then(res => {
                            dispatch(addPlace(res.data.at(-1)));
                            setDisplayForm(!displayForm);
                            setStateDisplayForm();
                        }) 
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const updateDimensions = () => {
        if (displayForm === true) {
            document.querySelector('.blur-everything').style.width = document.body.scrollWidth + "px";
            document.querySelector('.blur-everything').style.height = document.body.scrollHeight + "px";
        }
    }

    const setStateDisplayForm = () => {
        setDisplayForm(!displayForm);
        document.querySelector('.blur-everything').style.width = document.body.scrollWidth + "px";
        document.querySelector('.blur-everything').style.height = document.body.scrollHeight + "px";

        if (displayForm === true) {
            document.querySelector('.blur-everything').style.display = "none";
        }
        else {
            document.querySelector('.blur-everything').style.display = "block";
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/space`, {withCredentials: true})
            .then(res => dispatch(getSpaces(res.data)))
            .catch(err => console.log(err));
        
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);

    }, [dispatch]);

    return (
        <form action="" onSubmit={handleAddPlace} className='add-place-form'>
            <img src="./img/circle-xmark-solid.svg" alt="close" className='close' onClick={setStateDisplayForm} />
            <p className='title'>Créer une place</p>
            <div className='containerLabelInput'>
                <label htmlFor="number">Numéro</label>
                <input type="text" name="number" id="number" onChange={e => setNumber(e.target.value)} value={number} placeholder="Numéro de la place" />
            </div>
            <div className='containerLabelInput'>
                <label htmlFor="stage">Étage</label>
                <input type="text" name="stage" id="stage" onChange={e => setStage(e.target.value)} value={stage} placeholder="Étage de la place" />
            </div>
            <div className='containerLabelInput'>
                <label htmlFor="occupation_time">Temps d'occupation</label>
                <input type="text" name="occupation_time" id="occupation_time" onChange={e => setOccupation_time(e.target.value)} value={occupation_time} placeholder="Temps d'occupation max. de la place (en h)" />
            </div>
            <input type="submit" value="Créer une place" className='submit' />
        </form>
    );
};

export default AddPlace;