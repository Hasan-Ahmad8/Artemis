import React, { useState } from "react";
import { SignIn } from "../firebase/auth";
import './css/LogIn.css';

export function LogIn({setIsLoggedIn}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleLogin(e){
        e.preventDefault();
        SignIn(email, password, setIsLoggedIn);
    }

    return(
        <div className="loginPage">
            <h2 className="login__title">Log In</h2>
           <form className="login" onSubmit={handleLogin}>
                <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <br></br>
                <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <br></br>
                <button className="loginButton" type="submit">Login</button>
           </form>
        </div>
    )
}
