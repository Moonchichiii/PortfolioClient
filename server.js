import express from 'express';
import http from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Proxy WebSocket requests to the Django backend
const wsProxy = createProxyMiddleware('/ws', {
    target: process.env.VITE_BASE_URL,
    ws: true,
    changeOrigin: true,
    secure: true,
});

app.use('/ws', wsProxy);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

