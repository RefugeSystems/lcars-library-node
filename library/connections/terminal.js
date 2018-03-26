
/**
 * 
 * @class Terminal
 * @constructor
 * @param {WebSocket} connection
 * @param {Library} library
 */
module.exports = function(connection, library) {
	this.last = Date.now();
	this.session = null;
	this.active = true;

	connection.on("message", function(message) {
		console.log("Message: ", message);
	});
	
	connection.on("close", function() {
		console.log("Close Connection");
	});
};
