var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");
var Model;

/**
 * 
 * @class Modification
 * @module Elements
 * @constructor
 * @param {Object} session
 * @param {String} origin ID of the element from which the event occurred. 
 * @param {Object} description
 */
module.exports = function(session, previous, resultant) {
	if(!Model) {
		throw new Error("Model not ready");
	}

	var model = new Model();
	model.occurred = Date.now();
	model.session = session.id;
	model.previous = previous;
	model.resultant = resultant;
	return model;
};

var Model = module.exports.model = configuration.connection.model("Modification", new Schema({

	"occurred": Number,

	"session": String,

	"previous": String,

	"resultant": String
}));
