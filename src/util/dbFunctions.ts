require ("dotenv").config();
import { Schema, model, connect } from 'mongoose';
import {IUser} from "./interfaces"
import {User} from "./schemas"

export async function addUserToDatabase({username, password}:IUser) {
    await connect(process.env.MONGO_URI ?? "");
    const newUser = new User({ username: username, password:password});
    await newUser.save();
    return;
}
export async function findByUserName(username:string) {
    await connect(process.env.MONGO_URI ?? "");
    const result = await User.findOne({username: username}).exec();
    return result;    
}
export async function checkIfUserNameExists(username:string) {
    await connect(process.env.MONGO_URI ?? "");
    const result = await User.findOne({username: username}).exec();
    
    return result === null ?false:true;    
}
