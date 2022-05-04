const db = require('../config/database').getDB();

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