var db = require('./databaseConfig.js');

var travelListingDB = {
    getTravelListing: function (description, country, callback) {
        //retrieve db connection with assigned setting to mysql server
        var conn = db.getConnection();
        //connect to the mysql db and build this tunnel to mysql db
        conn.connect(function (err) {//canot continue to do db ops
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {//no error
                console.log("Connected!");
                var sql = 'SELECT * FROM travel_listing_table';
                var param = [];
                if (description && country){
                    sql = 'SELECT * FROM travel_listing_table WHERE lower(description) like lower(?) AND lower(country) like lower(?) order by price asc';
                    param = ["%"+description+"%", "%"+country+"%"]
                } 
                else if (description){
                    sql = 'SELECT * FROM travel_listing_table WHERE lower(description) like lower(?) order by price asc';
                    param = ["%"+description+"%"]
                }
                else if (country){
                    sql = 'SELECT * FROM travel_listing_table WHERE lower(country) like lower(?) order by price asc';
                    param = ["%"+country+"%"]
                } 
                console.log(sql, param)
                conn.query(sql, param, function (err, result) {
                    conn.end();//close the connection
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    addTravelListing: function (title,description,price,country,travel_period,image_url, callback) {
        //retrieve db connection with assigned setting to mysql server
        var conn = db.getConnection();
        //connect to the mysql db and build this tunnel to mysql db
        conn.connect(function (err) {//canot continue to do db ops
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {//no error
                console.log("Connected!");
                var sql = 'INSERT INTO travel_listing_table (title, description,price,country,travel_period,image_url, date_inserted) VALUES (?,?,?,?,?,?,now())';
                
                conn.query(sql, [title,description,price,country,travel_period,image_url], function (err, result) {
                    conn.end();//close the connection
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        console.log(result.affectedRows);
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    updateTravelListing: function (travelID,title,description,price,country,travel_period,image_url, callback) {
        //retrieve db connection with assigned setting to mysql server
        var conn = db.getConnection();
        //connect to the mysql db and build this tunnel to mysql db
        conn.connect(function (err) {//canot continue to do db ops
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {//no error
                console.log("Connected!");
                var sql = 'UPDATE travel_listing_table SET title=?,description=?,price=?,country=?,travel_period=?,image_url=? WHERE travelID=?';
                
                conn.query(sql, [title,description,price,country,travel_period,image_url,travelID], function (err, result) {
                    conn.end();//close the connection
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        console.log(result.affectedRows);
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    deleteTravelListing: function (travelID, callback) {
        //retrieve db connection with assigned setting to mysql server
        var conn = db.getConnection();
        //connect to the mysql db and build this tunnel to mysql db
        conn.connect(function (err) {//canot continue to do db ops
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {//no error
                console.log("Connected!");
                var sql = 'DELETE FROM travel_listing_table WHERE travelID=?';
                
                conn.query(sql, [travelID], function (err, result) {
                    conn.end();//close the connection
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } else {
                        console.log(result.affectedRows);
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },
}


module.exports = travelListingDB