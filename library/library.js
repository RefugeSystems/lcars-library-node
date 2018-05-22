
var EventEmitter = require("events");

/**
 * 
 * @class LCARSLibrary
 * @constructor
 * @param {Object} configuration
 */
module.exports = function(configuration) {

	var access = configuration.access || {};
	var library = this;
	
	this.connections = {};
	this.properties = {};
	this.neighbors = {};
	this.element = {};
	this.edge = {};
	this.sets = [];
	this.set = {};
	
	var active = {};
	
	var Elements = this.elements = require("./elements");
	var Modification = Elements.Modification;
	var Element = Elements.Element;
	var Edge = Elements.Edge;
	var Page = Elements.Page;

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
	
	
	this.element.create = function(session, request, data) {
		checkAccess(session, request, "create:element");
		var edge = new Element(session, data);
		setTimeout(library.edge.create(edge), 0);
		return edge;
	};
	
	
	this.edge.create = function(session, request, data) {
		return new Promise(function(done, fail) {
			checkAccess(session, request, "create:edge");
			var edge = new Edge(session, data);
		});
	};

	
	
	this.set.connect = function(session, request, id) {
		return new Promise(function(done, fail) {
			checkAccess(session, request, "connect:set");
			done(library.set[id]);
		});
	};
	
	this.set.establish = function(session, request, pages, options) {
		return new Promise(function(done, fail) {
			checkAccess(session, request, "establish:set");
			var set = new Set(pages, options);
			library.sets.push(set);
			library.set[set.id] = set;
			done(set);
		});
	};
	
	this.set.drop = function(session, request, id) {
		return new Promise(function(done, fail) {
			checkAccess(session, request, "establish:set");
			if(library.set[id]) {
				library.sets.splice(library.sets.indexOf(library.set[id]), 1);
				delete(library.set[id]);
			}
			done();
		});
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
	 * @param {String} request
	 * @param {String} key
	 * @param {Object} data
	 * @param {String} origin
	 * @throws {Object} On no access
	 */
	this.emit = function(session, request, key, data, origin) {
		checkAccess(session, request, "library:emit");
		
		if(!origin || !library.elements[origin]) {
			emitter.emit(key, {
				"id": random.eventID(),
				"key": key,
				"emitted": Date.now(),
				"data": data,
				"origin": "user:" + session.username
			});
		} else {
			Element.model.find({"id": origin})
			.then(function(list) {
				if(list.length) {
					
				}
			})
			.catch(function(error) {
				
			});
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
	 * @private
	 * @param {Session} session
	 * @param {String} request
	 * @param {String} action
	 * @throws {Object} On no access
	 */
	var checkAccess = function(session, request, action) {
		if(access && access[action] && access.path) {
			if(!session.access[access.path] || !session.access[access.path][action]) {
				var error = {
					"request": request,
					"error": {
						"message": "Access Denied"
					}
				};
				
				throw error;
			}
		}
	};
};
