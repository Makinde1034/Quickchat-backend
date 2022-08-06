import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name : {
        type: String
    },
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	],
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "message",
		},
	],
});

export default mongoose.model("group", groupSchema);
