const bcrypt = require('bcrypt')
const saltRounds = 10

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

async function comparePassword(hashedPassword, password){
    const match = await bcrypt.compare(password, hashedPassword);
    return match 
}

module.exports = {hashPassword, comparePassword}