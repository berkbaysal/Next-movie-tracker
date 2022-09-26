import type { NextPage, NextPageContext } from 'next';
import Layout from '../components/Layout';
import TopTrending from '../components/TopTrending';
import { Trending } from '../util/interfaces';

interface IProps {
  trending: Trending;
}

const Home: NextPage = ({ trending }: IProps) => {
  return (
    <Layout>
      <TopTrending topResult={trending.results[12]} />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(ctx: NextPageContext) {
  const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://' + 'next-movie-tracker-production.up.railway.app';
  const cookie = ctx.req?.headers.cookie;

  const trending = await fetch(URL + '/api/trending', {
    headers: {
      cookie: cookie!,
    },
  });
  const json = await trending.json();
  return {
    props: {
      trending: json,
    },
  };
}
