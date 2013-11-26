var mongoose = require('mongoose');
var Schema = mongoose.Schema;	
var Accounts = new Schema({
	userName: String,
	emailAddress: String,
	password: String
});
var Accounts = mongoose.model("Accounts", Accounts);

mongoose.connect('mongodb://localhost/rainbow');

exports.index = function(req, res) {
	res.render('index', {
		title: 'Rainbow',
		items: {
			item1: {
				link: '#',
				source: '/images/shadow.png',
				alter: 'shadow'
			},
			item2: {
				link: '#',
				source: '/images/shadow.png',
				alter: 'shadow'
			},
			item3: {
				link: '#',
				source: '/images/shadow.png',
				alter: 'shadow'
			} 
		}
	});
};

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
					newData.save(callback);
				}
			});
		}
	})
}