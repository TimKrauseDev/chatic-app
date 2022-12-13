import axios from 'axios';
import { faker } from '@faker-js/faker';

const api = {

	fetchAvatars: async (count = 5) => {
		try {
			const endpoints = [];
			for (let i = 0; i < count; i++) 
				endpoints.push("https://api.multiavatar.com/" + faker.random.alphaNumeric(15) + ".svg");

			const responses = await Promise.all( endpoints.map(endpoint => axios.get(endpoint)) );
			return responses.map(response => response.data);
		} catch (err) {
			console.warn(err);
		}
	}

}

export default api;