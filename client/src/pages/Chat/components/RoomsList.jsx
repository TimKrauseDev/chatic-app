import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const RoomsList = ({ title, rooms, currentRoom, setCurrentRoom, unreadRoomMessages, setUnreadRoomMessages }) => {

	const handleCurrentRoomChange = (room) => {
		let unreadRoomMessagesRemoved = { ...unreadRoomMessages };
		delete unreadRoomMessagesRemoved[room?._id];
		setUnreadRoomMessages( prev => ({ ...unreadRoomMessagesRemoved }))

		setCurrentRoom(room);
	}

	return (
		<div>
        	<div className="border-bottom border-3 border-dark">
            	<h2 className="fs-5 my-2">{ title }</h2>
        	</div>
        	<div className="my-2">
			    <ListGroup variant="flush">
			    {rooms.isLoading
			        ? 'Loading...'
			        : rooms.isError
			        ? 'Error!'
			        : rooms.data
			        ? rooms.data.map(room => <ListGroup.Item 
			                         			action 
			                         			active={currentRoom?._id === room?._id}
			                         			variant="success" 
			                         			key={room._id}
			                         			onClick={() => handleCurrentRoomChange(room)}
			                         			className="d-flex justify-content-between"
			                         		  >
				                         		  {room.name}
				                         		  {unreadRoomMessages[room?._id] &&
				                         		  <Badge bg="secondary">{unreadRoomMessages[room?._id]}</Badge>

				                         		  }
			                         		  </ListGroup.Item>)
			        : null}
			    </ListGroup>
        	</div>
		</div>
	);
}

export default RoomsList;