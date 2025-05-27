import { useState, useRef, useEffect} from "react"
import validateLogin from '../utils/loginUtils'
import RegisterComponent from "./RegisterComponent"
import LoginComponent from "./LoginComponent"
export default function AuthenticateUser() {
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
                    <LoginComponent isOnRegister={isOnRegister} showRegister={showRegister}/>
                    <RegisterComponent isOnLogin={isOnLogin} showLogin={showLogin}/>
                </div>
            </div>
        </>
    )
}