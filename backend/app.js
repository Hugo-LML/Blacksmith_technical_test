const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const rateLimit = require('./middleware/rateLimit.middleware');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    credentials: true

};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(helmet());
app.use(rateLimit);

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const spaceRoutes = require('./routes/space.routes');
const jwtidRoutes = require('./routes/jwtid.routes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/space', spaceRoutes);
app.use('/api/jwtid', jwtidRoutes);

module.exports = app;