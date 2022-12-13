import { useState, useContext } from 'react';
import axios from 'axios'
import { SocketContext } from 'utils/context/socket';
import SVG from 'react-inlinesvg';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import AvatarBlank from 'images/svgs/AvatarBlank';


const ChatCardFooterContent = ({ username, userId, avatarSvg, roomId, roomMessagesData, setScrollIntoView }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const socket = useContext(SocketContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if(!roomId || !userId || !username) return;

		const messageData = {
			roomId,
			message: {
				content: currentMessage,
				fromUserId: userId,
				fromUsername: username 
			}
		}

		const { data } = await axios.post('api/message', messageData);
		socket.emit('POST_MESSAGE', data);

		setScrollIntoView(true);

		roomMessagesData.refetch();

		setCurrentMessage('');
	}

	return (
	    <>
	        <Card.Header className="fw-bold pb-2">{username}</Card.Header>
        	<div className="d-flex gap-2 align-items-center">
        		{avatarSvg && <SVG src={avatarSvg} width={45} height={45}/>}
        		{!avatarSvg && <AvatarBlank />}
				<Form onSubmit={handleSubmit} className="w-100">
	        		<InputGroup className="">
				        <Form.Control
				        	placeholder="Message..."
				        	aria-label="Message"
				        	value={currentMessage}
				        	onChange={(e) => setCurrentMessage(e.target.value)}
				        	disabled={!roomId}
				        />
				        <Button 
				        	type="submit" 
				        	variant="secondary"
				        	id="df"
				        >
						    Send
						</Button>
				    </InputGroup>
					
				</Form>
    		</div>
		</>
	);
}

const ChatCardFooter = ({ user, roomId, setScrollIntoView, roomMessagesData }) => {
	return (
    	<Card.Footer className="p-2 bg-success bg-opacity-50">
        	{user.isLoading
        		? 'Loading...'
        		: user.isError
        		? 'Error getting user'
        		: user.data
        		? <ChatCardFooterContent 
        				username={user.data.username} 
        				userId={user.data._id}
        				avatarSvg={user.data.avatarSvg} 
        				roomId={roomId}
        				setScrollIntoView={setScrollIntoView}
        				roomMessagesData={roomMessagesData}
        		  />
        		: null
        	}
	    </Card.Footer>
	);
}


export default ChatCardFooter;