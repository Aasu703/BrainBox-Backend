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

const app = express();

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

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use('/users', UserRoute);
app.use('/api/materials', MaterialRoute);
app.use('/api/task', TaskRoute);

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});

sequelize.sync({ force: false })
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Error syncing database:', err));

console.log("DB Name:", process.env.DB_NAME);
console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "Not Loaded ❌");
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Loaded ❌");