import { NextApiRequest } from "next"

export interface IUser{
    username: string
    password: string
}
export interface UserRequest extends NextApiRequest{
    username:string
    password:string
}

export interface UserNameRequest extends NextApiRequest{
    username:string
}