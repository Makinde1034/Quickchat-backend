import express from 'express'
import { sendMessage, getMessageBetweenUsers, getUserRecentChats } from '../controllers/message'
import { verifyAccess } from '../middlewares/verifyAccess';

const messageRoute = express.Router();

messageRoute.post('/send-message/:id',verifyAccess,sendMessage)
messageRoute.get('/get-user-messages/:id',verifyAccess,getMessageBetweenUsers)
messageRoute.get('/get-recent-chats',verifyAccess,getUserRecentChats)


export default messageRoute