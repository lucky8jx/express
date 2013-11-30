var crypto = require('crypto');
var mongoose = require('mongoose');
var Accounts = mongoose.model('Accounts');

exports.signin = function(req, res) {
	res.render('signin', {
		title: 'Sign In'
	});
};

exports.signout = function(req, res) {
	// console.log(req);
	res.clearCookie('username');
	res.clearCookie('password');
	req.session.user = null;
	res.redirect('/');
};

// create a new account

exports.signup = function(req, res) {
	res.render('signup',{
		title: 'Sign up'
	});
};

exports.addNewAccount = function(req, callback) {
	var newData = new Accounts({
			username: req.param('username'),
			emailAddress: req.param('email'),
			password: req.param('password'),
			flag: true
		});
	Accounts.findOne({username: newData.username}, function(e, o) {
		if (o) {
			callback('username-taken');
		} else {
			Accounts.findOne({email: newData.emailAddress}, function(e, o) {
				if (o) {
					callback('email-taken');
				} else {
					saltAndHash(newData.password, function(hash) {
						newData.password = hash;
						newData.save(callback);
					});
				}
			});
		}
	});
};

exports.autoLogin = function(user, pass, cb) {
	Accounts.findOne({username: user}, function(err, doc) {
		if (err) {
			throw err;
		} else if (doc) {
			doc.password === pass ? cb(doc) : cb(null);
		} else {
			cb(null);
		}
	});
};

exports.manualLogin = function(user, password, cb) {	
	Accounts.findOne({username: user}, function(err, obj) {
		if (obj === null) {
			cb('user-not-found');
		} else {
			validatePassword(password, obj.password, function(err, res) {
				if (res) {
					cb(null, obj);
				} else {
					cb('invalid-password');
				}
			});
		}
	});
};


/* account lookup methods */

exports.getAllRecords = function(cb) {
	Accounts.find().exec( function(err, res) {
		console.log(res);
		if (err) {
			cb(err);
		} else {
			cb(null, res);
		}
	});
};

exports.deleteAccount = function(id, cb) {
	Accounts.remove({_id: getObjectId(id)}, cb);
};

exports.delAllRecords = function(cb) {
	Accounts.remove({}, cb);
};

exports.changePass = function(req, res) {
	var newPass = req.param('newPassword'),
		oldPass = req.param('oldPassword'),
		currentUser = req.session.user.username;

	Accounts.findOne({username: currentUser}, function(err, doc) {
		if (err) {
			throw err;
		}
		validatePassword(oldPass, doc.password, function(err, flag) {
			if (err) {
				throw err;
			} else if (flag) {
				saltAndHash(newPass, function(hash) {
					doc.password = hash;
					doc.save(function() {
						res.redirect('/setting');
					});
				});
			}
		});
	});
};

/* validations */

exports.validateUsername = function(req, res) {
	var vUsername = req.param('username');
	console.log(vUsername,"aaaa");
	Accounts.findOne({username: vUsername}, function(err, doc) {
		if (err) {
			throw err;
		} else if (doc) {
			res.send("userExist");
		} else {
			res.send("userAvailable");
		}
	});
};

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
};

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
};

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
};