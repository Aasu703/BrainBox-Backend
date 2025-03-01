const Sequelize = require('sequelize');
require('dotenv').config();

console.log('Sequelize module loaded:', Sequelize);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: 'postgres',
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

console.log('Sequelize instance created:', sequelize);

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Database connection error:', err));

// Dynamically import and initialize models
const db = {}; // Define db in the outer scope
const modelsPath = '../models'; // Correct path to D:\BrainBox-back\models from backend/db.js

try {
    db.User = require(`${modelsPath}/User`)(sequelize, Sequelize.DataTypes);
    db.Material = require(`${modelsPath}/Material`)(sequelize, Sequelize.DataTypes);
    db.ChatMessage = require(`${modelsPath}/ChatMessage`)(sequelize, Sequelize.DataTypes);
    db.Task = require(`${modelsPath}/Task`)(sequelize, Sequelize.DataTypes);
    db.VirtualRoom = require(`${modelsPath}/VirtualRoom`)(sequelize, Sequelize.DataTypes);
    db.Participation = require(`${modelsPath}/Participation`)(sequelize, Sequelize.DataTypes);
    db.StudySession = require(`${modelsPath}/StudySession`)(sequelize, Sequelize.DataTypes);

    console.log('Raw User model import:', require(`${modelsPath}/User`));
    console.log('Initialized User model:', db.User);
    console.log('Raw StudySession model import:', require(`${modelsPath}/StudySession`));
    console.log('Initialized StudySession model:', db.StudySession);
} catch (error) {
    console.error('Error loading models:', error);
    throw error; // Re-throw to stop execution if models fail to load
}

// Set up associations
Object.keys(db).forEach(modelName => {
    if (db[modelName] && db[modelName].associate) {
        db[modelName].associate(db);
    }
});

console.log('Models loaded:', db);

// Sync all models
sequelize.sync({ alter: true })
    .then(() => console.log('Models synchronized successfully'))
    .catch(err => console.error('Model synchronization error:', err));

module.exports = db;