import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	sender: {
		type : mongoose.Schema.Types.ObjectId,
        ref : "user"
	},
	reciever: {
		type : mongoose.Schema.Types.ObjectId,
        ref : "user"
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("message", messageSchema);
