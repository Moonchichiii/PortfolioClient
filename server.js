import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import errorHandler from './errorhandler.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Use compression middleware
app.use(compression());

app.use(cookieParser());

// Enable CORS with options
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests to the Django backend
const apiProxy = createProxyMiddleware('/api', {
    target: process.env.VITE_BASE_URL,
    changeOrigin: true,
    secure: true,
});

app.use('/api', apiProxy);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Use the error handler middleware
app.use(errorHandler);

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});