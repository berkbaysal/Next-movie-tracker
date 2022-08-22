import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Router from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {

  async function checkAuth() {
    const res = await fetch("api/checkAuth", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const resStatus = await res.status;
    if (resStatus !== 200) {return false}
    else { return true}
  }

  useEffect(() => {
    async function redirect(){
      const auth = await checkAuth()
      if (Router.pathname !== "/login" && Router.pathname !== "/register") {
        if(!auth){
          Router.push("/login");
        }
      }
      else{
        if(await checkAuth()){
          Router.push("/home");
        }
      }
    }
    redirect();
  }, [])


  return (<Component {...pageProps} />)
}

export default MyApp
