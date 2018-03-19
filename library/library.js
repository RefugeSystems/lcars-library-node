
/**
 * 
 * @class LCARSLibrary
 * @constructor
 * @param {Object} configuration
 */
module.exports = function(configuration) {

	this.connections = {};
	this.properties = {};
	this.neighbors = {};
	this.element = {};
	this.edge = {};
	this.set = {};
	
	var active = {};
	
	var Elements = this.elements = require("./elements");
	var Modification = Elements.Modification;
	var Element = Elements.Element;
	var Edge = Elements.Edge;

	var Space = this.space = require("./space");
	var Circulation = Space.Circulation;
	var Search = Space.Search;
	var Set = Space.Set;
	
	/**
	 * 
	 * @property name
	 * @type String
	 * @default "Library"
	 */
	this.properties.name = configuration.name || "Library";
	
	/**
	 * 
	 * @property description
	 * @type String
	 */
	this.properties.description = configuration.description || "";
	
	/**
	 * Username of who last updated this library.
	 * @property updater
	 * @type String
	 * @default "System"
	 */
	this.properties.updater = configuration.updater || "System";
	
	/**
	 * 
	 * @property updated
	 * @type Number
	 */
	this.properties.updated = Date.now();
	
	
	
	this.properties.collections = [];
	
	
	this.properties.host = configuration.host;
	
	
	this.properties.port = configuration.port;
	

	
	this.set.establish = function(session, description) {
		return new Promise(function(done, fail) {
			var set = new Set();
		});
	};
	
	this.set.drop = function(session, description) {
		return new Promise(function(done, fail) {
			
		});
	};
};
