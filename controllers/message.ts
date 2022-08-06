import Message from "../models/messageModel";
import recentChat from "../models/recentChats";
import User from "../models/userModel";
import { Response, Request } from "express";
import mongoose, { AnyObject } from "mongoose";

export const sendMessage = async (req: any, res: Response) => {
	try {
		// const recentChatAlreadyExists = await recentChat.findOne({
		// 	sender: req.user_id,
		// 	reciever: req.params.id,
		// });

		// const _recentChatAlreadyExists = await recentChat.findOne({
		// 	reciever: req.user_id,
		// 	sender: req.params.id,
		// });

		// if (!recentChatAlreadyExists && !_recentChatAlreadyExists) {
		// 	await recentChat.create({
		// 		sender: req.user_id,
		// 		reciever: req.params.id,
		// 	});
		// }
		const recievingUser: any = await User.findById({ _id: req.params.id });

		const sendingUser: any = await User.findById({ _id: req.user_id });

		const newMessage = await Message.create({
			sender: req.user_id,
			reciever: req.params.id,
			content: req.body.content,
		});

		const t: any = await User.findById(req.user_id).populate("RecentChats");

		for (let i = 0; i < t.RecentChats.length; i++) {
			if (
				(t.RecentChats[i].senderId === req.user_id &&
					t.RecentChats[i].reciver === req.params.id) ||
				(t.RecentChats[i].senderId === req.params.id &&
					t.RecentChats[i].reciver === req.user_id)
			) {
				console.log("chat exists");

				// if both user's already have a recent message. delete the present content and update a new message
				await User.findByIdAndUpdate(
					{ _id: req.user_id },
					{
						$pull: {
							RecentChats: {
								senderId: req.user_id,
								reciver: req.params.id,
							},
						},
					}
				);

				await User.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						$pull: {
							RecentChats: {
								senderId: req.user_id,
								reciver: req.params.id,
							},
						},
					}
				);

				await User.findByIdAndUpdate(
					{ _id: req.user_id },
					{
						$pull: {
							RecentChats: {
								senderId: req.params.id,
								reciver: req.user_id,
							},
						},
					}
				);

				await User.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						$pull: {
							RecentChats: {
								senderId: req.params.id,
								reciver: req.user_id,
							},
						},
					}
				);

				// update each user with opposite user's details.

				console.log(recievingUser);

				await User.findByIdAndUpdate(
					{ _id: req.user_id },
					{
						$push: {
							RecentChats: {
								senderId: req.user_id,
								reciver: req.params.id,
								msg: req.body.content,
								username: recievingUser.userName,
							},
						},
					}
				);

				await User.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						$push: {
							RecentChats: {
								senderId: req.user_id,
								reciver: req.params.id,
								msg: req.body.content,
								username: sendingUser.userName,
							},
						},
					}
				);

				return;
			}
		}

		await User.findByIdAndUpdate(
			{ _id: req.user_id },
			{
				$push: {
					RecentChats: {
						senderId: req.user_id,
						reciver: req.params.id,
						msg: req.body.content,
						username: recievingUser.userName,
					},
				},
			}
		);

		await User.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$push: {
					RecentChats: {
						senderId: req.user_id,
						reciver: req.params.id,
						msg: req.body.content,
						username: sendingUser.userName,
					},
				},
			}
		);

		res.status(200).json({ msg: "Message sent" });
	} catch (err) {
		res.json({ msg: "An error occured" });
		console.log(err);
	}
};

export const getMessageBetweenUsers = async (req: any, res: Response) => {
	try {
		const messages = await Message.aggregate([
			{
				$match: {
					$or: [
						{
							sender: new mongoose.Types.ObjectId(req.user_id),
							reciever: new mongoose.Types.ObjectId(req.params.id),
						},
						{
							reciever: new mongoose.Types.ObjectId(req.user_id),
							sender: new mongoose.Types.ObjectId(req.params.id),
						},
					],
				},
			},
			{ $unwind: { path: "$users", preserveNullAndEmptyArrays: true } },
		]);
		res.status(200).json({ data: messages });
	} catch (err) {
		res.json({ msg: "An error occured" });
	}
};

export const getUserRecentChats = async (req: any, res: Response) => {
	const recentChats =  await User.findById(req.user_id).populate("RecentChats");
	res.status(200).json({data : recentChats})
};

// export const getUserRecentChats = async (req: any, res: Response) => {
// 	try {
// 		const recentChats = await recentChat.aggregate([
// 			{
// 				$match: {
// 					$or: [
// 						{
// 							sender: new mongoose.Types.ObjectId(req.user_id),
// 						},
// 						{
// 							reciever: new mongoose.Types.ObjectId(req.user_id),
// 						},
// 					],
// 				},
// 			},
// 			// {
// 			// 	$lookup: {
// 			// 		from: "users",
// 			// 		foreignField: "_id",
// 			// 		localField: "sender",
// 			// 		as: "users",
// 			// 	},
// 			// },

// 			// {
// 			// 	$sort: {
// 			// 		date: 1,
// 			// 	},
// 			// },

// 			// {
// 			// 	$lookup: {
// 			// 		from: "users",
// 			// 		foreignField: "_id",
// 			// 		localField: "sender",
// 			// 		as: "users",
// 			// 	},
// 			// },
// 			// {
// 			// 	$project: {
// 			// 		date: 0,
// 			// 	},
// 			// },
// 		]);

// 		let _res: any = [];
// 		for (let i = 0; i < recentChats.length; i++) {

// 			const messages = await Message.find({
// 				sender: recentChats[i].sender,
// 				reciever: recentChats[i].reciever,
// 			});

// 			const _messages = await Message.find({
// 				reciever: recentChats[i].sender,
// 				sender: recentChats[i].reciever,
// 			});

// 			_res.push({
// 				chats: recentChats[i],
// 				messages: [...messages,..._messages]

// 			});
// 		}

// 		res.status(200).json(_res);
// 	} catch (err) {
// 		res.json({ msg: "An error occured" });
// 	}
// };
