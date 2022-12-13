import mongoose from 'mongoose';

import message from '../controllers/message.js';
import MessageModel from '../models/Message.js';

const { Schema } = mongoose;

const roomSchema = new Schema(
	{
		name: String,
		visibility: {
			isPrivate: { updateType: Boolean, default: false },
			users: { updateType: [mongoose.ObjectId], default: [] }
		},
	}, 
	{
		timestamps: true,
		collection: "rooms"
	}
);

roomSchema.static('getAllRooms', async function () {
	try {
		const rooms = await this.find();
		return rooms;
	} catch (err) {
		throw err;
	}
});

roomSchema.static('getRoomById', async function (id) {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw ('roomId is invalid');
		const room = await this.findOne({ _id: id });
		if(!room) throw ('No room with this id found');
		return room;
	} catch (err) {
		throw err;
	}
});

roomSchema.static('createRoom', async function (name, visibility) {
	try {
		if(!name) throw ('Room name is required')
		const newRoom = {
			name,
			visibility: {
				isPrivate: visibility?.isPrivate,
				users: visibility?.users
			}
		};
		const room = await this.create(newRoom);
		return room;
	} catch (err) {
		throw err;
	}
});

roomSchema.static('deleteRoomById', async function (id) {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw ('roomId is invalid');
		const room = await this.findOneAndDelete({ _id: id });
		if(!room) throw ('No room with this id found');
		const message = await MessageModel.deleteMessagesByRoomId(id);
		return {room, message};
	} catch (err) {
		throw err;
	}
});

export default mongoose.model('Room', roomSchema);