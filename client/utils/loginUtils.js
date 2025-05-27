import { apiPOST } from '../utils/api'

export default async function validateLogin(username, password){
    if (!username || !password) return
    try {
        const body = {username, password}
        const jsonData = await apiPOST('/login-user',body)
    } catch (err) {
        console.error(err.message);
    }
}

