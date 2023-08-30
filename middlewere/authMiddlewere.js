import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {

    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer'))
        return res.status(401).json({message: 'non-existent token'});

    try {

        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {

            if(err) return res.status(403).json({message: 'Invalid Token'});
            req.user = await User.findOne({email : decode.email});

            return next();
        })
        
    } catch (error) {
        return res.status(500).json({message: 'internal server error'});
    }
}

export default checkAuth;
