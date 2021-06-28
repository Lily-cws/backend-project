var jwt = require('jsonwebtoken');
var secretKey= require('../config.js');  //secret key

// function verifyToken(req,res,next){
//     //crete middleware function
//     console.log(req.headers);

//     var token = req.headers['authorization'];
//     //retrive authorization header's content
//     console.log(token);

//     if(!token||!tokenincludes('Bearer')){
//         //process the token
//         res.status(403);

//         jwt.verify(token,secretKey,function(err,decoded){
//             //verify token
//             if(err){
//                 res.status(403);
//                     return res.end({auth:false, message:'Not authorized!'});

//             }else {
//                 //decode the userid and store in req for use
//                 req.userid=decoded.userid; 
//                 //decode the role and store in req for use
//                 req.role=decoded.role; 
//                 next();
//             }
//         });
            
        
//     }
// }

var middlewareAuth = {

    //middleware
    //verify that token is admin role
    verifyAdminToken: function(req, res, next){
        var token=req.headers['authorization'];
        console.log(token);
        
        //extract out the jwt token
        if(token && token.includes('Bearer')){
            token = token.substr(7); //extract starting from 7th character
            console.log(token);
        
            //check whether the token is valid (Signature)
            jwt.verify(token, secretKey,function(err,decoded){
                if(err){ //token is invalid
                    res.type('json');
                    res.status(403).send("Unauthorized.");
                } else {//success decoded and signature verified
                    console.log("decoded.role",decoded.role);
                    if(decoded.role === 'Admin') {
                        next();
                    } else {
                        //token is valid but role is not admin
                        res.type('json');
                        res.status(403).send("Unauthorized. Please check with Admin");
                    }
                }
            });
            
            // console.log(token);
        }else {
            res.type('json');
            res.status(403).send("Unauthorized.");
        }
        
        //extract out the payload info if signature is valid , else reject

        //check user access rights from the payload, 

        //if payload load is ok , then we call next()

        //else we return a response to tell you are not authorized
    },
    
    //middleware
    //verify that token is admin or user role
    verifyToken: function(req, res, next){
        var token=req.headers['authorization'];
        console.log(token);
        
        //extract out the jwt token
        if(token && token.includes('Bearer')){
            token = token.substr(7); //extract starting from 7th character
            console.log(token);
        
            //check whether the token is valid (Signature)
            jwt.verify(token, secretKey,function(err,decoded){
                if(err){ //token is invalid
                    res.type('json');
                    res.status(403).send("Unauthorized.");
                } else {//success decoded and signature verified
                    console.log("decoded.role",decoded.role);
                    if(decoded.role === 'Admin' || decoded.role === 'user') {
                        next();
                    } else {
                        //token is valid but role is not admin
                        res.type('json');
                        res.status(403).send("Unauthorized. Please check with Admin");
                    }
                }
            });
            
            // console.log(token);
        }else {
            res.type('json');
            res.status(403).send("Unauthorized.");
        }
    }
                 
}

module.exports= middlewareAuth