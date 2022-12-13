import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		roomId: {
			type: mongoose.ObjectId,
			required: true,
		},
		message: {
			content: { type: String, required: true },
			fromUserId: { type: mongoose.ObjectId, required: true },
			fromUsername: { type: String, required: true }
		},
	},
	{
		timestamps: true,
		collection: "messages"
	}
);

messageSchema.plugin(mongoosePaginate);


messageSchema.static('getAllMessages', async function () {
	try {
		const messages = await this.find(); 
		return messages;
	} catch (err) {
		throw err;
	}
});

messageSchema.static('getAllMessagesWithRoomId', async function (roomId, page = 1) {
	try {
		if (!roomId.match(/^[0-9a-fA-F]{24}$/)) throw ('roomId is invalid');

		const customLabels = {
			totalDocs: 'totalMessages',
			docs: 'messageList',
		};

		const options = {
			page: page,
			limit: 20,
			sort: '-createdAt',
			customLabels: customLabels,
		};

		const results = await this.paginate({ roomId: mongoose.Types.ObjectId(roomId) }, options)
		return results;

	} catch (err) {
		throw err;
	}
});

messageSchema.static('createMessage', async function (data) {
	try {
		if(!data?.roomId) throw ('Room Id is required');
		if(!data?.message) throw ('Message is required');
		if(!data.message?.content) throw ('Message content is required');
		if(!data.message?.fromUserId) throw ('Message user id is required');
		if(!data.message?.fromUsername) throw ('Message username is required');

		const message = await this.create(data)
		return message;
	} catch (err) {
		throw err;
	}
});

messageSchema.static('deleteMessagesByRoomId', async function (roomId) {
	try {
		if (!roomId.match(/^[0-9a-fA-F]{24}$/)) throw ('roomId is invalid');
		const response = await this.deleteMany({ roomId: roomId });
		return response;
	} catch (err) {
		throw err;
	}
});

messageSchema.static('updateMessageContent', async function (id, content) {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw ('message id is invalid');
		if (!content) throw ('Message content required');

		const message = await this.findOneAndUpdate(
			{ _id: id},
			{ $set: { "message.content": content} },
			{ new: true }
		);
		return message;
	} catch (err) {
		throw err;
	}
});

messageSchema.static('deleteMessageById', async function (id) {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw ('id is invalid');
		const message = await this.findOneAndDelete({ _id: id });
		return message;
	} catch (err) {
		throw err;
	}
});



export default mongoose.model('Message', messageSchema);