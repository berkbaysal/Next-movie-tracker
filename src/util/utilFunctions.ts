import { NextPageContext } from "next";
import  Router  from "next/router";

export function validateResponse(res:Response,ctx?:NextPageContext){
    if(res.status === 401 && !ctx?.req){
        Router.push("/login");
        return {};
    }
    else if(res.status === 401 && ctx?.req){
        ctx.res?.writeHead(302,{
            Location: "/login"
        });
        ctx.res?.end();
        return;
    }
    return;
}