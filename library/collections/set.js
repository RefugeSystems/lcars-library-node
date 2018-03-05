
var EventEmitter = require("EventEmitter");

var Random = require("../util/random");

var Element = require("./element");

var Link = require("./link");

/**
 * Class for maintaining a set of elements and links to be made available to connected terminals.
 * 
 * @class Set
 * @constructor
 * @param {Object} description
 * @param {Object} options
 */
module.exports = function(description, options) {
	
	
	var elements = {};
	
	
	var links = {};
	
	/**
	 * 
	 * @property id
	 * @type String
	 */
	this.id = setID();
	
	
	this.createElement = function(description) {
		
	};
	
	
	this.createLink = function(to, from, description) {
		
	};
	
	
	this.deactivateElement = function(id) {
		
	};
	
	
	this.deactivateLink = function(id) {
		
	};
	
	
	this.deleteElement = function(id) {
		
	};
	
	
	this.deleteLink = function(id) {
		
	};
	
	
	this.addElement = function(id) {
		
	};
	
	
	this.addLink = function(id) {
		
	};
	
	
	this.pruneElement = function(id) {
		
	};
	
	
	this.pruneLink = function(id) {
		
	};
	
	
	

	var emitter = new EventEmitter();
	this.on = emitter.on;
	this.once = emitter.once;
	this.off = emitter.off;
	this.listen = emitter.listen;
	
	/**
	 * 
	 * @method emit
	 * @param {String} key Identifier for the event to emit, prefixed with "ext" automatically.
	 * @param {Object} data
	 */
	this.emit = function(key, data) {
		if(key) {
			if(key[0] !== "e" || key[1] !== "x" || key[2] !== "-") {
				key = "ex-" + key;
			}
		} else {
			key = "ext-generic";
		}
		var id = eventID();
		data = data || {};
		data.key = key;
		data.id = id
		data.emitted = Date.now();
		if(data.id !== id) {
			throw {"message": "Unable to set identifier for Event", "event": {"id": id, "data": data, "key": key}});
		}
		emitter.emit(key, data);
	};
};

/**
 * 
 * @property prefix
 * @type Object
 * @static
 * @private
 */
var prefix = {};
prefix.event = "evID";
prefix.element = "elID"; //Vertex
prefix.link = "edID"; // Edge
prefix.set = "seID";

/**
 * 
 * @property collection
 * @type Object
 * @static
 * @private
 */
var collection = {};
collection.sets = {};
collection.elements = {};
collection.links = {};

/**
 * Return an identifier for an Event.
 * 
 * Additionally, events leverage timestamp for uniqueness. 
 * @method eventID
 * @static
 * @return {String} A string for identifying an event. 
 */
var eventID = module.exports.eventID = function() {
	return prefix.event + Random.string(32);
};

/**
 * Return an identifier for an Element.
 * @method elementID
 * @static
 * @private
 * @return {String} A string for identifying an event. 
 */
var elementID = function() {
	var id;
	do {
		id = prefix.element + Random.string(32);
	} while(collection.elements[id]);
	return id;
};

/**
 * Return an identifier for a Link (Edge).
 * @method linkID
 * @static
 * @private
 * @return {String} A string for identifying an event. 
 */
var linkID = function() {
	var id;
	do {
		id = prefix.link + Random.string(32);
	} while(collection.links[id]);
	return id;
};

/**
 * Return an identifier for a Set.
 * @method setID
 * @static
 * @private
 * @return {String} A string for identifying an event. 
 */
var setID = function() {
	var id;
	do {
		id = prefix.set + Random.string(32);
	} while(collection.sets[id]);
	return id;
};
