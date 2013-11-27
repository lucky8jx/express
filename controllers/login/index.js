var crypto = require('crypto');
var mongoose = require('mongoose');
var Accounts = mongoose.model('Accounts');

exports.signin = function(req, res) {
	res.render('signin', {
		title: 'Sign In'
	});
};

exports.signout = function(req, res) {
	if (req.param('logout') == 'true') {
		console.log(req);
		res.clearCookie('userName');
		res.clearCookie('password');
		req.session.destroy(function(err) {
			// res.send('ok',200);
			res.redirect('/');
		});
	}	
};

// create a new account
exports.signup = function(req, res) {
	res.render('signup',{
		title: 'Sign up'
	});
};

exports.addNewAccount = function(req, callback) {
	var newData = new Accounts({
			userName: req.param('userName'),
			emailAddress: req.param('email'),
			password: req.param('password')
		});
	Accounts.findOne({userName: newData.userName}, function(e, o) {
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

exports.manualLogin = function(user, password, cb) {
	// console.log(user);	
	Accounts.findOne({userName: user}, function(err, obj) {
		if (obj == null) {
			cb('user-not-found');
		} else {
			validatePassword(password, obj.password, function(err, res) {
				// console.log(obj.password);
				if (res) {
					cb(null, obj);
				} else {
					cb('invalid-password');
				}
			});
			// console.log(obj);
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
}

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
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}