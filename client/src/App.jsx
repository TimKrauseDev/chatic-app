// Styles
import './styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SocketContext, socket } from 'utils/context/socket';

// Pages
import Home from 'pages/Home';
import Chat from 'pages/Chat';
import { Login, LoginNewUser } from 'pages/Login';
import { SettingsRooms, SettingsPeople } from 'pages/Settings';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import ProtectedRoute from 'components/ProtectedRoute';
import { AuthProvider } from 'utils/hooks/useAuth';

// Boostrap Components
import Container from 'react-bootstrap/Container';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});


const App = () => {
    return (
        <div className="app-wrapper d-flex align-items-center justify-content-center">
            <Container className="app p-0">
                <SocketContext.Provider value={socket}>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <AuthProvider>
                                <Header />
                                <Main>
                                    <Routes>
                                        <Route path="/" index element={<Home />} />
                                        <Route path="login">
                                            <Route path="" element={<Login />} /> 
                                            <Route path="new" element={<LoginNewUser />} /> 
                                        </Route>
                                        <Route 
                                            path="chat" 
                                            element={
                                                <ProtectedRoute>
                                                    <Chat />
                                                </ProtectedRoute>
                                            } 
                                        />
                                        <Route path="settings" element={<SettingsRooms />}>
                                            <Route path="rooms" element={<SettingsRooms />} /> 
                                            <Route path="people" element={<SettingsPeople />} /> 
                                        </Route>
                                        <Route path="*" element={<Home />} />
                                    </Routes>
                                </Main>
                                <Footer />
                            </AuthProvider>
                        </BrowserRouter>
                    </QueryClientProvider>
                </SocketContext.Provider>
            </Container>
        </div>
    );
}

export default App;