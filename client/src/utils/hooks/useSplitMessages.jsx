import { useState } from 'react';
import Messages from '../classes/Messages';


const useSplitMessages = (messages = []) => {
	const [splitMessages, setSplitMessages] = useState(messages);

	function handleSplitMessages(messages = []) {
		if(messages.length === 0 || messages[0].length === 0) {
			setSplitMessages([]);
			return;
		}

		const sectionedMessages = [];
		let messageSection;

		for(const page of messages) {
			for(const messageContent of page?.messageList) {
				const userId = messageContent.message.fromUserId;
				const msgId = messageContent._id;
				const createdAt = new Date(messageContent.createdAt);
				const content = messageContent.message.content;

				// if no current message section
				if(!messageSection) {
					messageSection = new Messages(userId, createdAt);
				}

				// if previous message section for different user
				// create new section
				if(messageSection.getUserId() !== userId) {
					sectionedMessages.push(messageSection);
					messageSection = new Messages(userId, createdAt);
				}

				messageSection.addMessage(content, msgId);
			}

		}

		if(messageSection !== undefined) sectionedMessages.push(messageSection);
		setSplitMessages(sectionedMessages);
	}

	return [splitMessages, setSplitMessages, handleSplitMessages];
}



export default useSplitMessages;