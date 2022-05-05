const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const rateLimit = require('./middleware/rateLimit.middleware');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const spaceRoutes = require('./routes/space.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(rateLimit);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/space', spaceRoutes);

module.exports = app;