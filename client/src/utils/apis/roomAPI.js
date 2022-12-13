import axios from 'axios';

const api = {

	fetchAllRooms: async () => {
		try {
			const { data } = await axios.get('/api/room');
			return data.data;
		} catch (err) {
			console.warn(err)
		}
	},
	
	fetchRoomById: async (roomId) => {
		try {
			const { data } = await axios.get(`/api/room/${roomId}`);
			return data.data;			
		} catch (err) {
			console.warn(err)
		}
	},
	
	createNewRoom: async (name) => {
		try {
			const { data } = await axios.post('/api/room', { name });
			return data.data;			
		} catch (err) {
			console.warn(err)
		}
	},
	
	deleteRoomById: async (roomId) => {
		try {
			const { data } = await axios.delete(`/api/room/${roomId}`);
			return data.data;
		} catch (err) {
			console.warn(err);
		}
	},
}

export default api;