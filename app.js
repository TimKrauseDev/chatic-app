import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import userRouter from './routes/user.js';
import roomRouter from './routes/room.js'
import messageRouter from './routes/message.js';

const app = express();

// // Middleware
app.use(cors());
app.use(express.json());

// // Set Routes
app.use("/api/user", userRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname ,'client/build')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

export default app;