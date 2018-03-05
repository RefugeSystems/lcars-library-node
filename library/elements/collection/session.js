
var configuration = require("a-configuration");
var schema = require("../schemas/anomaly.js");
var Model = configuration.logging.connection.model("session", schema);

/**
 * Representation of message access request to retrieve information
 * from the library and process any needed session information.
 * @class Session
 * @constructor
 * @param {Object} data
 */
module.exports = function(data) {
	var session = new Model(data);
	return session;
};
