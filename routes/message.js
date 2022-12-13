import express from 'express';

// Controller
import message from '../controllers/message.js';

const router = express.Router();

router
	.get('/', message.handleGetAllMessages)
	.get('/:roomId', message.handleGetAllMessagesWithRoomId)
	.post('/', message.handleCreateMessage)
	.delete('/room/:roomId', message.handleDeleteMessagesByRoomId)
	.patch('/content/:id', message.handleUpdateMessageContent)
	.delete('/:id', message.handleDeleteMessageById)

export default router;


// GET all message
// GET all messages with specific ROOM_ID

// POST message to specific ROOM_ID
// PATCH message from specific MESSAGE_ID

// DELETE message from specific MESSAGE_ID
// DELETE all messages from specific ROOM_ID