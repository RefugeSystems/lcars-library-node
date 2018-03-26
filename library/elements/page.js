var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * Represents the set of links that connect elements. Various collections serve different
 * purposes for how they connect and can inherit from one another. 
 * @class Set
 * @module Elements
 * @constructor
 * @param {Object} session 
 * @param {Object} description
 */
module.exports = function(session, description) {
	var model = new Model(description);
	model.id = random.setID();
	model.creater = session.id;
	model.created = Date.now();
	model.modifier = session.id;
	model.modified = model.created;
	return model;
};

var Model = module.exports.model = configuration.connection.model("Page", new Schema({
	/**
	 * 
	 * @property id
	 * @type String
	 */
	"id": String,
	
	/**
	 * 
	 * @property name
	 * @type String
	 */
	"name": String,
	
	/**
	 * When true, edges in this page are considered limited to the page and not the master list.
	 * @property private
	 * @type Boolean 
	 */
	"private": Boolean,
	
	/**
	 * Markdown style string describing the purpose of the set.
	 * @property description
	 * @type String
	 */
	"description": String,
	
	/**
	 * Custom fields to use to tag the set for informational purposes.
	 * @property fields
	 * @type Object
	 */
	"fields": Object,
	
	/**
	 * Array of page IDs that should be considered a subgroup of this page.
	 * @property touched
	 * @type Array | String
	 */
	"encompasses": [String],
	
	/**
	 * 
	 * @property creater
	 * @type String
	 */
	"creater": String,
	
	/**
	 * 
	 * @property created
	 * @type Number
	 */
	"created": Number,
	
	/**
	 * 
	 * @property modifier
	 * @type String
	 */
	"modifier": String,
	
	/**
	 * 
	 * @property modified
	 * @type Number
	 */
	"modified": Number
}));
