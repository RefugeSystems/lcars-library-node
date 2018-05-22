var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");
var EventEmitter = require("events");

var Random = require("../util/random");
var Element = require("../elements/element");
var Edge = require("../elements/edge");
var Page = require("../elements/page");
var log = configuration.log;

/**
 * 
 * 
 * @class Set
 * @constructor
 * @param {Object} [pages]
 * @param {Object} [options]
 */
module.exports = function(pages, options) {
	options = options || {};

	var modeled = new Model(this);
	var id = this.id = options.id || random.setID();
	var name = this.name = options.name || this.id;
	
	var path = options.path || this.id;
	var pages = options.pages;
	var access = options.access || null;
	
	/**
	 * IDs of elements in this set
	 * @property elements
	 * @type Array
	 */
	var elements = this.elements = [];
	
	/**
	 * IDs of edges in this Set
	 * @property edges
	 * @type Array
	 */
	var edges = this.edges = [];
	
	this.collections = pages || null;
	
	this.hasElement = function(id) {
		
	};

	this.addElements = function(session, request, ids) {
		if(checkAccess(session, request, "add:element")) {
			var added = [];
			ids.forEach(function(element) {
				elements.push(element);
				added.push(element);
			});
			emitter.emit("added", {
				"added": added,
				"type": "additive",
				"category": "element",
				"request": request
			});
			sync();
		}
	};
	
	this.addEdges = function(session, request, ids, pages) {
		if(checkAccess(session, request, "add:edge")) {
			var added = [];
			ids.forEach(function(edge) {
				edges.push(edge);
				added.push(edge);
			});
			emitter.emit("added", {
				"added": added,
				"type": "additive",
				"category": "edge",
				"request": request
			});
			sync();
		}
	};
	
	this.pruneElements = function(session, request, ids) {
		if(checkAccess(session, request, "add:element")) {
			var index, removed = [];
			ids.forEach(function(eid) {
				index = elements.indexOf(eid);
				if(index !== -1) {
					elements.splice(index, 1);
					removed.push(eid);
				}
			});
			emitter.emit("removed", {
				"removed": removed,
				"type": "subtractive",
				"category": "element",
				"request": request
			});
			sync();
		}
	};
	
	this.pruneEdges = function(session, request, ids) {
		if(checkAccess(session, request, "add:edge")) {
			var index, removed = [];
			ids.forEach(function(eid) {
				index = edges.indexOf(eid);
				if(index !== -1) {
					edges.splice(index, 1);
					removed.push(eid);
				}
			});
			emitter.emit("removed", {
				"removed": removed,
				"type": "subtractive",
				"category": "edge",
				"request": request
			});
			sync();
		}
	};
	
	var emitter = new EventEmitter();
	this.on = emitter.on;
	this.once = emitter.once;
	this.off = emitter.off;
	this.listen = emitter.listen;
	
	/**
	 * 
	 * @method emit
	 * @param {Session} session
	 * @param {String} key Identifier for the event to emit, a key prefix of "ext-" indicating
	 * 		external origin is required and added automatically if omitted.
	 * @param {Object} data
	 * @param {String} origin
	 * @throws {Error} On access denial 
	 */
	this.emit = function(session, request, key, data, origin) {
		if(checkAccess(session, request, "emit:set")) {
			if(!origin || !elements[origin]) {
				origin = "user:" + session.username;
			}
			
			data = {
				"id": random.eventID(),
				"key": key,
				"emitted": Date.now(),
				"data": data,
				"origin": origin
			};
			
			emitter.emit(key, data);
		}
	};

	/**
	 * 
	 * @method propagating
	 * @param {String} id The Element causing the event emission from this set.
	 * @param {Event} event The Event that is propagating.
	 */
	this.propagating = function(id, event) {
		
	};
	
	/**
	 * 
	 * @method checkAccess
	 * @param {Session} session
	 * 
	 * @return {Boolean}
	 */
	var checkAccess = function(session, request, action) {
		if(access && access[action] && access.path) {
			if(!session.access[access.path] || !session.access[access.path][action]) {
				emitter.emit("error", {
					"request": request,
					"action": action,
					"error": {
						"message": "Access Denied"
					}
				});
				return false;
			}
		}
		return true;
	};
	
	var sync = function() {
		modeled.save()
		.then(log.debug)
		.catch(log.error);
	};
	
	sync();
};


var Model = module.exports.model = configuration.connection.model("Set", new Schema({
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
	 * @property edges
	 * @type Array
	 */
	"edges": Array,
	
	/**
	 * 
	 * @property elements
	 * @type Array
	 */
	"elements": Array,
	
	/**
	 * Edge pages used by this set if any. If null, all edge
	 * pages are used.
	 * @property collections
	 * @type Array
	 * @default null
	 */
	"collections": Array,
	
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
