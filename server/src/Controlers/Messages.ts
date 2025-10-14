import ChatService from "../Services/ChatService";
import { Request, Response } from "express";

export default class MessagesController {
    constructor(private serv: ChatService) {}

    async DeleteMessage(req: Request, res: Response) {
        try{
        await this.serv.Delete(req.body.id);
        res.sendStatus(200);
        }
        catch(error){
            res.status(500).json(error);
        }
    }

    async EditMessage(req: Request, res: Response) {
        try{
        await this.serv.Edit(req.body.id, req.body.content);
        res.sendStatus(200);
        }
        catch(error){
            res.status(500).json(error);
        }
    }

    async SendMessage(req: Request, res: Response) {
        try{
        await this.serv.Send(req.body.username, req.body.chatId, req.body.Message);
        res.sendStatus(200);
        }
        catch(error){
            res.status(500).json(error);
        }
    }

    async GetMessages(req: Request, res: Response) {
        try{
        const data = await this.serv.getMessages(
            req.query.user1 as string,
            req.query.user2 as string
        );
        res.json(data);
        }
        catch(error){
            res.status(500).json(error);
        }
    }
}
