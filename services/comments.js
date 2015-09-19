var mysql      = require('mysql');
var config = require('./config');


function InsertComment(userId,res,data){
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
	var data = {imageId:data.imageId,userId:userId,comment:data.comment};
	connection.query('CALL insert_comments(' + data.imageId + ',\'' + userId + '\',\'' + data.comment + '\')', data, function(err, rows, fields) {
		if (err) throw err;
		var json = JSON.stringify(rows);
		res.end(json);
	});
	connection.end();
}

function GetComments(imageId,res){
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
	var data = {image_id:imageId};
	connection.query('select comment from comments where ?', data, function(err, rows, fields) {
		if (err) throw err;
		var json = JSON.stringify(rows);
		res.end(json);
	});
	connection.end();
}

module.exports = function(router){
	router.post('/comments/:imageId', function(req, res) {
		var imageId = req.params.imageId;
		var comment = req.body.comment;
		GetFBId(req,res,InsertComment,{imageId:imageId,comment:comment});
	}).get('/comments/:imageId', function(req, res) {
		var imageId = req.params.imageId;
		GetComments(imageId,res);
	});
}