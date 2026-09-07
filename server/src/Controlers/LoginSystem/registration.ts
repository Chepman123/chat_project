
import { Request,Response } from 'express';
import RegistrationService from '../../Services/RegistrationService';

export default class RegistrationContoller{
    constructor (private serv:RegistrationService){}
    async Registration(req:Request,res:Response){
        try{
            const result = await this.serv.Registration(
    req.body.Password,
    req.body.Login,
    req.body.date
);
 res.cookie('token',result.token,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge:7*24*60*60*1000
            })
       res.json( result.result);
        }
       catch(error){
         res.status(500).json({error:error});
       }
    }
}
