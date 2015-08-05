// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var config = require('./config');
var mysql      = require('mysql');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
	var connection = mysql.createConnection({
	  host     : config.db.host,
	  user     : config.db.user,
	  password : config.db.pwd
	});

	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	  if (err) throw err;
	  console.log('The solution is: ', rows[0].solution);
	});

	connection.end();
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

//external modules
require('./users')(router);
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);