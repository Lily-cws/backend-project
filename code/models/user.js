var db = require('./databaseConfig.js');
var secretKey = require('../config'); 
var jwt= require('jsonwebtoken');


var adminDB = {


       loginUser: function (email, password, callback) {
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
                        var sql = 'SELECT * FROM admin_table WHERE email = ? AND password = ?';
                        conn.query(sql, [email, password], function (err, result) {
                            conn.end();//close the connection
                            console.log('connection closed');
                            console.log(err);
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } else {
                                //else no error, sql select ran successfully
                                //jwt.sign
                                //need secret key to create this token

                                
                            console.log(result);
                                //if log in successful then result =1
                                if(result.length==1){
                                    //Login succesful, record found
                                    var role=result[0].role;
                                    var name=result[0].name;
                                    var jwtToken=jwt.sign({role:role,name:name}, secretKey, {
                                        expiresIn: 86400 
                                      
                                    });
                                    console.log(jwtToken);
                                    return callback(null, jwtToken);   
                                } else {
                                    console.log("no error and also no result");
                                    return callback(null,null) //no error and also no result
                                }                           
                            } 
  
                        });
                    }
                      });
               }

}

module.exports = adminDB
