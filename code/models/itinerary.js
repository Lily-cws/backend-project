var db = require('./databaseConfig.js');

var itineraryDB = {
    getItinerary: function (travelID, callback) {
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
                var sql = 'SELECT * FROM itinerary_table WHERE travelID = ?';
                conn.query(sql, [travelID], function (err, result) {
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
    
    addItinerary: function (day,activity,travelID, callback) {
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
                var sql = 'INSERT INTO itinerary_table (day, activity,travelID) VALUES (?,?,?)';
                
                conn.query(sql, [day,activity,travelID], function (err, result) {
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

    updateItinerary: function (itenaryId,day,activity,travelID, callback) {
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
                var sql = 'UPDATE itinerary_table SET day=?,activity=?,travelID=? WHERE itineraryId=?';
                
                conn.query(sql, [day,activity,travelID, itenaryId], function (err, result) {
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

    deleteItineraryByTravelId: function (travelID, callback) {
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
                var sql = 'DELETE FROM itinerary_table WHERE travelId=?';
                
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
    deleteItineraryByItineraryId: function (itineraryId, callback) {
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
                var sql = 'DELETE FROM itinerary_table WHERE itineraryId=?';
                
                conn.query(sql, [itineraryId], function (err, result) {
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

module.exports = itineraryDB