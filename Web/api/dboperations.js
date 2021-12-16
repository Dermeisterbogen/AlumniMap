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

function buildQuery(degrees) {
    let majorMinorSplit = degrees.split("&");
    let majors = majorMinorSplit[0];
    let minors = majorMinorSplit[1];
    majors = majors.split('|').filter(n => n);
    minors = minors.split('|').filter(n => n);

    majors = majors.filter(n => n.trim());
    minors = minors.filter(n => n.trim());
    majors = majors.filter(n => n);
    minors = minors.filter(n => n);

    let query = "SELECT * FROM alumni";
    if (majors.length > 0) {
        query += " WHERE Major = ";
        for (let i = 0; i < majors.length; i++) {
            if (majors.length === 1 || i === majors.length - 1) {
                query += "'";
                query += majors[i].trim();
                query += "'";
                break;
            }
            query += "'";
            query += majors[i];
            query += "'";
            query += " OR Major = "
        }
    } 

    if (minors.length > 0) {
        if (query.includes('Major')) {
            query += " OR Minor = ";
        } else {
            query += " WHERE Minor = ";
        }
        for (let i = 0; i < minors.length; i++) {
            if (minors.length === 1 || i === minors.length - 1) {
                query += "'";
                query += minors[i].trim();
                query += "'";
                break;
            }
            query += "'";
            query += minors[i];
            query += "'";
            query += " OR Minor = "
        }
    } 
    
    return query;
}

module.exports = {
    getAllAlumni: getAllAlumni,
    getAlumniMajors: getAlumniMajors
}
