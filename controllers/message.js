import MessageModel from '../models/Message.js';

export default {
	handleGetAllMessages: async (req, res) => {
		try {
			const messages = await MessageModel.getAllMessages();
			return res.status(200).json({ success: true, data: messages });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleGetAllMessagesWithRoomId: async (req, res) => {
		try {
			const { roomId } = req.params;
			const { page } = req.query;
			const messages = await MessageModel.getAllMessagesWithRoomId(roomId, page); 
			return res.status(200).json({ success: true, data: messages });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleCreateMessage: async (req, res) => {
		try {
			const data = req.body;
			const message = await MessageModel.createMessage(data);
			return res.status(201).json({ success: true, data: message });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleDeleteMessagesByRoomId: async (req, res) => {
		try {
			const { roomId } = req.params;
			const messages = await MessageModel.deleteMessagesByRoomId(roomId);
			return res.status(200).json({ success: true, data: messages });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleUpdateMessageContent: async (req, res) => {
		try {
			const { id } = req.params;
			const { content } = req.body;
			const message = await MessageModel.updateMessageContent(id, content);
			return res.status(200).json({ success: true, data: message });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
	handleDeleteMessageById: async (req, res) => {
		try {
			const { id } = req.params;
			const message = await MessageModel.deleteMessageById(id);
			return res.status(200).json({ success: true, data: message });
		} catch (err) {
			return res.status(500).json({ success: false, error: err });
		}
	},
}