import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute"
import groupRoute from "./routes/groupRoute"
require("dotenv").config()

const uri =
	"mongodb+srv://Makinde1034:Makinde1034@cluster0.1p3qilt.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(express.urlencoded())

app.use(userRoute);
app.use(messageRoute);
app.use(groupRoute);


const port = process.env.PORT || 5000;

mongoose
	.connect(uri)
	.then(() => {
		console.log("Connected to Mongodb");
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
