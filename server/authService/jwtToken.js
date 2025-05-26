const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

function generateToken(user){
    return jwt.sign(
        {id : user.id, username: user.username},
        secret,
        {expiresIn: '1h'}
    )
}

function verifyToken(token){
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        console.error(err.message)
            return null
    }   
}

modules.export = {generateToken, verifyToken}