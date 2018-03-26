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
module.exports = function(session, description) {
	if(!description.source || !description.target) {
		throw new Error("Links require source, and target");
	}
	
	var model = new Model(description);
	model.id = random.edgeID();
	model.creater = session.id;
	model.created = Date.now();
	model.modifier = session.id;
	model.modified = model.created;
	return model;
};

var Model = module.exports.model = configuration.connection.model("Edge", new Schema({
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
	 * Links exist in distinct pages that may or may not be part of the master page.
	 * This allows resources to be expressed in different manners and for those manners to inherit
	 * a page or not.
	 * 
	 * @property page
	 * @type String
	 */
	"page": String,
	
	/**
	 * When true, this link is considered limited to the set and not the master list.
	 * @property private
	 * @type Boolean 
	 */
	"private": Boolean,
	
	/**
	 * When determining if an element is "in distress" or not, the contribution of all supporting
	 * elements is considered during an update.
	 * 
	 * This must result in a number to be considered valid and is passed the status of the "source"
	 * and "target" as 0: Functional, 1: Warning, 2: Exception, or 3: Deactivated .
	 * @property contribution
	 * @type String
	 * @optional
	 */
	"contribution": String,
	
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
	 * When true, this edge is no longer used when calculating support/dependency
	 * trees or event propagation, but it will still appear in searches and show in
	 * exploratory graphs and searches.
	 * @property removed
	 * @type Boolean
	 */
	"removed": Boolean,

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
