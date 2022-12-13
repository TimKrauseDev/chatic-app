import axios from 'axios';

const api = {

	fetchAllUsers: async () => {
		try {
			const { data } = await axios.get('/api/user');
			return data.data;
		} catch (err) {
			console.warn(err)
		}
	},

	fetchUserById: async (id) => {
		try {
			const { data } = await axios.get(`/api/user/${id}`);
			return data.data;			
		} catch (err) {
			console.warn(err)
		}
	},
	
	createNewUser: async (username = "", avatarSvg = "") => {
		try {
			const { data } = await axios.post('/api/user', { username, avatarSvg });
			return data.data;			
		} catch (err) {
			console.warn(err)
		}
	},
	
	deleteUserById: async (id) => {
		try {
			const { data } = await axios.delete(`/api/user/${id}`);
			return data.data;
		} catch (err) {
			console.warn(err)
		}
	},

	fetchAvatarMap: async () => {

		try {
			const map = new Map();
			const { data } = await axios.get('/api/user');
			for(const user of data.data) map.set(user?._id, user?.avatarSvg);
			return map;
		} catch (err) {
			console.error(err);
		}


	} 
}

export default api;