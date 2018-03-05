var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * 
 * @class Event
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

var Model = configuration.connection.model("event", new Schema({
	/**
	 * 
	 * @property id
	 * @type String
	 */
	"id": String,
	
	/**
	 * 
	 * @property label
	 * @type String
	 */
	"label": String,
	
	/**
	 * Markdown style string describing the event.
	 * @property description
	 * @type String
	 */
	"description": String,
	
	/**
	 * 
	 * @property type
	 * @type String
	 */
	"type": String,
	
	/**
	 * 
	 * @property subtype
	 * @type String
	 */
	"subtype": String,
	
	/**
	 * Array of Element IDs that this event has touched.
	 * @property touched
	 * @type Array | String
	 */
	"touched": [String],

	/**
	 * 
	 * @property occurred
	 * @type Number
	 */
	"occurred": Number,

	/**
	 * The session, if any, from which this event originated.
	 * 
	 * Only defined for user initiated events. Undefined indicates a system event.
	 * @property session
	 * @type String
	 */
	"session": String,
	
	/**
	 * Indicated the ID of the element from which this event is considered to have
	 * originated.
	 * @property origin
	 * @type String
	 */
	"origin": String
}));
