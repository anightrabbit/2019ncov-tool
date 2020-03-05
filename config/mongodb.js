var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// 测试账户:test,test123456,read-only
// mongodb://<dbuser>:<dbpassword>@ds125126.mlab.com:25126/2019ncov
var DB_user = encodeURIComponent('test');
var DB_password = encodeURIComponent('test123456');
var DB_url = `mongodb://${DB_user}:${DB_password}@ds125126.mlab.com:25126/2019ncov`;
var options = {
	useNewUrlParser: true,
	autoIndex: false, // Don't build indexes
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4, // Use IPv4, skip trying IPv6
	useUnifiedTopology: true
}
mongoose.connect(DB_url, options);
var db = mongoose.connection;
db.on('connected', function() {
	console.log('Successfully,Mongoose connection open to ' + DB_url);
});
db.on('error', function(err) {
	console.log('fail,Mongoose connection error: ' + err);
});
db.on('disconnected', function() {
	console.log('Mongoose connection disconnected');
});