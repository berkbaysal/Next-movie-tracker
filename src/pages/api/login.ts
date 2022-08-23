import { NextApiResponse } from "next";
import { UserRequest } from "../../util/interfaces";
import  {findByUserName} from "../../util/dbFunctions"
import cookie from "cookie"
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export default async function registerNewUser(req: UserRequest, res:NextApiResponse){

    if(req.method !== "POST"){
        res.status(400).json({messsage:"Bad Request"});
    }
    else{
        const user = await findByUserName(req.body.username)
        if(!user){
            res.status(401).json({message:"Username does not exist"})
            
        }
        else{
            if(await bcrypt.compare(req.body.password, user.password)){
                const accessToken = jwt.sign({id: user._id.toString()}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"7h"});
                res.setHeader('Set-Cookie',cookie.serialize("accessToken",accessToken,{
                    httpOnly:true,
                    secure:process.env.NODE_ENV !== "development",
                    sameSite:"strict",
                    maxAge: 3600,
                    path: "/"
                }))
                res.status(200).json({message:"User logged in."});
                
            }
            else{  
                res.status(401).json({message:"Wrong password"});
                
            }      
        }
    }
}