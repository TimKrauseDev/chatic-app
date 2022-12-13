import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import messageAPI from 'utils/apis/messageAPI';

const EditMessageModal = ({show, onHide, editMessage}) => {

    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        if(!editMessage.content) return;
        setMessageContent(editMessage.content);
    }, [editMessage]);

    const handleUpdateMessage = async () => {
        await messageAPI.updateMessageContent(editMessage.id, messageContent);
        // socket emit
        onHide();
    }

    const handleDeleteMessage = async () => {
        await messageAPI.deleteMessage(editMessage.id);
        //socket emit
        onHide();
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                  Update or Delete Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control 
                            type='text'
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                        />
                    </Form.Group>

                    <Button 
                        variant="secondary me-2 my-2"
                        onClick={handleUpdateMessage}
                    >
                        Update
                    </Button>

                    <Button 
                        onClick={handleDeleteMessage}
                        variant="danger me-2 my-2"
                    >
                        Delete
                    </Button>
                </Form>
            </Modal.Body>
          
        </Modal>
  );
}

export default EditMessageModal;