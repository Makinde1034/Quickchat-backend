import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
	
	try {
		const { email, password, userName } = req.body;
		const userExists: any = await User.findOne({ email: email });

		if (userExists) {
			res.status(409).json({ msg: "User already exists" });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			email: email,
			password: password,
			userName: userName,
		});

		const accessToken = jwt.sign(
			{ user_id: newUser._id },
			process.env.ACCESS_TOKEN as string,
			{ expiresIn: "24hr" }
		);

		res.status(200).json({
			accessToken,
			newUser,
		});
	} catch (err) {
		res.json({msg:"An error occure"})
		console.log(err)
	}
};
