import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import SVG from 'react-inlinesvg';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import AvatarBlank from 'images/svgs/AvatarBlank';

import avatarAPI from 'utils/apis/avatarAPI';
import userAPI from 'utils/apis/userAPI';
import { useAuth } from 'utils/hooks/useAuth';

const AVATAR_COUNT = 5;
const CHOICES = ['One', 'Two', 'Three', 'Four', 'Five'];

const handleRenderAvatars = (randomAvatarsList, setChoice) => {
	if(randomAvatarsList.isError) return <Col><p>Too many attempts. Lets wait a <strong>minute</strong>.</p></Col>

	if (randomAvatarsList.isLoading) {
		return CHOICES.map(( choice, index ) => {
			return (
			    <Col key={index}>
		     		<figure onClick={() => setChoice(index)} style={{cursor:"pointer"}}>
						<AvatarBlank />
		     			<figcaption className="text-center">{choice}</figcaption>
		     		</figure>					
				</Col>
			);
		});
	}

	//isData
	return randomAvatarsList.data.map(( avatarSvg, index ) => {
		return (
		    <Col key={index}>
	     		<figure onClick={() => setChoice(index)} style={{cursor:"pointer"}}>
					<SVG src={avatarSvg} />
	     			<figcaption className="text-center">{CHOICES[index]}</figcaption>
	     		</figure>					
			</Col>
		);
	});
}


const LoginNewUser = () => {
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
	const [choice, setChoice] = useState(0);

	const randomAvatarsList = useQuery(['avatarList'], () => avatarAPI.fetchAvatars(AVATAR_COUNT), { retry: false });

	const findFormErrors = () => {
		if( username.length < 3 || username.length > 13 || !username.match(/^[a-z0-9]+$/i) ) {
			setUsernameIsInvalid(true);
			return true;
		} 

		setUsernameIsInvalid(false);
	}

	const handleSubmit = async (event) => {
    	event.preventDefault();
    	if ( findFormErrors() || !event.currentTarget.checkValidity() ) return;

    	const response = await userAPI.createNewUser(username, randomAvatarsList.data[choice]);
    	login(response._id);
  	};

	return (
		<Container className="login-new-user-wrapper py-2">
			<h1 className="text-center mb-5">Create New User</h1>
			<Form
				onSubmit={handleSubmit}
				className="border py-4 px-3 container mw-385"
			>
			    <FloatingLabel label="Username" className="mb-3">
					<Form.Control 
						required 
						type="text" 
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)} 
						maxLength="13"
						isInvalid={usernameIsInvalid}
					/>
		            <Form.Control.Feedback type="invalid">
		            	Please use alphanumeric and have a length of at least 3.
	            	</Form.Control.Feedback>
			    </FloatingLabel>
				<FloatingLabel label="Which avatar would you like to use?" className="mb-3" >
						<Form.Select aria-label="Select avatar" value={choice} onChange={(e) => setChoice(e.target.value)}>
							{ CHOICES.map(( (choice, index) => <option value={index}  key={choice}>{choice}</option>)) }
					    </Form.Select>
				</FloatingLabel>
		      	<Button variant="success" type="submit">
			        Submit
			    </Button>
			</Form>
			<Row className="avatar-wrapper justify-content-center align-items-center my-4 mw-385">
				{ handleRenderAvatars(randomAvatarsList, setChoice) }
			</Row>
		</Container>
    );
}

export default LoginNewUser;