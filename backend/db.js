require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
        logging: false,
    }
);

async function Conn() {
    try {
        await sequelize.authenticate();
        console.log("Database connection successful...");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

Conn();

module.exports = sequelize;
