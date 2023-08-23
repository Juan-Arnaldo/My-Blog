import jwt from 'jsonwebtoken'

const generateAccessJWT = (email) => {
    return jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });
}

const generateRefreshJWT = (email) => {
    return jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    });
}

export {
    generateAccessJWT,
    generateRefreshJWT
};