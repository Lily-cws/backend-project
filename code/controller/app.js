var express = require('express');
var app = express();
var user = require('../models/user.js');
var travellisting = require('../models/travellisting.js');
var itinerary = require('../models/itinerary.js');
var bodyParser = require('body-parser'); //Usage of body-parser to parse HTTP POST data
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded;attach body-parser middleware
var middlewareAuth = require('../auth/verifyToken.js'); //apply verifyToken middleware
var cors = require('cors');
app.options('*', cors()); 
app.use(cors());


//handle log in for Assignment 2
//1. POST end point
app.post('/api/login', function(req,res){
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, result) {
        res.type("json");
        if(err){
            res.status(500).send("Some error");
        } else if(result == null){
            //login credential wrong!
            res.status(200).send("Invalid Login, wrong credential!");
        } else {
            res.status(200).send("Token:  " + result);
        }
    });

});

//handle log in for Assignment 2
//2. Only Registered User(admins) can access this webservices to insert new record
// app.post('/api/user/insert', middlewareAuth.verifyToken, function(req,res){
//     console.log(req.body)
//     var name=req.body.name
//     var email = req.body.email;
//     var password = req.body.password;
//     var role=req.body.role;

//     user.insertUser(name,email, password,role, function (err, result) {
//        console.log('666');
//         res.type("json");
//         if(err){
//             res.status(500).send("Some error");
//         } else if(result == null){
//             //login credential wrong!
//             res.status(200).send("Invalid Login, wrong credential!");
//         } else {
//             res.status(200).send("Token:  " + result);
//         }
//     });

// });



//verify user and passworf from assignment 1
// app.post('/api/admin/login', function (req, res) {
//     console.log(req.body)
//     var email = req.body.email;
//     var password = req.body.password;

//     user.login(email, password, function (err, result) {
//         if (!err) {
//             console.log(result)
//             if(result.length === 1) {
//                 res.send("Valid login");
//             } else {
//                 res.send("Invalid login");
//             }
//         }else{
//             res.status(500).send("Some error");
//         }
//     });

// });

app.post('/api/travellisting/add', middlewareAuth.verifyAdminToken, function (req, res) {
    console.log(req.body)
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var country = req.body.country;
    var travel_period = req.body.travel_period;
    var image_url = req.body.image_url;


    travellisting.addTravelListing(title, description,price,country,travel_period,image_url, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result + ' record inserted');
        } else{
            res.status(500).send("Some error");
        }
    });
});

app.post('/api/itinerary/add', middlewareAuth.verifyAdminToken, function (req, res) {
    console.log(req.body)
    var day = req.body.day;
    var activity = req.body.activity;
    var travelID = req.body.travelID;
 
    itinerary.addItinerary(day,activity,travelID, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result + ' record inserted');
        } else{
            res.status(500).send("Some error");
        }
    });
});

app.get('/api/travellisting', middlewareAuth.verifyToken, function (req, res) {
    var description = req.query.description;
    var country = req.query.country;

    console.log(description, country)
    travellisting.getTravelListing(description, country, function (err, result) {
        if (!err) {
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });

});


app.get('/api/itinerary/:travelID', function (req, res) {
    var id = req.params.travelID;

    itinerary.getItinerary(id, function (err, result) {
        if (!err) {
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });

});

app.put('/api/travellisting/update/:travelID', middlewareAuth.verifyAdminToken, function (req, res) {
    var travelID = req.params.travelID;
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var country = req.body.country;
    var travel_period = req.body.travel_period;
    var image_url = req.body.image_url;


    travellisting.updateTravelListing(travelID, title, description,price,country,travel_period,image_url, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result + ' record updated');
        } else{
            res.status(500).send("Some error");
        }
    });

});

app.put('/api/itinerary/update/:itineraryId', middlewareAuth.verifyAdminToken, function (req, res) {
    var itineraryId = req.params.itineraryId;
    var day = req.body.day;
    var activity = req.body.activity;
    var travelID = req.body.travelID;

    itinerary.updateItinerary(itineraryId, day, activity, travelID, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result + ' record updated');
        } else{
            res.status(500).send("Some error");
        }
    });

});

app.delete('/api/travellisting/delete/:travelID', middlewareAuth.verifyAdminToken, function (req, res) {
    var travelID = req.params.travelID;

    itinerary.deleteItineraryByTravelId(travelID, function (err, result) {
        if (!err) {
            travellisting.deleteTravelListing(travelID, function (err, result) {
                if (!err) {
                    console.log(result);
                    res.send('Record deleted');
                } else{
                    res.status(500).send("Some error");
                }
            });
        } else{
            res.status(500).send("Some error");
        }
    });
    
});

app.delete('/api/itinerary/delete/:itineraryId', middlewareAuth.verifyAdminToken, function (req, res) {
    var itineraryId = req.params.itineraryId;

    itinerary.deleteItineraryByItineraryId(itineraryId, function (err, result) {
        if (!err) {
            console.log(result);
            res.send('Record deleted');
        } else{
            res.status(500).send("Some error");
        }
    });
    

});

module.exports = app
