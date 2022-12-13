import mongoose from 'mongoose';
import UserModel from '../models/User.js';

export default {
	handleGetAllUsers: async (req, res) => {
		try {
			const users = await UserModel.getAllUsers();
			return res.status(200).json({ success: true, data: users });
		} catch (err) {
			return res.status(500).json({ success: false, error: err })
		}
	},
	handleCreateUser: async (req, res) => {
		try {
			const { username, avatarSvg } = req.body;
			const user = await UserModel.createUser(username, avatarSvg);
			return res.status(201).json({ success: true, data: user });
		} catch (err) {
			return res.status(500).json({ success: false, error: err })
		}
	},
	handleGetUserById: async (req, res) => {
		try {
			const { id } = req.params;
			const user = await UserModel.getUserById(id);
			return res.status(200).json({ success: true, data: user });
		} catch (err) {
			return res.status(500).json({ success: false, error: err })
		}
	},
	handleDeleteUserById: async (req, res) => {
		try {
			const { id } = req.params;
			const user = await UserModel.deleteUserById(id);
			return res.status(200).json({ success: true, data: user });
		} catch (err) {
			return res.status(500).json({ success: false, error: err })
		}
	},

}