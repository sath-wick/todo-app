import {useState} from 'react'
import { apiPOST, apiGET } from '../utils/api'
export default function RegisterComponent({isOnLogin, showLogin}) {
    const [isPasswordValid, setIsPasswordValid] = useState(null)
    const [userPassword, setUserPassword] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(null)
    const [isExistingUser, setIsExistingUser] = useState(null)

    const handleRegister = async (e)=>{
        e.preventDefault()
        const form = new FormData(e.target)
        const registerFullName = form.get('register-fullname')
        const registerEmail = form.get('register-email')
        const registerPassword = form.get('register-password')
        const registerConfirmPassword = form.get('register-confirmpassword')
        if(isEmailValid==="valid" && isPasswordValid==="valid"){
            if(registerPassword !== registerConfirmPassword){
                console.log("names dont match");
                setIsPasswordValid("invalid")
                return
                
            }

            if(registerFullName.trim() === "") {
                console.log("name empty");
                return
            }
            
            try {
                const getRes = await apiGET(`/auth/find-user/${registerEmail}`)
                if(getRes[0]) {
                    setIsExistingUser(true)
                    return
                }
                const response = await apiPOST('/auth/register-user',{
                    fullname : registerFullName,
                    email : registerEmail,
                    password : registerPassword
                })
                setIsExistingUser(false)
                alert("Registration Successful")
                e.target.reset()
                } catch (err) {
                console.error(err.message);
            }
        }
    }
    return(
        <form 
            className={` absolute md:relative
            bg-page-600
            w-full md:w-1/2
            flex w-[90%] h-full
            flex-col items-center
            justify-center gap-5
            md:translate-x-0
            ${isOnLogin ? 'translate-x-200' : 'translate-x-0'}
            transition duration-500
            `}
            onSubmit={handleRegister}
            >
            <button type="button" style={{"--button-color":"seagreen"}}
            className="absolute w-40
            text-left !text-sm
            !px-4 !py-2
            translate-x-[-50%] translate-y-[-50%]
            left-[90%] top-[8%]
            md:hidden
            "
            onClick={showLogin}
            disabled={isOnLogin}
            >Login</button>
            <h1 className="mb-2 mt-[-2rem] text-center">Register</h1>
                <input type="text" placeholder="Full Name"
                className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required 
                name="register-fullname"
                disabled={isOnLogin}
                style={{"--accent-color":"#2A2B2C"}}
                />

                <input type="email" placeholder="E-mail"
                className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required 
                disabled={isOnLogin}
                name="register-email"
                onBlur={(e)=>{
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if(!emailRegex.test(e.target.value)){
                        setIsEmailValid("invalid")
                        return
                    }
                    setIsEmailValid("valid")
                }}
                style={{"--accent-color":"#2A2B2C"}}
                />
                {isEmailValid === "invalid" &&
                <p className="text-left w-2/5 text-[0.8rem] mb-[-2rem] relative bottom-5 text-red-400">Please enter a valid e-mail!</p>
                }
                <input type="password" placeholder="Password"
                className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required
                name="register-password"
                disabled={isOnLogin}
                onChange={e=>{
                    setUserPassword(e.target.value)
                }} 
                style={{"--accent-color":"#2A2B2C"}}
                />
                <input type="password" placeholder="Confirm Password"
                className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required
                name="register-confirmpassword"
                disabled={isOnLogin} 
                style={{"--accent-color":"#2A2B2C"}}
                onBlur={e=>{
                    if(e.target.value !== userPassword){
                        setIsPasswordValid('invalid')
                        return
                    }
                    setIsPasswordValid('valid')
                }}
                />
                {isPasswordValid === 'invalid' &&
                <p className="text-left w-2/5 text-[0.8rem] mb-[-2rem] relative bottom-5 text-red-400">Passwords don't match!</p>
                }
                <input type="submit" value="Register"
                className="text-white"
                style={{"--button-color" : "blue"}}
                disabled={isOnLogin}
                />
                {isExistingUser &&
                    <p className="text-left w-2/5 text-[0.8rem] mb-[-2rem] relative bottom-5 text-red-400">User alerady exists! Please Login.</p>
                }
        </form>
    )
}