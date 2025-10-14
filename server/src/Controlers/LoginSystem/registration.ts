
import { Request,Response } from 'express';
import RegistrationService from '../../Services/RegistrationService';

export default class RegistrationContoller{
    constructor (private serv:RegistrationService){}
    async Registration(req:Request,res:Response){
        try{
       res.json(await this.serv.Registration(req.body.Login,req.body.Password,req.body.date));
        }
       catch(error){
         res.status(500).json({error:error});
       }
    }
}
