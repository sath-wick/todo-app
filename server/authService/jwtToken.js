import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export function generateToken(user){
    return jwt.sign(
        {id : user.id, username: user.username},
        secret,
        {expiresIn: '1h'}
    )
}

export function verifyToken(token){
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        console.error(err.message)
            return null
    }
}