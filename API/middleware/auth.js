const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const token = req.headers['authorization'].split(' ')[1];
    const token = req.headers.authorization.split(' ')[1]
    const zero = req.headers.authorization.split(' ')[0]
    console.log(zero)
    console.log("token", token)
    console.log(req.headers.authorization)
    if (!token) {
        console.log("token empty")
        return res.status(401).json({ message: 'No token provided' })
    };

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            console.log("token error")
            return res.status(403).json({ message: 'Invalid token' })
        };

        req.user = decoded;
        console.log("req.user", req.user)
        console.log("good")
        next();
    });
};
