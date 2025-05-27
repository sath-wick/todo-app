export default function LoginComponent({isOnRegister, showRegister}) {
    const handleLogin = (e)=>{
        e.preventDefault()
        const form = new FormData(e.target)
        const loginUsername = form.get("login-username")
        const loginPassword = form.get("login-password")
        validateLogin(loginUsername, loginPassword)
    }
    return(
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
    )
}