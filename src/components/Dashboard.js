import React, { useState } from "react";
import './css/Dashboard.css';
import { makePost } from "../firebase/post";

export function Dashboard(){
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    function handlePost(e){
        e.preventDefault();
        makePost(title, post);
    }

    return(
        <div className="dash">
            <h1>Compose Post</h1>
            <form className="compose__post" onSubmit={handlePost}>
                <input className="title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
                <br></br>
                <textarea className="postText" type="text" placeholder="Your post" value={post} onChange={e => setPost(e.target.value)}></textarea>
                <br></br>
                <button className="button">Post</button>
            </form>
        </div>
    )
}