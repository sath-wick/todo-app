import bcrypt from 'bcrypt'
const saltRounds = 10

export async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export async function comparePassword(hashedPassword, password){
    const match = await bcrypt.compare(password, hashPassword);
    return match 
}
