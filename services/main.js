// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var config = require('./config');
var mysql      = require('mysql');
var url = require('url');
var FB = require('fb');

// global defs
global.dbConfig = {
		host     : config.db.host,
		user     : config.db.user,
		password : config.db.pwd,
		database : config.db.dbname
};

global.GetFBId = function(req,res,callback,opt){
    var queryObject = url.parse(req.url,true).query;
   	var accessToken = queryObject.access_token;
    FB.api('me', {
        access_token:   accessToken
    }, function (result) {
        if(!result || result.error) {
            return res.send(500, 'error');
        }
        return callback(result.id,res,opt);
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//external modules
require('./users')(router);
require('./photos')(router);
require('./comments')(router);
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);