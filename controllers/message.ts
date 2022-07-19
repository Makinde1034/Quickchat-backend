import Message from "../models/messageModel";            
import { Response, Request } from "express";

export const sendMessage = async (req: any, res: Response) => {
	try {
		await Message.create({
			sender: req.user_id,
			reciever: req.params.id,
            content: req.body.content
		});
        res.status(200).json({msg:"Message sent"})
	} catch (err) {
        res.json({msg : "An error occured"})
        console.log(err)
    }
};
 