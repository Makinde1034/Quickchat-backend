import Group from "../models/groupModel"; 
import { Response  } from 'express'

export const createGroup = async (req: any, res: Response) => {
	try {
        const newGroup = await Group.create({
            name : req.body.name,
            admin : req.user_id,

        })
        res.status(200).json({msg : "Group successfully created"})
	} catch (err) {
		res.json({msg : "Failed to create group"})
	}
};
