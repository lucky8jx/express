
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mapRoute = function(app, prefix) {
	prefix = '/' + prefix;

	var prefixObj = require('../controllers' + prefix);

	// index
	app.get(prefix, prefixObj.index);
}