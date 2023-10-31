"use client"
import exp from "constants";
import React from "react";
import { useState } from "react";
import { initFirebase } from "@/app/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; 
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const signup = () => {
    const app = initFirebase();
    console.log(app);
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const router = useRouter();
    
    const Register = async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            router.push("/gif")
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            });
        }
    
    
    return (
        <div>
            <h1>Sign UP</h1>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
            
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}></TextField> <br/>
           
            <Button variant="contained" onClick={Register} >Signup </Button>
        </div>
    )
}

export default signup;