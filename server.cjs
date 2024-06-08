const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const errorHandler = require('./errorhandler'); 
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
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
