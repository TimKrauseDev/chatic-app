import axios from 'axios';

const api = {

	fetchAllMessages: async () => {
		try {
			const { data } = await axios.get('/api/message');
			return data.data;
		} catch (err) {
			console.warn(err);
		}
	},

	fetchAllMessagesByRoomId: async (roomId, page = 1) => {
		if(!roomId) return [];
		try {
			const { data } = await axios.get(`/api/message/${roomId}?page=${page}`);
			return data.data;			
		} catch (err) {
			console.warn(err);
		}
	},

	createNewMessage: async (roomId, fromUserId, fromUsername, content ) => {

		const messageData = {
			roomId,
			message: {
				fromUserId,
				fromUsername,
				content
			}
		}

		try {
			const { data } = await axios.post('/api/message', messageData);
			return data.data;			
		} catch (err) {
			console.warn(err);
		}
	},
	
	deleteAllMessagesByRoomId: async (roomId) => {
		try {
			const { data } = await axios.delete(`/api/message/room/${roomId}`);
			return data.data;
		} catch (err) {
			console.warn(err);
		}
	},

	updateMessageContent: async (id, content) => {
		try {
			if(!id || !content) throw Error('Id and content required.')
			const { data } = await axios.patch(`/api/message/content/${id}`, { content });
			return data.data;
		} catch (err) {
			console.error(err);
		}
	},

	deleteMessage: async (id) => {
		try {
			if (!id) throw Error('Id required');
			const { data } = await axios.delete(`/api/message/${id}`);
			return data.data;
		} catch (err) {
			console.error(err);
		}
	}
}

export default api;