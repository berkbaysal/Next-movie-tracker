import { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

export default async function getTrending(req: NextApiRequest, res: NextApiResponse) {
  const params = {
    api_key: process.env.MOVIE_DB_API_KEY,
  };
  const fetchRes = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${params.api_key}`);
  const json = await fetchRes.json();
  res.json(json);
}
