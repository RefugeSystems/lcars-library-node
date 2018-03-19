var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * 
 * @class Exception
 * @module Connections
 * @constructor
 * @param {Object} session
 * @param {String} origin ID of the element from which the event occurred. 
 * @param {Object} description
 */
module.exports = function(session, description) {
	var model = new Model(description);
	model.id = random.exceptionID();
	model.occurred = Date.now();
	model.sessionID = session.id;
	return model;
};

var Model = this.model = configuration.connection.model("exception", new Schema({
	/**
	 * 
	 * @property id
	 * @type String
	 */
	"id": String,

	/**
	 * Serves as a general descriptor for the exception.
	 * @property code
	 * @type String
	 */
	"code": String,

	/**
	 * 
	 * @property session
	 * @type String
	 */
	"session": String,

	/**
	 * 
	 * @property request
	 * @type String
	 */
	"request": String,

	/**
	 * 
	 * @property error
	 * @type Object
	 */
	"error": Schema.Types.Mixed,

	/**
	 *  
	 * @property message
	 * @type String
	 */
	"message": String,

	/**
	 * When the exception occurred.
	 * @property occurred
	 * @type Number
	 */
	"occurred": Number
}));
