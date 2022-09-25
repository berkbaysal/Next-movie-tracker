import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true); //SET TO FALSE TO FORCE LOGINS

  async function checkAuth() {
    const res = await fetch('/api/checkAuth', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resStatus = await res.status;
    if (resStatus !== 200) {
      return false;
    } else {
      return true;
    }
  }

  // useEffect(() => {
  //   async function redirect() {
  //     const auth = await checkAuth();
  //     if (Router.pathname !== '/login' && Router.pathname !== '/register') {
  //       if (!auth) {
  //         Router.push('/login');
  //       } else {
  //         setAuthenticated(true);
  //       }
  //     } else {
  //       if (await checkAuth()) {
  //         Router.push('/home');
  //       } else {
  //         setAuthenticated(true);
  //       }
  //     }
  //   }
  //   redirect();
  // }, []);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: 'auto' }}>{children}</div>
    </div>
  );
};

export default Layout;
