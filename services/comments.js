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

function DeleteComment(userId,res,data){
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
	var data = [{id:data.commentId},{owner:userId}];
	connection.query('update comments set active = 0 where ? and ?', data, function(err, rows, fields) {
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
	connection.query('select id, owner, comment from comments where ? and active = 1 order by timestamp desc', data, function(err, rows, fields) {
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
	}).delete('/comments/:commentId', function(req, res) {
		var commentId = req.params.commentId;
		GetFBId(req,res,DeleteComment,{commentId:commentId});
	});
}