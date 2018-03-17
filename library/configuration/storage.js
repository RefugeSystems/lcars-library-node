var fs = require("fs");

/**
 * 
 * @class Storage
 * @constructor
 * @param {Object} definition
 */
module.exports = function(definition) {
	
};

module.exports.resolve = function(configuration) {
	return new Promise(function(done, fail) {
		var storage = new module.exports(configuration.storage);
		done({"storage": storage});
	});
};
