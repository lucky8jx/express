var mongoose = require('mongoose');
var Schema = mongoose.Schema;	
var Accounts = new Schema({
	userName: String,
	emailAddress: String,
	password: String
});
var Accounts = mongoose.model("Accounts", Accounts);

mongoose.connect('mongodb://localhost/rainbow');