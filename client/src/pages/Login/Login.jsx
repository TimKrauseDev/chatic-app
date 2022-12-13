import { useRef } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useQuery } from '@tanstack/react-query';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import userAPI from 'utils/apis/userAPI';
import { useAuth } from 'utils/hooks/useAuth';

const Login = () => {
	const userRef = useRef(0);
	const { login } = useAuth();
	const { isLoading, isError, data } = useQuery(['usernameList'], userAPI.fetchAllUsers);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if( isLoading || isError) return;

		login(userRef.current.value);
	}

	return (
		<section className="login-selection-wrapper d-flex flex-column align-content-center justify-content-center">
    		<h1 className="text-center mb-5">Login</h1>
    		
    		{data?.length === 0 && <p>Please create a new user</p>}
    		{data?.length > 0 && <p>Please choose your username or create a new user</p>}

    		{data?.length > 0 &&
    			<>
		    		<Form onSubmit={handleSubmit} className="border py-4 px-3 container">
		    			<FloatingLabel 
							label="Select Username"
							className="mb-3"
						>
							<Form.Select ref={userRef} aria-label="Select Username">
								{ isLoading && <option>Loading...</option> }
								{ !isLoading && data.map(user => <option key={user._id} value={user._id}>{user.username}</option>) }
								
						    </Form.Select>
						</FloatingLabel>
						<Button variant="success" type="submit" className="w-100">
					        Select User
				        </Button>
		    		</Form>
		        	<span className="text-center py-2">OR</span>
	        	</>
    		}

        	<LinkContainer to="/login/new">
	        	<Button className="btn-secondary">Create New User</Button>
        	</LinkContainer>
        </section>
    );
}

export default Login;

