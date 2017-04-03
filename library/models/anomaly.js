
var configuration = require("../conf/configuration.js");
var mongoose = require("mongoose");
var schema = require("./schemas/anomaly.js");
var Model = configuration.logging.connection.model("anomaly", schema);

/**
 * 
 * @class Anomaly
 * @constructor
 * @param {Petition} petition The petition that was being processed and encountered the issue.
 * @param {Object} description Object describing the issue that was encountered.
 * @param {String} [code] Optional indicator for where the issue occurred.
 */
module.exports = function(petition, description, code) {
	var anomaly = new Model();
	anomaly.petition = petition;
	anomaly.error = description;
	anomaly.message = description.message;
	anomaly.stack = description.stack;
	anomaly.occurred = Date.now();
	anomaly.code = code || (configuration.anomaly?configuration.anomaly.generic:"general");
	anomaly.save();
	return anomaly;
};
