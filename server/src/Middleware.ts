import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default async function Middleware(req:Request,res:Response,NextFunction:NextFunction){

    const token = req.cookies.token;
    
    if(!token)return;
  
    const login = (await jwt.verify(token,process.env.SECRET!)as {login:string}).login;

    req.query.user1 = login;
    NextFunction();
}