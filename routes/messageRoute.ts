import express from 'express'
import { sendMessage } from '../controllers/message'
import { verifyAccess } from '../middlewares/verifyAccess';

const messageRoute = express.Router();

messageRoute.post('/send-message/:id',verifyAccess,sendMessage)


export default messageRoute