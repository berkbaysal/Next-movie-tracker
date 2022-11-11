import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  console.log('url:');
  console.log(process.env.URL);

  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
};

export default Home;
