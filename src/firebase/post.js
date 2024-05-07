import './firebase.js';
import React, { useEffect, useState } from "react";
import { collection, addDoc, getFirestore, doc, getDoc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase.js';

const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;

export async function makePost(title, post){
    let returnedName;
    try {
        returnedName = await getName();
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, proceed with writing to the document
                    const now = new Date();
                    addDoc(collection(db, "Posts"), {
                        Date: formatDate(now),
                        Name: returnedName,
                        Post: post,
                        Title: title,
                        UserID: user.uid
                    }).then(docRef => {
                        console.debug("Document written with ID: ", docRef.id);
                        resolve(docRef.id);
                    }).catch(error => {
                        console.error("Error adding document: ", error);
                        reject(error);
                    });
                } else {
                    // No user is signed in.
                    console.error("No user is signed in.");
                    reject(new Error("No user is signed in."));
                }
            });
        });
    } catch (error) {
        console.error("Error retrieving name:", error);
    }
}
    

async function getName() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                console.log("Document data:", docSnap.data().UserName);
                resolve(docSnap.data().UserName);                                            
            } else {
                console.error("No user is signed in.");
                reject(new Error("No user is signed in."));
            }
        });
    });

}

export function formatDate(date) {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
    });
    const formattedDate = dateFormatter.format(date);
   
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12; 
    const minute = minutes < 10 ? '0' + minutes : minutes;
   
    return `${formattedDate} at ${hour}:${minute}${ampm}`;
   }
