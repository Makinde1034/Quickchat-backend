const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";


export const verifyAccess = (req: any, res: Response, next: NextFunction) => {
	const token = req.headers["x-access-token"];

	if (!token) {
		return next(res.json({msg:"No token found"}));
	}

	jwt.verify(token, process.env.ACCESS_TOKEN, (err:any, decoded:any) => {
		if (err) {
			return res.status(200).json({ auth: false, message: "invalid token" });
		}
		// res.status(200).json({auth : true, message : "valid token"})
		req.user_id = decoded.user_id;
		next();
	});
};
