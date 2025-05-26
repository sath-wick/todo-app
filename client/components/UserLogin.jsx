import { useState, useRef, useEffect} from "react"
import validateLogin from '../utils/loginUtils'
export default function UserLogin() {
    const [isOnLogin, setIsOnLogin]  = useState(null)
    const [isOnRegister, setIsOnRegister]  = useState(null)
    
    const showRegister = ()=>{
        setIsOnLogin(false)
        setIsOnRegister(true)
    }
    const showLogin = ()=>{
        setIsOnLogin(true)
        setIsOnRegister(false)
    }

    const handleLogin = (e)=>{
        e.preventDefault()
        const form = new FormData(e.target)
        const loginUsername = form.get("login-username")
        const loginPassword = form.get("login-password")
        validateLogin(loginUsername, loginPassword)
}

    useEffect(()=>{
        const breakpoint = window.matchMedia('(max-width: 768px)')

        const handler = (e)=>{
            if(e.matches){
            setIsOnRegister(false)
            setIsOnLogin(true)
            console.log("true")
        }else{
            console.log("false")
            setIsOnRegister(false)
            setIsOnLogin(false)
        }
        }
    handler(breakpoint)
        breakpoint.addEventListener('change',handler)

        return ()=> breakpoint.removeEventListener('change',handler)
    },[])
    return(
        <>
            <div className="h-screen
            bg-page-500
            flex
            items-center justify-center
            ">
                <div 
                className="relative 
                flex items-center
                md:flex-row md:p-0
                overflow-hidden
                justify-center
                flex-col gap-5
                w-[clamp(500px,70vw,550px)] md:w-2/3
                h-[70svh]
                bg-page-400
                shadow-[1px_1px_2px_1px_black]
                rounded-lg gap-2
                p-5">
                    <form className="relative flex w-[90%]
                    h-full flex-col md:w-1/2
                    items-center justify-center
                    gap-5"
                    onSubmit={handleLogin}
                    >
                    <button type="button" style={{"--button-color":"seagreen"}}
                    className="absolute w-40 text-left !text-sm !px-4 !py-2
                    translate-x-[-50%] translate-y-[-50%]
                    left-[95%] top-[5%]
                    md:hidden
                    "
                    onClick={showRegister}
                    >Register</button>
                    <h1 className="mb-2 mt-[-2rem] text-center">Login</h1>
                        <input type="text" placeholder="Username"
                        name="login-username"
                        className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required
                        disabled={isOnRegister} 
                        style={{"--accent-color":"black"}}
                        />
                        <input type="password" placeholder="Password"
                        name="login-password"
                        className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required 
                        disabled={isOnRegister}
                        style={{"--accent-color":"var(--color-page-600)"}}
                        />
                        <input type="submit"
                        value="Login"
                        className="text-white"
                        style={{"--button-color" : "blue"}}
                        disabled={isOnRegister}
                        />
                        <a href="#" className="text-blue-400 hover:underline w-fit"
                        disabled={isOnRegister}
                        >Forgot password?</a>
                    </form>
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
                    `}>
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
                        disabled={isOnLogin}
                        style={{"--accent-color":"#2A2B2C"}}
                        />
                        <input type="email" placeholder="E-mail"
                        className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required 
                        disabled={isOnLogin}
                        style={{"--accent-color":"#2A2B2C"}}
                        />
                        <input type="password" placeholder="Password"
                        className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required
                        disabled={isOnLogin} 
                        style={{"--accent-color":"#2A2B2C"}}
                        />
                        <input type="password" placeholder="Confirm Password"
                        className="text-md typing-field placeholder:text-white placeholder:text-sm font-thin" required
                        disabled={isOnLogin} 
                        style={{"--accent-color":"#2A2B2C"}}
                        />
                        <input type="submit" value="Register"
                        className="text-white"
                        style={{"--button-color" : "blue"}}
                        disabled={isOnLogin}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}