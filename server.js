const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const app = express();

// Use compression middleware
app.use(compression());

app.use(cookieParser());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests to the Django backend
const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:8000','https://your-django-backend-app.herokuapp.com',
    changeOrigin: true,
    secure: true,
    // cookieDomainRewrite: '', 
});

app.use('/api', apiProxy);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
