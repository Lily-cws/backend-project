var mysql = require('mysql');

const dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Pass1234",
            database: "travel_listing_db"
        });     
        return conn;
    }
};
module.exports = dbconnect

