import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import userAPI from 'utils/apis/userAPI';
import { useAuth } from 'utils/hooks/useAuth';
import { SocketContext } from 'utils/context/socket';

const UserSettingsList = () => {
	const { user, logout } = useAuth();
	const [checked, setChecked] = useState([]);
	const usersList = useQuery(['peoplelist'], userAPI.fetchAllUsers);

	const socket = useContext(SocketContext);

	const handleCheck = (event) => {
	    var updatedList = [...checked];
			if (event.target.checked) {
		    	updatedList = [...checked, event.target.value];
			} else {
		    	updatedList.splice(checked.indexOf(event.target.value), 1);
			}
		  	setChecked(updatedList);
		};

	const handleSubmit = async (event) => {
        event.preventDefault();

        if(checked.includes(user)) logout();

        await Promise.all( checked.map(item => userAPI.deleteUserById(item)))
        usersList.refetch();
		socket.emit('UPDATE_USERS', checked);
    }


	return (
		<>
			<p>Select the people you would like to delete:</p>
    		{usersList.error && <p className="text-center">Please Try again later.</p>}
    		{usersList.loading && <p className="text-center">One second please.</p>}
    		{!usersList.data?.length && <p className="text-center">No users to remove.</p> }
    		{usersList.data?.length > 0 && 
	    		<Form className="settings-selection" onSubmit={handleSubmit}>
		    		<div className="mh-440">
		    			{
		    				usersList.data.map(user => {
		    					return (
									<InputGroup key={user._id} className="mb-3">
								        <InputGroup.Checkbox value={user._id} onChange={handleCheck}/>
								        <Form.Control value={user.username} readOnly/>
								    </InputGroup>

    					        );
		    				})
		    			}
		    		</div>



                    <Button variant="danger my-2" type="submit">
                        Delete
                    </Button>
	    		</Form>
    		}
		</>
    );

}

export default UserSettingsList;