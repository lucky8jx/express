
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mapRoute = function(app) {
	var index = require('../controllers');
	app.get('/', index.index);

	var	login = require('../controllers/login');
	app.get('/signin', login.signin);
	app.post('/signin', function(req, res) {
		login.manualLogin(req.param('userName'), req.param('password'), function(err, obj) {
			if (!obj) {
				res.send(err, 400);
			} else {
				req.session.user = obj;
				// console.log(req.session.user);
				if (req.param('remenber-me') == 'true') {
					res.cookie('userName', obj.userName, { maxAge: 900000});
					res.cookie('password', obj.password, { maxAge: 900000});
				}
				// res.send(obj, 200);
				res.render('userhome', {
					title: "User's homepage",
					login: true,
					user: obj
				});
			}
		});
	});

	app.get('/signup', login.signup);
	app.post('/signup', function(req, res) {
		if (req.session.user == null) {
			login.addNewAccount(req, function(err) {
				if (err) {
					res.send(err, 400);
				} else {
					res.send('ok', 200);
				}
			});
		} else if (req.param('logout') == 'true') {
			// console.log(req);
			res.clearCookie('userName', {path: '/'});
			res.clearCookie('password', {path: '/'});
			// req.session.destroy(function(err) {
			// 	// res.send('ok',200);	
				res.redirect('/');
			// });
			// var redirect = function() {
			// 	res.redirect('/');
			// };
			// var destroy = function() {
			// 	req.session.user = null;
			// 	// cb();
			// 	console.log(req.session.user, 'bbbb');
			// };
			// destroy();
			// req.session.user = null;
		}
	});

	app.post('/signout', login.signout);

	// view & delete Accounts //

	app.get('/print', function(req, res) {
		login.getAllRecords( function(err, Accounts) {
			res.render('print', {
				title: 'Accounts List',
				accts: Accounts
			});
		});
	});

	// app.post('/delete', function(req, res) {
	// 	login.deleteAccount(req.body.id, function(err, obj) {
	// 		if (err) {
	// 			res.send('record not found', 400);
	// 		} else {
	// 			res.redirect('/print');
	// 		}
	// 	});
	// });

	app.get('/reset', function(req, res) {
		login.delAllRecords(function() {
			res.redirect('/print');
		});
	});
	
};