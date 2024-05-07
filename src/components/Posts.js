import React, { useEffect, useState, useCallback } from "react";
import './css/Posts.css';
import { collection, deleteDoc, getDocs, getFirestore, doc } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Replies } from "./Replies";

export function Posts({isLoggedIn}){
    const navigate = useNavigate();
    const db = getFirestore(app);
    const [postList, setPostList] = useState([]);
    const auth = getAuth();

     const getPosts = useCallback(async () => {
        const data = await getDocs(collection(db, "Posts"));
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }, [db]);

    const deletePost = useCallback(async (id) =>{
        const postDoc = doc(db, "Posts", id);
        await deleteDoc(postDoc);

        getPosts();
    }, [db, getPosts]);

    useEffect(() => {
        getPosts();
    }, [getPosts]); 

    return(
        <div className="posts">
            <h1>posts</h1>
            <div className="display__posts">
                {postList.map((post) =>{
                    
                    return(
                        <div className="outerLayer">
                            <div className="post">

                            <h3 className="post__title">{post.Title}</h3>
                            <p className="post__date">{post.Date}</p>
                            <br></br>
                                <p className="post__post">{post.Post}</p>
                            <br/>
                            <p className="post__name">@{post.Name} </p>
                            { post.UserID === auth.currentUser.uid && 
                                <button className="deleteBtn" onClick={() => {deletePost(post.id)}}>Delete</button>}
                            </div>
                            <br/>
                            <Link to={`/replies/${post.id}`}>replies</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
