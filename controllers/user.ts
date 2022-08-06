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
			password: hashedPassword,
			userName: userName,
		});

		const accessToken = jwt.sign(
			{ user_id: newUser._id },
			process.env.ACCESS_TOKEN as string,
			{ expiresIn: "2 days" }
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

export const login = async (req: Request, res: Response) =>{
    const { email,password } = req.body
    const user = await User.findOne({email : email })

    if(!user){
        return res.status(400).json({message : "No user with this email"})
    }

    

    if(user && ( await bcrypt.compare(password,user.password)) ){
        const token = jwt.sign({user_id : user._id},process.env.ACCESS_TOKEN as string,{expiresIn : "24h"})
    
        return res.status(200).json({
            token,
            user
        })
    }

    res.status(400).json({msg:"Password not correct"})
}

