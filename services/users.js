var url = require('url');
var FB = require('fb');

module.exports = function(router){
	router.get('/users/:id/:action', function(req, res) {
	    //res.json({ message: 'hooray! i am user ' + req.params.id });
	    var queryObject = url.parse(req.url,true).query;
	   	var accessToken = queryObject.access_token;
	    FB.api('me', {
	        access_token:   accessToken
	    }, function (result) {
	        if(!result || result.error) {
	            return res.send(500, 'error');
	        }
	        console.info(result);
	    });
	});
}