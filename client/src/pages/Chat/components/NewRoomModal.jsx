import { useState, useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import roomAPI from 'utils/apis/roomAPI';
import { SocketContext } from 'utils/context/socket';


const NewRoomModal = (props) => {
    const [roomName, setRoomName] = useState('');
    const [roomNameIsInvalid, setRoomNameIsInvalid] = useState(false);

    const socket = useContext(SocketContext);

    const findFormErrors = () => {
        if( roomName.length < 3 || roomName.length > 13 || !roomName.match(/^[a-z0-9]+$/i) ) {
            setRoomNameIsInvalid(true);
            return true;
        } 

        setRoomNameIsInvalid(false) 
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( findFormErrors() || !event.currentTarget.checkValidity() ) return;

        await roomAPI.createNewRoom(roomName);
        setRoomName('');
        socket.emit('UPDATE_ROOMS')
        props.onHide();
    }


    return (
        <Modal
          {...props}
          aria-labelledby="new-room-modal_title"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="new-room-modal_title">
                  Create New Room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control 
                            required
                            type='text'
                            placeholder="Enter room name..." 
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            maxLength="13"
                            isInvalid={roomNameIsInvalid}
                        />
                        <Form.Text className="text-muted">
                            <small>Room names must contain no spaces, be alphanumeric and have a length between 3 & 13.</small>
                        </Form.Text>
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
          
        </Modal>
  );
}

export default NewRoomModal;