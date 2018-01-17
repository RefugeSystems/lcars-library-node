
var Random = require("../util/random");

/**
 * 
 * @class Anomaly
 * @constructor
 * @param {String} message
 * @param {Object | Error} description
 */
module.exports = function(message, description) {
	description = description || {};
	
	/**
	 * 
	 * @property message
	 * @type String
	 */
	this.message = message + (description.message?": " + description.message:"");
	
	/**
	 * 
	 * @property occurred
	 * @type Number
	 */
	this.occurred = Date.now();
	
	/**
	 * 
	 * @property id
	 * @type String
	 */
	this.id = Random.string(32);
	
	/**
	 * 
	 * @property description
	 * @type Object
	 */
	this.description = description;
};
