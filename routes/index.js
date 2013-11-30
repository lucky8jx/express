
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mapRoute = function(app) {

	var index = require('../controllers');
	var	login = require('../controllers/login');

	app.get('/', function(req, res) {
		if (req.cookies.username === undefined || req.cookies.password === undefined) {
			index.mainHome(req, res);
		} else {
			login.autoLogin(req.cookies.username, req.cookies.password, function(doc) {
				if (doc !== null) {
					req.session.user = doc;
					index.userHome(req, res);
					console.log(doc, 'bbb');
				} else {
					index.mainHome(req, res);
				}
			});
		}
	});
	app.get('/signin', login.signin);
	app.post('/', function(req, res) {
		login.manualLogin(req.param('username'), req.param('password'), function(err, doc) {
			if (!doc) {
				res.send(err, 400);
			} else {
				req.session.user = doc;
				if (req.param('remenber-me') == 'true') {
					res.cookie('username', doc.username, { maxAge: 900000});
					res.cookie('password', doc.password, { maxAge: 900000});
				}
				// res.send(obj, 200);
				if ( req.session.user.flag === false) {
					req.session.user.flag = true;
				}
				index.userHome(req, res);
			}
		});
	});

	app.get('/signup', login.signup);
	app.post('/signup', function(req, res) {
		login.addNewAccount(req, function(err) {
			if (err) {
				res.send(err, 400);
			} else {
				res.send('ok', 200);
			}
		});
	});

	app.get('/signout', login.signout);

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

	// Update passord or username,and delete account

	app.get('/setting', function(req, res) {
		console.log(req.session.user.flag);
		res.render('setting', {
			title: 'Account Setting',
			logflag: req.session.user.flag,
			user: req.session.user
		});
	});
	app.post('/account', login.changePass);

	app.post('/validateUsername', login.validateUsername);
	
};