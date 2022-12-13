import { createContext } from 'react';
import socketio from 'socket.io-client';

const SOCKET_URL = process.env.NODE_ENV === 'development'   
	? 'http://localhost:3001'
	: 'https://chatic.timkrause.dev/'

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();