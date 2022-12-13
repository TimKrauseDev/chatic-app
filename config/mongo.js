import mongoose from 'mongoose';
import keys from './keys.js';

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log("Mongo has connected successfully");
});

mongoose.connection.on('reconnected', () => {
	console.log("Mongo has reconnected");
});

mongoose.connection.on('error', err => {
	console.error(err);
	mongoose.disconnect();
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongo connection is disconnected');
})