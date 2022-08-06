import mongoose from "mongoose";

const recentChatSchema = new mongoose.Schema({
	sender: {
		type : mongoose.Schema.Types.ObjectId,
        ref : "user"
	},
	reciever: {
		type : mongoose.Schema.Types.ObjectId,
        ref : "user"
	},
});

export default mongoose.model("recentChat", recentChatSchema);
