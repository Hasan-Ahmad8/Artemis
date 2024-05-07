import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Profile } from "./Profile";
import { LogIn } from "./LogIn";
import { Dashboard } from "./Dashboard";
import { Posts } from "./Posts";
import { Loading } from "./Loading";
import { Replies } from "./Replies";
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { About } from "./About";

export function IndexView() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path="/about" element={<About/>}/>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Posts/>}/>
                        <Route path="/replies/:mainPostID" element={<Replies/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn}/>} />
                    </>
                ) : (
                    <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn}/>} />
                )}
                <Route path="*" element={<LogIn isLoggedIn={isLoggedIn}/>} />
            </Routes>   
           
        </>
    );
};
