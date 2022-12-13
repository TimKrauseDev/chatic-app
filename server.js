import http from 'http';
import { Server } from 'socket.io';
import "./config/mongo.js";

import app from './app.js';

const PORT = process.env.PORT || '3001';
app.set("port", PORT);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let connectedSockets = new Map();


io.on("connection", (socket) => {
  console.log('socket id', socket.id);
  connectedSockets.set(socket.id, '');
  console.log('connect', connectedSockets);

  // Disconnect
  socket.on("disconnect", () => {
    connectedSockets.delete(socket.id);
    console.log('disconnected: ', socket.id);
    console.log('connectedSockets', connectedSockets);
  });

  // Join Room
  socket.on('JOIN_ROOM', (roomId) => {
    const connectedRoomId = connectedSockets.get(socket.id);
    if(connectedRoomId) socket.leave(connectedRoomId);
    socket.join(roomId);
    connectedSockets.set(socket.id, roomId);
    console.log(socket.id, 'joined room', roomId)
  });


  // Send Message
  socket.on('POST_MESSAGE', ( data ) => {
    socket.to(data.data.roomId).emit('GET_MESSAGE', data);
    socket.broadcast.emit('GET_MESSAGE_EVERYWHERE', { roomId: data.data.roomId } )
  });

  // Rooms Updated
  socket.on('UPDATE_ROOMS', () => {
    socket.broadcast.emit('GET_NEW_ROOMS');
  })

  // Users Updated 
  socket.on('UPDATE_USERS', ( data ) => {
    socket.broadcast.emit('GET_NEW_USERS', data);
  })

});

server.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
})