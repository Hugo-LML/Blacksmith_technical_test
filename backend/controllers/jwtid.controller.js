const jwt = require('jsonwebtoken');

module.exports.getJwtid = (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const myID = decodedToken.id;
    res.status(200).json({myID});
}