var mysql      = require('mysql');
var config = require('./config');

function GetPhotos(userId,res){
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
	var data = {owner:userId};
	connection.query('SELECT * FROM images WHERE ? and active = 1 order by timestamp desc', data, function(err, rows, fields) {
		if (err) throw err;
		var json = JSON.stringify(rows);
		res.end(json);
	});
	connection.end();
}

function GetPhoto(photoId,res){
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
	var data = {id:photoId};
	connection.query('SELECT * FROM images WHERE ? and active = 1 order by timestamp desc', data, function(err, rows, fields) {
		if (err) throw err;
		var json = JSON.stringify(rows);
		res.end(json);
	});
	connection.end();
}

function DeletePhoto(userId,res,photoId){
	console.info("deleting " + userId + " " + photoId);
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
	var data = [{id:photoId},{owner:userId}];
	connection.query('DELETE FROM images WHERE ? and ? and active = 1 order by timestamp desc', data, function(err, rows, fields) {
		if (err) throw err;
		res.end("success");
	});
	connection.end();
}

module.exports = function(router){
	router.get('/photos/:entity/:id', function(req, res) {
		var entity = req.params.entity;
		var id = req.params.id;
		switch(entity){
			case "user":			
				if(id != "me")
					GetPhotos(id,res);
				else
					GetFBId(req,res,GetPhotos);
				break;
			case "photo":
				GetPhoto(id,res)
				break;
			default:
				res.send(400, 'Invalid entity');
				break;
		}
	})
	.delete('/photos/:id', function(req, res) {
		var id = req.params.id;
		GetFBId(req,res,DeletePhoto,id);
	});
}