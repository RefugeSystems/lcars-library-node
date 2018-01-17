var bunyan = require("bunyan");

var defaults = {
		
};

module.exports.resolve = function(configuration) {
	return new Promise(function(done, fail) {
		var conf = Object.assign({}, defaults, configuration.log)
		configuration.log = bunyan.createLogger(conf);
		done();
	});
};
