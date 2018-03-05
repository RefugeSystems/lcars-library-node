var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * 
 * @class Edge
 * @module Elements
 * @constructor
 * @param {Object} session
 * @param {String} source
 * @param {String} target
 * @param {Object} description
 */
module.exports = function(session, source, target, description) {
	var model = new Model(description);
	model.id = random.edgeID();
	model.source = source;
	model.target = target;
	model.creater = session.id;
	model.created = Date.now();
	model.modifier = session.id;
	model.modified = model.created;
	return model;
};

var Model = configuration.connection.model("edge", new Schema({
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
	 * Markdown style string describing the element.
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
	 * 
	 * @property source
	 * @type String
	 */
	"source": String,

	/**
	 * 
	 * @property target
	 * @type String
	 */
	"target": String,
	
	/**
	 * 
	 * @property fields
	 * @type Object
	 */
	"fields": Object,
	
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
