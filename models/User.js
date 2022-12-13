import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: String,
		avatarSvg: String
	},
	{
		timestamps: true,
		collection: "users"
	}
);


userSchema.static('getAllUsers', async function() {
	try {
		const users = await this.find();
		return users;
	} catch (err) {
		throw err;
	}
});

userSchema.static('getUserById', async function(id) {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw ('user id is invalid');
		const user = await this.findOne({ _id: id });
		if (!user) throw ('No user with this id found');
		return user;
	} catch (err) {
		throw err;
	}
});

userSchema.static('createUser', async function(username, avatarSvg) {
	try {
		if(!username) throw ('username required to create user');
		if(!avatarSvg) throw ('svg required to create user');
		const user = await this.create({ username, avatarSvg });
		return user;
	} catch (err) {
		throw err;
	}
});

userSchema.static('deleteUserById', async function(id) {
	try {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) throw ('user id is invalid');
		const user = await this.findOneAndDelete({ _id: id});
		if (!user) throw ('No user with this id found');
		return user;
	} catch (err) {
		throw err;
	}
})

export default mongoose.model('User', userSchema);