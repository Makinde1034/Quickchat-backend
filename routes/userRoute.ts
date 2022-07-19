import express from 'express'
import { createUser } from '../controllers/user'

const userRoute = express.Router();

userRoute.post('/register',createUser)


export default userRoute