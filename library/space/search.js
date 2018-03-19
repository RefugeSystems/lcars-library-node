
/**
 * 
 * @class Search
 * @constructor
 * @static
 */

var Elements = require("../elements");
var Element = Elements.Element;
var Edge = Elements.Edge;

/**
 * 
 * @method adjacent
 * @param {String} source Element ID
 * @param {Object} [filter] Specifies specific element types to handle differently.
 * @param {String} [collection] If omitted, only links available to the master space are considered,
 * 		otherwise links are used in the specified collection.
 * @return {Promise} 
 */
this.adjacent = function(source, filter, collection) {
	return new Promise(function(done, fail) {
		var search = {};
		Element.model.findOne({"id":source})
		.then(function(src) {
			if(src) {
				search.source = src;
				return Promise.all([Edge.model.find({"source": source}), Edge.model.find({"target": source})])
			} else {
				fail(new Error("Source doesn't exist"));
			}
		})
		.then(function(results) {
			search.inbound = [];
			search.outbound = [];
			results[0].forEach(function(edge) {
				search.outbound.push(edge.target);
			});
			results[1].forEach(function(edge) {
				search.inbound.push(edge.source);
			});
			search.links = results[0].concat(results[1]);
			return Promise.all([Element.model.find({"id": {$in:search.inbound}}), Element.model.find({"id": {$in:search.outbound}})]);
		})
		.then(function(results) {
			search.inbound = results[0];
			search.outbound = results[1];
			done(search);
		})
		.catch(fail);
	});
};

/**
 * 
 * @method path
 * @param {String} to
 * @param {String} from
 * @param {String} [collection] If omitted, only links available to the master space are considered,
 * 		otherwise links are used in the specified collection.
 * @return {Promise} 
 */
this.path = function(to, from, collection) {
	
};

/**
 * 
 * @method supports
 * @param {String} id
 * @param {String} [collection] If omitted, only links available to the master space are considered,
 * 		otherwise links are used in the specified collection.
 * @return {Promise} 
 */
this.supports = function(id, collection) {
	
};

/**
 * 
 * @method supplies
 * @param {String} id
 * @param {String} [collection] If omitted, only links available to the master space are considered,
 * 		otherwise links are used in the specified collection.
 * @return {Promise} 
 */
this.supplies = function(id, collection) {
	
};

/**
 * 
 * @method supportConvergence
 * @param {Array} ids
 * @param {String} [collection] If omitted, only links available to the master space are considered,
 * 		otherwise links are used in the specified collection.
 * @return {Promise} 
 */
this.supportConvergence = function(ids, collection) {
	
};

/**
 * 
 * @method supplyConvergence
 * @param {Array} ids
 * @param {String} [collection] If omitted, only links available to the master space are considered,
 * 		otherwise links are used in the specified collection.
 * @return {Promise} 
 */
this.supplyConvergence = function(ids, collection) {
	
};
