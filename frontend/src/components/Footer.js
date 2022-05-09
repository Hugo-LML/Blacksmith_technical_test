import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='presentation'>
                <div className='logo-and-name'>
                    <img src="./img/square-parking-solid.svg" alt="logo" />
                    <p>Parkmanager Corp</p>
                </div>
                <p className='description'>Parkmanager Corp est une jeune entreprise qui a pour but de simplifier
                l'utilisation des parkings</p>
            </div>
            <div className='contact'>
                <p className='title'>Contact</p>
                <div className='way-of-contact'>
                    <img src="./img/location-dot-solid.svg" alt="location-dot" />
                    <p>12 rue Ganneron, 75018 Paris</p>
                </div>
                <div className='way-of-contact'>
                    <img src="./img/phone-solid.svg" alt="phone" />
                    <p>06 32 31 88 74</p>
                </div>
                <div className='way-of-contact'>
                    <img src="./img/envelope-solid.svg" alt="mail" />
                    <p>parkmanager_corp@gmail.com</p>
                </div>
            </div>
            <div className='help'>
                <p className='title'>Aide</p>
                <p className='infos'>F.A.Q.</p>
                <p className='infos'>Mentions légales</p>
                <p className='infos'>À propos</p>
            </div>
        </footer>
    );
};

export default Footer;