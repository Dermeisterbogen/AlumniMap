// SERVER CONFIG USED TO CONNECT TO DB

require('dotenv').config();

// Server variables
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_TABLE,
    options: { 
        encrypt: true, 
        trustServerCertificate: true
    },
};

module.exports = config;