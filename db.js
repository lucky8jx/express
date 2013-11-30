var mongoose = require('mongoose');
var Schema = mongoose.Schema;	
var Accounts = new Schema({
	username: String,
	emailAddress: String,
	password: String,
	flag: Boolean
});
var Accounts = mongoose.model("Accounts", Accounts);

mongoose.connect('mongodb://localhost/rainbow');