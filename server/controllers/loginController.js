const express = require("express")
const {comparePassword} = require('../authService/bcrypt')
const {generateToken} = require('../authService/jwtToken')
const pool = require('../db')
const router = express.Router()

router.post('/login-user',async(req,res)=>{
    try {
        const {username, password} = req.body
        const result = await pool.query(`SELECT * from USERS where username = $1`,[username])
        const user = result.rows[0]
        if(!user) return res.status(401).json({message:"Invalid username or password"})
        const hash = user.hashedPassword
        if(! await comparePassword(hash, password)) return res.status(401).json({message:"Invalid username or password"})
        const token = generateToken({userId:user.userId, username:user.username})
        res.status(200).json({token, message: "token gen success"})

    } catch (err) {
        console.error(err.message);
        res.status(500).json({message:"Server error"})
    }
})

module.exports = router;