import { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

export default async function getPersonImage(req: NextApiRequest, res: NextApiResponse) {
  const params = {
    api_key: process.env.MOVIE_DB_API_KEY,
    language: 'en-US',
    id: req.query.id,
  };
  const fetchRes = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${params.api_key}`);
  const json = await fetchRes.json();
  res.json(json);
}
