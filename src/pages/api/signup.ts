import { NextApiResponse } from "next";
import { UserRequest } from "../../util/interfaces";
import  {addUserToDatabase,checkIfUserNameExists} from "../../util/dbFunctions"
const bcrypt = require("bcrypt")

export default async function registerNewUser(req: UserRequest, res:NextApiResponse){

    if(req.method !== "POST"){
        res.status(400).json({messsage:"Bad Request"});
    }
    else{
        const userNameAlreadyExists = await checkIfUserNameExists(req.body.username);
        if(userNameAlreadyExists){
            res.json({message:"Username already exists"})
        }
        else{
            const hashedPassword:string = await bcrypt.hash(req.body.password,10)
            addUserToDatabase({username:req.body.username,password:hashedPassword});
            res.status(200).json({message:"User registered"});
        }
    }
}