const express = require('express')
const sql = require("mssql")
const cors = require("cors")
const app = express()
const port = 1234
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Server variables
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_TABLE,
    options: {encrypt: true, trustServerCertificate: true}
};

app.get('/api/alumni', cors(), (req, res) => {   
    getAlumni().then((data) => {
        res.json(data)
    })
})

async function getAlumni() {
    try {
        let dbConn = await sql.connect(config)
        // let alumni = await dbConn.request().query("SELECT * FROM alumni")
        let alumni = await dbConn.request().query("SELECT * FROM alumni WHERE Major = 'Computer Science'")
        return alumni.recordset
    }
    catch (err) {
        console.error(err)
    }
}

// Setting up server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})