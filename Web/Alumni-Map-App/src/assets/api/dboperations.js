// DATABASE OPERATIONS -> OUR FUNCTIONS THAT DO THE REQUESTS SO FRONT-END JUST
//                        HAS TO CALL THESE INSTEAD OF RAW SQL QUERIES

const config = require('./db');
const sql = require('mssql');

// Get all alumni
async function getAllAlumni() {
    try {
        let pool = await sql.connect(config);
        let alumni = await pool.request().query("SELECT * FROM alumni");
        return alumni.recordset;
    } catch (err) {
        console.error(err.message);
    }
}

// Get alumni based on checkboxes
async function getAlumniMajors(options) {
    try {
        let pool = await sql.connect(config);
        let query = buildQuery(options);
        let alumni = await pool.request().query(query)
        return alumni.recordset;
    } catch (err) {
        console.error(err.message);
    }
}

function buildQuery(options) {
    let query = "SELECT * FROM alumni WHERE Major = ";
    for (let i = 0; i < options.length; i++) {
        if (options.length === 1 || i === options.length - 1) {
            query += "'";
            query += options[i];
            query += "'";
            return query;
        }
        query += "'";
        query += options[i];
        query += "'";
        query += " OR Major = "
    }
    console.log(query);
    return query;
}

module.exports = {
    getAllAlumni: getAllAlumni,
    getAlumniMajors: getAlumniMajors
}