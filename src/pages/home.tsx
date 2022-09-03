import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  console.log('url:');
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log(process.env.RAILWAY_STATIC_URL);
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
};

export default Home;
