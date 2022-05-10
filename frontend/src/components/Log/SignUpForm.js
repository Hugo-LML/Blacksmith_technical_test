import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const phoneError = document.querySelector('.phone.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfError = document.querySelector('.password-conf.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfError.innerHTML = "Les mots de passe ne correspondent pas";
            }
            if (!terms.checked) {
                termsError.innerHTML = "Veuillez valider les conditions générales d'utilisation";
            }
        }
        else {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                first_name: firstName,
                last_name: lastName,
                phone,
                email,
                password,
                admin: 0
            })
                .then(res => setFormSubmit(true))
                .catch(err => {
                    emailError.innerHTML = err.response.data.errorEmail;
                    passwordError.innerHTML = err.response.data.errorPassword;
                    phoneError.innerHTML = err.response.data.errorPhone;
                });
        }
    }
    
    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <h4 id='signUp-succeed'>Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <div className='containerLabelInput'>
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="John" />
                        <div className='error'></div>
                    </div>
                    <div className='containerLabelInput'>
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Doe" />
                        <div className='error'></div>
                    </div>
                    <div className='containerLabelInput'>
                        <label htmlFor="phone">Téléphone</label>
                        <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="0123456789" />
                        <div className="phone error"></div>
                    </div>
                    <div className='containerLabelInput'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email@gmail.com" />
                        <div className="email error"></div>
                    </div>
                    <div className='containerLabelInput'>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="6 caractères min" />
                        <div className="password error"></div>
                    </div>
                    <div className='containerLabelInput'>
                        <label htmlFor="password-conf">Confirmer mot de passe</label>
                        <input type="password" name="password-conf" id="password-conf" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} placeholder="6 caractères min" />
                        <div className="password-conf error"></div>
                    </div>
                    <div className="cgu">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales d'utilisation</a></label>
                        <div className="terms error"></div>                        
                    </div>

                    <input type="submit" value="Valider inscription" className='submit'/>
                </form>
            )}
        </>
    );
};

export default SignUpForm;