const express = require("express");
const cors = require("cors"); // Single declaration of cors
const bodyParser = require('body-parser');
const sequelize = require('./backend/db'); // Fixed typo
const UserRoute = require('./routes/UserRoute'); // Correct import
const VirtualRoute = require("./routes/VirtualRoute");
const StudySession = require("./routes/StudyRoute"); // Correct
const Participation = require("./routes/ParticipationRoute"); // Correct import
const ChatMessage = require("./routes/ChatMessageRoute"); // Correct
const Material = require("./routes/MaterialRoute"); // Correct
const jwt = require("jsonwebtoken"); // For middleware
require("dotenv").config(); // Load environment variables

// Creating a server
const app = express();

// JWT middleware for authentication (optional, for protected routes)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// CORS Middleware (configure to allow multiple origins for development)
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both ports for development
    credentials: true, // Allow cookies, authorization headers, etc.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow common HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
}));

// Other Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply authentication middleware to protected routes (e.g., chat)
app.use('/api/chat', authenticateToken); // Protect chat routes

// Routes
app.use('/users', UserRoute);
app.use("/api/virtualroom", VirtualRoute);
app.use('/api/material', Material);
app.use('/api/Participation', Participation);
app.use('/api/study', StudySession);
app.use('/api/chat', ChatMessage);

// Creating a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});

// Connect to the database server
sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Error connecting to database:', err));

// Optional: Log environment variables for debugging
console.log("DB Name:", process.env.DB_NAME);
console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "Not Loaded ❌");
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Loaded ❌");