
var Random = require("../util/random");

var Element = require("../elements/element");

var Edge = require("../elements/edge");

var Page = require("../elements/page");

var EventEmitter = require("events");

/**
 * 
 * 
 * @class Set
 * @constructor
 * @param {Object} [pages]
 * @param {Object} [options]
 */
module.exports = function(pages, options) {
	var p;
	
	/**
	 * 
	 * @property id
	 * @type String
	 */
	this.id = options.id || random.setID();
	
	options = options || {};
	
	var path = options.path || this.id;
	
	var pages = options.pages;
	
	var access = options.access || null;
	
	var elements = {};
	elements.list = [];
	elements.ids = [];
	
	var edges = {};
	edges.list = [];
	edges.ids = [];
	
	this.collections = pages || null;
	
	this.hasElement = function(id) {
		
	};

	this.addElements = function(session, request, ids) {
		if(checkAccess(session, request, "add:element")) {
			Element.model.find({"id":{$in:ids}})
			.lean()
			.then(function(elements) {
				elements.forEach(function(element) {
					elements[element.id] = element;
					elements.list.push(element);
					elements.ids.push(element.id);
				});
				emitter.emit("added", {
					"elements": elements,
					"type": "additive",
					"category": "element",
					"request": request
				});
			})
			.catch(function(error) {
				emitter.emit("error", {
					"request": request,
					"type": "additive",
					"category": "element",
					"error": error
				});
			});
		}
	};
	
	this.addEdges = function(session, request, ids, pages) {
		if(checkAccess(session, request, "add:edge")) {
			var query = {"id":{"$in":ids}};
			if(pages) {
				query.page = {"page":{"$in":pages}};
			} else {
				query.private = false;
			}
			Edge.model.find(query)
			.lean()
			.then(function(edges) {
				edges.forEach(function(edge) {
					edges[edge.id] = edge;
					edges.list.push(edge);
					edges.ids.push(edge.id);
				});
				emitter.emit("added", {
					"edges": edges,
					"type": "additive",
					"category": "edge",
					"request": request
				});
			})
			.catch(function(error) {
				emitter.emit("error", {
					"request": request,
					"type": "additive",
					"category": "edge",
					"error": error
				});
			});
		}
	};
	
	this.pruneElements = function(session, request, ids) {
		if(checkAccess(session, request, "add:element")) {
			var removed = [];
			ids.forEach(function(eid) {
				if(elements[eid]) {
					removed.push(elements[eid]);
					elements.list.splice(elements.list.indexOf(elements[eid]), 1);
					delete(elements[eid]);
				}
			});
			emitter.emit("removed", {
				"elements": removed,
				"type": "subtractive",
				"category": "element",
				"request": request
			});
		}
	};
	
	this.pruneEdges = function(session, request, ids) {
		if(checkAccess(session, request, "add:edge")) {
			var removed = [];
			ids.forEach(function(eid) {
				if(edges[eid]) {
					removed.push(edges[eid]);
					edges.list.splice(edges.list.indexOf(edges[eid]), 1);
					delete(edges[eid]);
				}
			});
			emitter.emit("removed", {
				"edges": removed,
				"type": "subtractive",
				"category": "edge",
				"request": request
			});
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
};

