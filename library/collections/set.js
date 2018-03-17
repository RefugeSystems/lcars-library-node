
var EventEmitter = require("EventEmitter");

var Random = require("../util/random");

var Element = require("../elements/element");

var Link = require("../elements/edge");

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
	
	
	this.createElement = function(session, description) {
		
	};
	
	
	this.createLink = function(session, to, from, description) {
		
	};
	
	
	this.deactivateElement = function(session, id) {
		
	};
	
	
	this.deactivateLink = function(session, id) {
		
	};
	
	
	this.deleteElement = function(session, id) {
		
	};
	
	
	this.deleteLink = function(session, id) {
		
	};
	
	
	this.addElement = function(session, id) {
		
	};
	
	
	this.addLink = function(session, id) {
		
	};
	
	
	this.pruneElement = function(session, id) {
		
	};
	
	
	this.pruneLink = function(session, id) {
		
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
		var id, error;
		
		if(key) {
			if(key[0] !== "e" || key[1] !== "x" || key[2] !== "-") {
				key = "ex-" + key;
			}
		} else {
			key = "ext-generic";
		}
		
		id = eventID();
		data = data || {};
		data.key = key;
		data.id = id
		data.emitted = Date.now();
		if(data.id !== id) {
			error = {
				"message": "Unable to set identifier for Event",
				"event": {
					"id": id,
					"data": data,
					"key": key
				}
			};
			
			throw error;
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
