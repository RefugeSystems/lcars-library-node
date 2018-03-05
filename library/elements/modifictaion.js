var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * 
 * @class Modification
 * @module Elements
 * @constructor
 * @param {Object} session
 * @param {String} origin ID of the element from which the event occurred. 
 * @param {Object} description
 */
module.exports = function(session, origin, description) {
	var model = new Model(description);
	model.id = random.eventID();
	model.occurred = Date.now();
	model.session = session.id;
	model.origin = origin;
	return model;
};

var Model = configuration.connection.model("modification", new Schema({
	
	"occurred": Number,
	
	"session": String,
	
	"type": String,
	
	"previous": String,
	
	"resultant": String
}));
