import React from "react";
import { logOut } from "../firebase/auth";
import './css/Profile.css';
import { getAuth } from "firebase/auth";

export function Profile({setIsLoggedIn}){
    const auth = getAuth();
    const user = auth.currentUser.uid;
    
    function signOutHandler(e){
        e.preventDefault();
        logOut(setIsLoggedIn);
    }

    return(
        <div className="profile">
            <h1>Profile</h1>
            <div className="profile__card">

                <button className="log__out" onClick={signOutHandler}>signout</button>
            </div>
        </div>
    )
}