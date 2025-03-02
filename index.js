const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const sequelize = require('./backend/db');
const UserRoute = require('./routes/UserRoute');



const path = require("path");
const MaterialRoute = require("./routes/MaterialRoute");
const TaskRoute = require("./routes/TaskRoute");
const jwt = require("jsonwebtoken");
const multer = require('multer');
require("dotenv").config();

// Creating a server
const app = express();

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

// CORS Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Other Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Apply authentication middleware to protected routes


app.use('/api/materials', MaterialRoute);
app.use('/api/task', TaskRoute);

// Routes
app.use('/users', UserRoute);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Creating a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});

// Connect to the database server
sequelize.sync({ force: false }) // Set to true to drop and recreate tables (for testing)
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Error syncing database:', err));

// Optional: Log environment variables for debugging
console.log("DB Name:", process.env.DB_NAME);
console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "Not Loaded ❌");
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Loaded ❌");