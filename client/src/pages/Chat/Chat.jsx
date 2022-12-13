import { useState, useEffect, useRef, useContext } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NewRoomModal from './components/NewRoomModal';
import EditMessageModal from './components/EditMessageModal';
import RoomsList from './components/RoomsList';
import ChatMessages from './components/ChatMessages';
import ChatCardFooter from './components/ChatCardFooter';

import roomAPI from 'utils/apis/roomAPI';
import userAPI from 'utils/apis/userAPI';
import messageAPI from 'utils/apis/messageAPI';
import { useAuth } from 'utils/hooks/useAuth';
import { SocketContext } from 'utils/context/socket';
import useSplitMessages from 'utils/hooks/useSplitMessages';

const Chat = () => {
	// room
	const [currentRoom, setCurrentRoom] = useState({});
	const [createRoomIsActive, setCreateRoomIsActive] = useState(false);
	const publicRooms = useQuery(['publicRooms'], roomAPI.fetchAllRooms);

	// user
	const { user, logout } = useAuth();
	const userData = useQuery([user], async () => {
		const response = await userAPI.fetchUserById(user);
		if(!response) logout();
		return response || '';
	} );

	// messages
	const [editMessageIsActive, setEditMessageIsActive] = useState(false);
	const [editMessage, setEditMessage] = useState({});
	const [roomMessages, , setInitialSplit] = useSplitMessages();
	const roomMessagesData = useInfiniteQuery(
		['roomMessages', currentRoom?._id], 
		({ pageParam = 1 }) => messageAPI.fetchAllMessagesByRoomId(currentRoom?._id, pageParam), { 
			getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
		}
	);

	// other
	const [scrollIntoView, setScrollIntoView] = useState(true);
	const bottomRef = useRef(null);
	const socket = useContext(SocketContext);
	const [unreadRoomMessages, setUnreadRoomMessages] = useState({});

	// initial load, once rooms have been fetched, set and join first room.
	useEffect(() => {
		if(currentRoom && Object.keys(currentRoom).length) return;
		if(!publicRooms.data) return;
		setCurrentRoom(publicRooms.data[0]);

	}, [publicRooms, currentRoom]);

	// When active room changes, fetch messages for that room
	useEffect(() => {
		if(currentRoom && !Object.keys(currentRoom).length) return;
		setScrollIntoView(true);
		socket.emit('JOIN_ROOM', currentRoom?._id);
	}, [currentRoom, socket]);

	// When room messages data changes, set room messages
	useEffect(() => {
		if(!roomMessagesData.data) return;
		setInitialSplit(roomMessagesData.data?.pages);
	}, [roomMessagesData.data]);

	// when openning up a new chat, scroll to bottom
	useEffect(() => {
		if(!scrollIntoView) return;
		bottomRef.current?.scrollIntoView();
	}, [roomMessages, scrollIntoView]);

	useEffect(() => {
		const handleGetMessageEverwhere = ({roomId}) => {
			if(currentRoom?._id === roomId) return;

			let updatedValue = {};
			updatedValue[roomId] = unreadRoomMessages[roomId] + 1 || 1;

			setUnreadRoomMessages(prev => ({
				prev,
				...updatedValue
			}));
		}

		socket.on('GET_MESSAGE', (data) => handleReceiveMessage(data));
		socket.on('GET_MESSAGE_EVERYWHERE', (data) => handleGetMessageEverwhere(data));
		socket.on('GET_NEW_ROOMS', () => { publicRooms.refetch(); });
		socket.on('GET_NEW_USERS', (data) => { 
			if(data.includes(user)) {
				logout();
			} 
			userData.refetch();
		})

		return () => {
			socket.off('GET_MESSAGE');
			socket.off('GET_MESSAGE_EVERYWHERE');
			socket.off('GET_NEW_ROOMS');
			socket.off('GET_NEW_USERS')
		}
	}, [socket, currentRoom, unreadRoomMessages, logout, user, userData, publicRooms]);


	const handleReceiveMessage = (data) => {
		setScrollIntoView(true);
		roomMessagesData.refetch();
	};

	return (
        <>
        	<NewRoomModal
		        show={createRoomIsActive}
		        onHide={() => {
		        	setCreateRoomIsActive(false)
		        	publicRooms.refetch();
		        }}
		    />

        	<EditMessageModal
		        show={editMessageIsActive}
		        onHide={() => {
		        	setEditMessageIsActive(false);
		        	roomMessagesData.refetch();
		        }}
		        editMessage={editMessage}
		    />

			<Container fluid={true}>
	            <Row className="mh-500">
	                <Col 
	                	className="d-flex flex-column justify-content-between bg-secondary bg-opacity-25 mh-500"
                	>
	                	<div className="rooms-list-wrapper">
	                		<RoomsList 
	                			title={"Public Rooms"} 
	                			rooms={publicRooms} 
	                			currentRoom={currentRoom}
	                			setCurrentRoom={setCurrentRoom}
	                			unreadRoomMessages={unreadRoomMessages}
	                			setUnreadRoomMessages={setUnreadRoomMessages}
	                		/>
	                	</div>

	                	<div className="create-room-wrapper">
		            		<Button 
		            			variant="secondary my-2"
		            			onClick={() => setCreateRoomIsActive(true)}
		            			className="w-100"
		            		>
		            			New Room
		        			</Button>
		        			
	                	</div>
	            	</Col>

	            	<Col xs={7} md={8} className="d-flex flex-column justify-content-between p-0 overflow-auto mh-500">
	                	
	                	<Card.Body className="overflow-auto mh-450 p-2">
	                		{roomMessages.length === 0 &&
	                			<p className="text-center">Start the conversation!</p>
                			}
                			{roomMessagesData?.hasNextPage &&
		                		<Button
		                			variant="outline-secondary"
		                			className="bg-opacity-25 my-2 mx-auto d-flex"
		                			onClick={() => {
		                				setScrollIntoView(false);
		                				roomMessagesData.fetchNextPage()
		                			}}
		                		>
		                			View prev
		                		</Button>
		        			}
	                		{roomMessages.slice(0).reverse().map((messages, index) => {
	                			return (
	                				<ChatMessages 
	                					key={index}
	                					messages={messages}
	                					setEditMessageIsActive={setEditMessageIsActive}
	                					setEditMessage={setEditMessage}
	                				/>        
            			        );
	                		})}  
	                		<div ref={bottomRef} />      		
	                	</Card.Body>
	                	<ChatCardFooter 
	                		user={userData} 
	                		roomId={currentRoom?._id}
	                		setScrollIntoView={setScrollIntoView}
	                		roomMessagesData={roomMessagesData}
	                	/>
	                </Col>
	            </Row>
        	</Container>
        	
        </>
    );
}

export default Chat;