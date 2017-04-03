
var configuration = require("../conf/configuration.js");
var mongoose = require("mongoose");
var schema = require("./schemas/petition.js");
var Model = configuration.logging.connection.model("petition", schema);

/**
 * Representation of message access request to retrieve information
 * from the library and process any needed session information.
 * @class Petition
 * @constructor
 */
module.exports = function(data) {
	var petition = new Model(data);
	petition.received = Date.now();
	petition.save();
	return petition;
};
