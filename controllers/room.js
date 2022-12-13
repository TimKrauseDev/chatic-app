import RoomModel from '../models/Room.js';

export default {
	handleGetAllRooms: async (req, res) => {
		try {
			const rooms = await RoomModel.getAllRooms();
			return res.status(200).json({ success: true, data: rooms });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleGetRoomById: async (req, res) => {
		try {
			const { id } = req.params;
			const room = await RoomModel.getRoomById(id);
			return res.status(200).json({ success: true, data: room });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleCreateRoom: async (req, res) => {

		try {
			const { name, visibility } = req.body;
			const room = await RoomModel.createRoom(name, visibility);
			return res.status(201).json({ success: true, data: room });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleDeleteRoomById: async (req, res) => {
		try {
			const { id } = req.params;
			const data = await RoomModel.deleteRoomById(id);
			return res.status(200).json({ success: true, data });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	}
}