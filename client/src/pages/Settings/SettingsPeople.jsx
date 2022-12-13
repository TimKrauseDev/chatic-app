import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import roomAPI from 'utils/apis/roomAPI';

const SettingsPeople = () => {
	const [checked, setChecked] = useState([]);
	const publicRooms = useQuery(['publicRooms'], roomAPI.fetchAllRooms);

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

        await Promise.all( checked.map(item => roomAPI.deleteRoomById(item)))
        publicRooms.refetch();
    }


	return (
		<section className="login-selection-wrapper d-flex flex-column align-content-center justify-content-center my-2">
    		<h1 className="text-center">Settings</h1>
    		<p>Select the rooms you would like to delete:</p>
    		{publicRooms.error && <p className="text-center">Please Try again later.</p>}
    		{publicRooms.loading && <p className="text-center">One second please.</p>}
    		{!publicRooms.data?.length && <p className="text-center">No rooms to remove.</p> }
    		{publicRooms.data?.length > 0 && 
	    		<Form className="settings-selection" onSubmit={handleSubmit}>
		    		<div className="mh-440">
		    			{
		    				publicRooms.data.map(room => {
		    					return (
									<InputGroup key={room._id} className="mb-3">
								        <InputGroup.Checkbox value={room._id} onChange={handleCheck}/>
								        <Form.Control value={room.name} readOnly/>
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


        </section>
    );
}

export default SettingsPeople;

