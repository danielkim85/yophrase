module.exports = function(router){
	router.get('/users/:id', function(req, res) {
	    res.json({ message: 'hooray! i am user' + req.params.id });
	});
}