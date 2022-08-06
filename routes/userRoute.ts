import express from 'express'
import { createUser,login } from '../controllers/user'

const userRoute = express.Router();

userRoute.post('/register',createUser)
userRoute.post('/login',login)


export default userRoute