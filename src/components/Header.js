import React from "react";
import './css/Header.css';
import { Link } from "react-router-dom";

export function Header({isLoggedIn}){
    return(
        <div className="header">
            {isLoggedIn &&<Link className="nav__item" to = "/">Home Feed</Link>}
            {isLoggedIn && <Link className="nav__item" to = "/dashboard">Dashboard</Link>}
            {isLoggedIn && <Link className="nav__item" to = "/profile">Profile</Link>}
            {!isLoggedIn && <Link className="nav__item" to = "/login">Login</Link> }
            <Link className="nav__item" to = "/about">About</Link> 
        </div>
    )
}