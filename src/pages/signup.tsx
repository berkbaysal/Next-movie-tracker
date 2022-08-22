import { Button, TextField } from '@mui/material'
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import loginStyles from "../styles/Login.module.css"
import { checkIfUserNameExists } from '../util/dbFunctions';

const Login = () => {

    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [userNameIsValid, setUserNameIsValid] = useState(true);

    async function handleClick() {
         const res = await fetch("api/signup", {
             method: "POST",
             headers:{
             "Content-Type":"application/json"
            },
             body: JSON.stringify({ username, password })
         });
         if(res.status===200){
            Router.push("/login");
         }

    }
    async function checkIfUserNameIsValid(){
        fetch("/api/checkUserName",{
            method: "POST",
            headers:{
            "Content-Type":"application/json"
           },
            body: JSON.stringify({ username })
        })
        .then(res=>res.json())
        .then(data=>{setUserNameIsValid(data.usernameAvailable)})
    }
    useEffect(()=>{checkIfUserNameIsValid()},[username])
    return (
        <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginForm}>
                <TextField
                    label='Username'
                    className={loginStyles.formElement}
                    size="small"
                    required
                    value = {username}
                    error = {!userNameIsValid}
                    onChange = {(e)=>setUsername(e.target.value)}
                    />
                <TextField
                    label='Password'
                    type="password"
                    className={loginStyles.formElement}
                    size="small"
                    required
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}
                    />
                <Button variant='contained' className={loginStyles.formElement} onClick={() => { handleClick()}}>Sign Up</Button>
                <div className ={loginStyles.formText}>Already have an account? <span className={loginStyles.link} onClick={()=>{Router.push("/login")}}>Click here.</span></div>
            </div>
        </div>
    )
}

export default Login