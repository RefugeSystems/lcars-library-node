
var configuration = require("../conf/configration.js");

/**
 * Tracks a connection from a client, considered a terminal herein,
 * where library material are displayed.
 * @class Terminal
 * @constructor
 * @param {Socket} socket
 * @param {Session} session
 */
module.exports = function(socket, session) {
	
	
	this.io = socket;
	
	
	this.permissions = function(condition) {
		
	};
};
