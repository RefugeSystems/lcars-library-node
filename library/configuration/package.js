module.exports.resolve = function(configuration) {
	var pkg = require("../../package.json");
	return {"package": pkg};
};
