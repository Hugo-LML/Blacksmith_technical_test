const db = require('../config/database').getDB();
const validator = require('validator');

module.exports.getAllUsers = (req, res) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.getUser = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.updateUser = (req, res) => {
    const id = req.params.id;
    const {first_name, last_name, phone} = req.body;
    const sql = `UPDATE users SET first_name=?, last_name=?, phone=? WHERE id=?`;
    db.query(sql, [first_name, last_name, phone, id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else if (!validator.isMobilePhone(phone)) {
            res.status(400).json({errorPhone: 'Rentrez un numéro de téléphone valide'});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}