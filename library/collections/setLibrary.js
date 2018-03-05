
/**
 * 
 * @class Element
 * @constructor
 * @param {Object} definition
 * @param {Object} options
 */
module.exports = function(definition, options) {
	
	/**
	 * 
	 * @property collections
	 * @type Object
	 * @private
	 */
	var collections = {};
	
	/**
	 * 
	 * @property types
	 * @type Object
	 * @private
	 */
	var types = {};
	
	/**
	 * 
	 * @property elements
	 * @type Object
	 * @private
	 */
	var elements = {};
	
	/**
	 * 
	 * @property name
	 * @type String
	 * @default "Library"
	 */
	this.name = definition.name || "Library";
	
	/**
	 * 
	 * @property description
	 * @type String
	 */
	this.description = definition.description || "";
	
	/**
	 * Username of who last updated this library.
	 * @property updater
	 * @type String
	 * @default "System"
	 */
	this.updater = definition.updater || "System";
	
	/**
	 * 
	 * @property updated
	 * @type Number
	 */
	this.updated = Date.now();
	
	/**
	 * 
	 * @method getLinksFrom
	 * @param {String} collection
	 * @param {String} id
	 * @return {Promise}
	 */
	this.getLinksFrom = function(collection, id) {
		return new Promise(function(done, fail) {
			
		});
	};
	
	/**
	 * 
	 * @method getLinksTo
	 * @param {String} collection
	 * @param {String} id
	 * @return {Promise}
	 */
	this.getLinksTo = function(collection, id) {
		return new Promise(function(done, fail) {
			
		});
	};
	
	/**
	 * 
	 * @method getLinksTo
	 * @param {String} collection
	 * @param {String} from
	 * @param {String} to
	 * @return {Promise}
	 */
	this.getPath = function(collection, from, to) {
		return new Promise(function(done, fail) {
			
		});
	};
	
	/**
	 * 
	 * @method getLinksTo
	 * @param {String} collection
	 * @param {String} id
	 * @return {Promise}
	 */
	this.getDependencies = function(collection, id) {
		return new Promise(function(done, fail) {
			
		});
	};
	
	/**
	 * 
	 * @method getLinksTo
	 * @param {String} collection
	 * @param {String} id
	 * @return {Promise}
	 */
	this.getDependents = function(collection, id) {
		return new Promise(function(done, fail) {
			
		});
	};
};
