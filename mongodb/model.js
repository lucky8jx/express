var mongoose = require('mongoose');

var schema = require('./schema');

// model of Accounts
exports.Accounts = mongoose.model('Accounts', schema.Accounts);

