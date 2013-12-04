var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema of Accounts
exports.Accounts = new Schema({
	username: String,
	emailAddress: String,
	password: String,
	flag: Boolean
});
