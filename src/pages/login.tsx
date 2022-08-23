import { Button, TextField } from '@mui/material'
import Router from 'next/router';
import React, { useState } from 'react'
import styles from "../styles/Login.module.css"


const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    async function handleClick() {
        const res = await fetch("api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        if (res.status === 200) {
            Router.push("/home");
        }

    }

    return (
        <div className={styles.loginPage}>
            <form className={styles.loginForm}>
                    <TextField
                        label='Username'
                        className={styles.formElement}
                        size="small"
                        required
                        value={username}
                        autoComplete = "username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        type="password"
                        className={styles.formElement}
                        size="small"
                        required
                        value={password}
                        autoComplete = "current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='contained' className={styles.formElement} onClick={() => { handleClick() }}>Log In</Button>
                <div className={styles.formText}>Don&apos;t have an account? <span className={styles.link} onClick={() => { Router.push("/signup") }}>Click here.</span></div>
            </form>
        </div>
    )
}

export default Login