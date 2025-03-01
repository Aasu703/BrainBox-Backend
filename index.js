const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./backend/db'); // Import the db object
const UserRoute = require('./routes/UserRoute');
const VirtualRoute = require("./routes/VirtualRoute");
const StudyRoute = require("./routes/StudyRoute");
const ParticipationRoute = require("./routes/ParticipationRoute");
const ChatMessageRoute = require("./routes/ChatMessageRoute");
const MaterialRoute = require("./routes/MaterialRoute");
const TaskRoute = require("./routes/TaskRoute"); // New route
const jwt = require("jsonwebtoken");
const path = require('path');
require("dotenv").config();

// Creating a server
const app = express();

// CORS Middleware (updated for better control)
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Match frontend ports
    credentials: true, // Allow cookies/credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions));

// Other Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// JWT middleware for authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Apply authentication middleware to protected routes
app.use('/api/chat', authenticateToken);
app.use('/api/material', authenticateToken);
app.use('/api/task', authenticateToken); // Protect task routes

// Routes
app.use('/users', UserRoute);
app.use("/api/virtualroom", VirtualRoute);
app.use('/api/material', MaterialRoute);
app.use('/api/Participation', ParticipationRoute);
app.use('/api/study', StudyRoute);
app.use('/api/chat', ChatMessageRoute);
app.use('/api/task', TaskRoute); // Add task route

// Creating a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});

// Connect to the database server
db.sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Error connecting to database:', err));

// Sync models
db.sequelize.sync({ alter: true })
    .then(() => console.log('Models synchronized successfully'))
    .catch((err) => console.error('Error synchronizing models:', err));

// Optional: Log environment variables for debugging
console.log("DB Name:", process.env.DB_NAME);
console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "Not Loaded ❌");
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Loaded ❌");