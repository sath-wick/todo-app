const express = require("express")
const {comparePassword, hashPassword} = require('../authService/bcrypt')
const {generateToken} = require('../authService/jwtToken')
const pool = require('../db')
const router = express.Router()

router.post('/login-user',async(req,res)=>{
    try {
        const {email, password} = req.body
        const result = await pool.query(`SELECT * from USERS where emailid = $1`,[email])
        const user = result.rows[0]
        if(!user) return res.status(401).json({message:"Invalid email or password"})
        const hash = user.hashedPassword
        if(! await comparePassword(hash, password)) return res.status(401).json({message:"Invalid email or password"})
        const token = generateToken({userId:user.userId, email:user.email})
        res.status(200).json({token, message: "token generation successful"})

    } catch (err) {
        console.error(err.message);
        res.status(500).json({message:"Server error"})
    }
})

router.post('/register-user', async(req,res)=>{
    try {
        const { fullname, email, password } = req.body
        const hashedpassword = await hashPassword(password)
        const response = await pool.query('INSERT INTO users(fullname, emailid, hashedpassword)  values ($1,$2,$3)',[fullname, email, hashedpassword])
        res.status(200).json({message:"registration success"})
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: "registration failed"})
    }
})

router.get('/find-user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const response = await pool.query("SELECT * FROM USERS WHERE emailid = $1", [email]);
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "DB query failed" });
  }
});

module.exports = router;