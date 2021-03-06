const db = require('../config/database').getDB();

module.exports.getAllSpaces = (req, res) => {
    const sql = `SELECT * FROM spaces`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.getSpace = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM spaces WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.createSpace = (req, res) => {
    const {number, stage, occupation_time} = req.body;
    const sql = `INSERT INTO spaces (number, stage, occupation_time) VALUES (?, ?, ?)`;
    db.query(sql, [number, stage, occupation_time], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(201).json(result);
        }
    });
}

module.exports.updateSpace = (req, res) => {
    const id = req.params.id;
    const {availability, occupation_time, user_id, avaUpdated, occUpdated, useUpdated} = req.body;
    const sqlSelect = `SELECT * FROM spaces WHERE user_id=?`;
    db.query(sqlSelect, [user_id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result[0] && result[0].id != id) {
                res.status(400).json({message: 'Vous êtes déjà garé autre part dans le parking'});
            }
            else {
                const sqlCheck = `SELECT * FROM spaces WHERE id=?`;
                db.query(sqlCheck, [id], (err, result) => {
                    if (err) {
                        res.status(400).json({err});
                    }
                    else {
                        if (result[0] && result[0].availability === 0 && result[0].user_id != user_id) {
                            res.status(400).json({message: 'Cette place est déjà réservée'});
                        }
                        else {
                            const sqlUpdate = `UPDATE spaces SET availability=?, occupation_time=?, user_id=? WHERE id=?`;
                            if (result[0] && result[0].user_id === null) {
                                db.query(sqlUpdate, [avaUpdated, occUpdated, useUpdated, id], (err, result) => {
                                    if (err) {
                                        res.status(400).json({err});
                                    }
                                    else {
                                        res.status(200).json(result);
                                    }
                                });
                            }
                            else if (result[0] && result[0].user_id === user_id) {
                                db.query(sqlUpdate, [avaUpdated, occUpdated, useUpdated, id], (err, result) => {
                                    if (err) {
                                        res.status(400).json({err});
                                    }
                                    else {
                                        res.status(200).json(result);
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    });
}

module.exports.deleteSpace = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM spaces WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.findSpaceInStage = (req, res) => {
    const stage = req.body.stage;
    const sql = `SELECT * FROM spaces WHERE stage=? AND availability=0`;
    db.query(sql, [stage], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.findSpaceByUser = (req, res) => {
    const user_id = req.params.id;
    const sql = `SELECT * FROM spaces WHERE user_id=?`;
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}