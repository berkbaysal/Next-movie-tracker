import { NextApiRequest, NextApiResponse } from "next";
import {authenticated} from "./checkAuth"
require("dotenv").config()

 export default authenticated(async function searchMovie(req:NextApiRequest,res:NextApiResponse){
    const params = {
        api_key: process.env.MOVIE_DB_API_KEY,
        language: "en-US",
        query: req.body.query,
    }
    const fetchRes = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${params.api_key}&query=${params.query}`)
    const json = await fetchRes.json()
    res.json(json);
})