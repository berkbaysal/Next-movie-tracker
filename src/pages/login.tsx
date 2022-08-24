import { Button, TextField, ThemeProvider } from '@mui/material'
import Router from 'next/router';
import React, { useState } from 'react'
import styles from "../styles/Login.module.css"
import {authTheme} from "../static/theme"


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
                <ThemeProvider theme={authTheme}>
                    <TextField
                        label='Username'
                        size="small"
                        required
                        value={username}
                        autoComplete = "username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        type="password"
                        size="small"
                        required
                        value={password}
                        autoComplete = "current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='contained' onClick={() => { handleClick() }}>Log In</Button>
                    </ThemeProvider>
                <div className={styles.formText}>Don&apos;t have an account? <span className={styles.link} onClick={() => { Router.push("/signup") }}>Click here.</span></div>
            </form>
        </div>
    )
}

export default Login