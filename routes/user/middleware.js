const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    var token = req.query.token || req.headers['x-access-token'];
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET, function (err, decoded) {

            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                req.user = decoded.user;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}