const db = require('../config/database').getDB();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
    let {first_name, last_name, phone, email, password, admin} = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        admin = 1;
    }
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);
    const sql = `INSERT INTO users (first_name, last_name, phone, email, password, admin) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [first_name, last_name, phone, email, cryptedPassword, admin], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({errorEmail: 'Cette adresse mail est déjà utilisée', errorPassword: '', errorPhone: ''});
        }
        else if (!validator.isMobilePhone(phone)) {
            const sql = `DELETE FROM users WHERE first_name=? AND last_name=? AND phone=? AND email=? AND password=?`;
            db.query(sql, [first_name, last_name, phone, email, cryptedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
            res.status(400).json({errorPhone: 'Rentrez un numéro de téléphone valide', errorEmail: '', errorPassword: ''});
        }
        else if (!validator.isEmail(email)) {
            const sql = `DELETE FROM users WHERE first_name=? AND last_name=? AND phone=? AND email=? AND password=?`;
            db.query(sql, [first_name, last_name, phone, email, cryptedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
            res.status(400).json({errorEmail: 'Rentrez une adresse email valide', errorPassword: '', errorPhone: ''});
        }
        else if (password.length < 6) {
            const sql = `DELETE FROM users WHERE first_name=? AND last_name=? AND phone=? AND email=? AND password=?`;
            db.query(sql, [first_name, last_name, phone, email, cryptedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
            res.status(400).json({errorPassword: 'Le mot de passe doit contenir au moins 6 caractères', errorEmail: '', errorPhone: ''});
        }
        else {
            res.status(201).json(result);
        }
    });
}

const maxAge = 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge});
}

module.exports.signIn = (req, res) => {
    const {email, password} = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result[0]) {
                bcrypt.compare(password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            res.status(400).json({errorPassword: 'Mot de passe incorrect !', errorEmail: '', errorPhone: ''});
                        }
                        else {
                            const token = createToken(result[0].id);
                            res.cookie('jwt', token, {httpOnly: true, maxAge});
                            res.status(200).json({errorPassword: '', errorEmail: '', errorPhone: ''});
                        }
                    })
                    .catch(err => res.status(400).json({err}));
            }
            else {
                res.status(400).json({errorEmail: 'Adresse email incorrecte !', errorPassword: '', errorPhone: ''});
            }
        }
    });
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.end();
}