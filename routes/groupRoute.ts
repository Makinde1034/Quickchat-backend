import express from "express";
import { createGroup } from "../controllers/group";
import { verifyAccess } from "../middlewares/verifyAccess";

const groupRoute = express.Router();

groupRoute.post("/create-group", verifyAccess, createGroup);

export default groupRoute
