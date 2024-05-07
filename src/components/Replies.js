import React, { useEffect, useState, useCallback } from "react";
import './css/Replies.css';
import { collection, deleteDoc, getDocs, getFirestore, doc, getDoc, addDoc } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../firebase/post";

export function Replies(){
    const { mainPostID } = useParams();
    const db = getFirestore(app);
    const [replyList, setReplyList] = useState([]);
    const [mainPost, setMainPost]= useState();
    const [comment, setComment]= useState("");
    const auth = getAuth();

    // Get the Main post ---------------------------------
    const getMainPost = useCallback(async (mainPostID) =>{
        const docRef = doc(db, "Posts", mainPostID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setMainPost(docSnap.data());
        } else {
            console.debug("No such document!");
        }
    },[db]);

    useEffect(() => {
        if (mainPostID) {
            getMainPost(mainPostID);
        }

    }, [getMainPost, mainPostID]); 
    // --------------------------------------------------
    // Handle posting a comment -------------------------
    const handleComment = useCallback(async (e) =>{
        e.preventDefault();
        const postRef = doc(db, "Posts", mainPostID);
        const repliesCollRef = collection(postRef, "Replies");
        const now = new Date();

        const name = await retrieveName();
       
        const newComment = {
            Comment: comment,
            Name: name,
            UserID: auth.currentUser.uid,
            Date: formatDate(now)
        }

        addDoc(repliesCollRef, newComment).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        setComment("");
    }, [db, comment]);

    async function retrieveName(){
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data().UserName;
    }
    // --------------------------------------------------
    // Handle the comment section -----------------------
    const getReplies = useCallback(async () => {
        const postRef = doc(db, "Posts", mainPostID);
        const data = await getDocs(collection(postRef, "Replies"));
        setReplyList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }, [db, handleComment])

    useEffect(() => {
        getReplies();
    }, [getReplies]);
    // --------------------------------------------------


    
    return(
        <>
            {mainPost ? (
                <div className="main__post">
                    <h2>Thread</h2>
                    <div className="outerLayer">
                        <div className="post">
                            <h3 className="post__title">{mainPost.Title}</h3>
                            <p className="post__date">{mainPost.Date}</p>
                            <p className="post__post">{mainPost.Post}</p>
                            <p className="post__name">@{mainPost.Name} </p>
                        </div>
                    </div>
                    <div className="comment">
                        <div className="comment__box">
                            <form onSubmit={(e) => handleComment(e)}>
                                <input 
                                    className="enter__comment" 
                                    type="text" 
                                    placeholder="Comment" 
                                    value={comment} 
                                    onChange={e => setComment(e.target.value)}>
                                </input>
                                <button className="comment__button" type="submit">Comment</button>
                            </form>
                        </div>
                    </div>
                    <div className="comment__section">
                        <h2>Comment Section</h2>
                        {replyList.map((reply) =>{
                            return(
                                <div className="comments">
                                    <h3 className="posted__name">{reply.Name} </h3>
                                    <p className="posted__comment">{reply.Comment}</p>
                                    <p className="posted__date">{reply.Date}</p>
                                </div>
                            );
                        })};
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}
