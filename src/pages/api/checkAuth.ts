import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
require ("dotenv").config();

export const authenticated = (fn:NextApiHandler) => async (req:NextApiRequest, res:NextApiResponse) =>{
    jwt.verify(req.cookies.accessToken!,process.env.ACCESS_TOKEN_SECRET,async function(err,decoded){
        if(!err && decoded){
            return fn(req,res);
        }
        res.status(401).json({message:"Sorry you are not authenticated"});
       
    })
}

export default authenticated(async function confirmAuth(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({message:"User valid"});
})

