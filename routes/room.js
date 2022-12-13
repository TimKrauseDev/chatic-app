import express from 'express';

// Controller
import room from '../controllers/room.js';

const router = express.Router();

router
	.get('/',  room.handleGetAllRooms)
	.get('/:id', room.handleGetRoomById)
	.post('/', room.handleCreateRoom)
	.delete('/:id', room.handleDeleteRoomById)

export default router;


// GET all rooms
// GET room by ID

// POST create room

// DELETE delete room by ID
