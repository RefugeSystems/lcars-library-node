
var Random = require("../util/random");

var Element = require("../elements/element");

var Link = require("../elements/edge");

/**
 * 
 * 
 * @class Set
 * @constructor
 * @param {Object} description
 * @param {Object} options
 */
module.exports = function(collections, elements, edges, options) {
	
	
	var elements = {};
	
	
	var links = {};
	
	/**
	 * 
	 * @property id
	 * @type String
	 */
	this.id = random.setID();
	
	
	this.collections = [];
	

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
	 * @param {String} key Identifier for the event to emit, a key prefix of "ext-" indicating
	 * 		external origin is required and added automatically if omitted.
	 * @param {Object} data
	 */
	this.emit = function(key, data) {
		var id, error;
		
		if(key) {
			if(key[0] !== "e" || key[1] !== "x" || key[2] !== "t" || key[3] !== "-") {
				key = "ext-" + key;
			}
		} else {
			key = "ext-generic";
		}

		data = {
			"id": random.eventID(),
			"key": key,
			"emitted": Date.now(),
			"data": data
		};
		
		emitter.emit(key, data);
	};
};

