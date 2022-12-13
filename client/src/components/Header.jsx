import { LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { useAuth } from 'utils/hooks/useAuth';

const Header = () => {
    const { user } = useAuth();

	return (                
        <header>
            <Navbar collapseOnSelect bg="success" variant="dark" expand='sm' className="px-2 rounded-top">
              <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>Chatic</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='resopnsive-navbar-nav' />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="flex-grow-1 pe-3">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        {user &&
                            <LinkContainer to="/chat">
                                <Nav.Link>Chat</Nav.Link>
                            </LinkContainer>
                        }
                        <LinkContainer to="/settings">
                            <Nav.Link>Settings</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    
                </Navbar.Collapse>
              </Container>
            </Navbar>

        </header>
    );
};

export default Header;