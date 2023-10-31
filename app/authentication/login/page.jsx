"use client"
import React from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/app/firebase/firebase";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const containerStyle = {
    //display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '50vh', // You can adjust the height as needed
  };

const buttonStyle = {
    textAlign: 'center', // Center-align the text within the button
  };
const login = () => {
    initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    // if(loading){
    //     return <div>Loding......</div>
    // }

    const logo = async () => {
        await signOut(auth).then(() => {
            console.log("Sign In Successfull")
          }).catch((error) => {
            // An error happened.
          });
    }

    const log = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        console.log("siged i");
        console.log(user);
        return user;
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    }

    

    if(user){
        return (
        
            <div>Welcome {user.email}
            <Button variant="contained" onClick={logo}>Signup </Button>
            </div>
            )
    }
    
    return (
        <div style={containerStyle}>
            <h2>Login</h2>
            
           
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
           
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} /> <br/>
            <Button style={buttonStyle} variant="contained" onClick={logo}>Login </Button>
        </div>
    )
}

export default login;