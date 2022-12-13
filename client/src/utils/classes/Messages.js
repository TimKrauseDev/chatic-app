class Messages {
	constructor(userId, createdAt) {
		this.userId = userId;
		this.createdAt = createdAt;
		this.messages = [];
	}

	addMessage(content, id = null) {
		const message = { content, id };

		this.messages.unshift(message);
	}

	updateMessage(message) {
		this.messages.push(message);
	}

	getUserId() {
		return this.userId;
	}

	updateTime(time) {
		this.createdAt = time;
	}
}

export default Messages;