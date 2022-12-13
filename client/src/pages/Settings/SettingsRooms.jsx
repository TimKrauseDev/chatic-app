import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import RoomSettingsList from './components/RoomSettingsList';
import UserSettingsList from './components/UserSettingsList';

const SettingsRooms = () => {
	const [settingsActive, setSettingsActive] = useState('rooms')

	return (
		<section className="login-selection-wrapper d-flex flex-column align-content-center justify-content-center my-2" style={{minWidth: "300px"}}>
    		<h1 className="text-center">Settings</h1>
    		<div>
	            <Button 
	            	variant="secondary m-2" 
	            	active={settingsActive === 'rooms'}
	            	onClick={() => setSettingsActive('rooms')}
            	>
	                Update Rooms
	            </Button>

	            <Button 
	            	variant="secondary m-2" 
	            	active={settingsActive === 'User'}
	            	onClick={() => setSettingsActive('User')}
            	>
	                Update User
	            </Button>
    		</div>

    		{settingsActive === 'rooms' && <RoomSettingsList />}
    		{settingsActive === 'User' && <UserSettingsList />}


        </section>
    );
}

export default SettingsRooms;

