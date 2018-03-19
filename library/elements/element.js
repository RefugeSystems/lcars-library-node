var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * 
 * @class Distress
 * @module Elements
 * @constructor
 */
var Distress = new Schema({
	/**
	 * Above this status, this element is considered okay. Below this
	 * value, but above {{#crossLink "Distress/exception:property}}{{/crossLink}}
	 * the element is considered to be in distress.
	 * 
	 * Typically this should be viewed as a "percent supported", but this scheme
	 * can be adjusted by setting link contributions to perform differently.
	 * @property functional
	 * @type Number
	 * @default 70
	 */
	"functional": Number,
	/**
	 * Above this number and below {{#crossLink "Distress/functional:property}}{{/crossLink}}
	 * the element is considered to be in distress. Below this value, the element is
	 * considered to have encountered an exception.
	 * 
	 * Typically this should be viewed as a "percent supported", but this scheme
	 * can be adjusted by setting link contributions to perform differently.
	 * @property exception
	 * @type Number
	 * @default 30
	 */
	"exception": Number
});

/**
 * 
 * @class Element
 * @module Elements
 * @constructor
 * @param {Object} session
 * @param {Object} description
 */
module.exports = function(session, description) {
	if(!description.name) {
		throw new Error("Elements require a name");
	}
	
	var model = new Model(description);
	model.id = random.elementID();
	model.creater = session.id;
	model.created = Date.now();
	model.modifier = session.id;
	model.modified = model.created;
	if(!model.distress || !model.distress.functional) {
		model.distress = {};
		model.distress.functional = 70;
		model.distress.exception = 30; 
	}
	return model;
};

var Model = module.exports.model = configuration.connection.model("element", new Schema({
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
	 * @property status
	 * @type Number
	 */
	"status": Number,
	
	/**
	 * 
	 * @property distress
	 * @type Number
	 */
	"distress": Number,
	
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
	 * Indicates if the element should be considered active.
	 * 
	 * This does _NOT_ affect it's availability for querying or graph linking,
	 * this is simply an extension of the status.
	 * 
	 * An example would be taking a server offline for maintenance.
	 * 
	 * See {{#crossLink Element/removed:property}}{{/crossLink}} for making an
	 * element unavailable to searches and linking. 
	 * @property active
	 * @type Boolean
	 */
	"active": Boolean,
	
	/**
	 * When true, this element is no longer used when calculating support/dependency
	 * trees or event propagation, but it will still appear in searches and show in
	 * exploratory graphs and searches.
	 * @property removed
	 * @type Boolean
	 */
	"removed": Boolean,
	
	/**
	 * 
	 * @property distress
	 * @type Distress
	 */
	"distress": Distress,
	
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
