// ROUTES/ENDPOINTS FOR THE API TO BE CALLED 

// Import the modules from the dboperations file
const db = require('./dboperations');
let { getAllAlumni, getAlumniMajors } = require('./dboperations');

const express = require('express');
const cors = require("cors");
const app = express();
const port = 4321;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Routes //

// get ALL alumni
app.get('/api/alumni', (req, res) => {
    try {
        getAllAlumni().then((data) => {
            res.json(data);
        });
    } catch (err) {
        console.error(err.message);
    }
});

// get alumni by majors
app.get('/api/alumni/:majors', (req, res) => {
    try {
        getAlumniMajors().then((data) => {
            res.json(data);
        })
    } catch (err) {
        console.error(err.message);
    }
});

// Setting up server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})
