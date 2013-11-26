
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

	// create account
	app.get(prefix + 'signup', prefixObj.signup);
	app.post(prefix + 'signup', function(req, res) {
		prefixObj.addNewAccount(req, function(e) {
			if (e) {
				res.send(e, 400);
			} else {
				res.send('ok', 200);
			}
		});
	});
}