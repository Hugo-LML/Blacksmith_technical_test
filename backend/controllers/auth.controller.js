const db = require('../config/database').getDB();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
    const {first_name, last_name, phone, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);
    const sql = `INSERT INTO users (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [first_name, last_name, phone, email, cryptedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({message: 'Cette adresse mail est déjà utilisée'});
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
            res.status(400).json({message: 'Rentrez une adresse email valide'});
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
            res.status(400).json({message: 'Le mot de passe doit contenir au moins 6 caractères'});
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
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        res.status(400).json({message: 'Mot de passe incorrect !'});
                    }
                    else {
                        const token = createToken(result[0].id);
                        res.cookie('jwt', token, {httpOnly: true, maxAge});
                        res.status(200).json({message: 'Mot de passe correct !'});
                    }
                })
                .catch(err => res.status(400).json({err}));
        }
    });
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.end();
}