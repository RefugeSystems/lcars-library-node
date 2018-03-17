var bunyan = require("bunyan");

module.exports.resolve = function(configuration) {
	return new Promise(function(done) {
		var serializer = function(obj) {
			return {"id": obj.id || obj._id};
		};
		
		var pkg = require("../../package.json");
		
		configuration.bunyan = configuration.bunyan || {};
		configuration.bunyan.name = configuration.bunyan.name || pkg.name || "NoNameFound";
		configuration.bunyan.serializers = configuration.bunyan.serializers || {};
		configuration.bunyan.serializers.modification = serializer;
		configuration.bunyan.serializers.element = serializer;
		configuration.bunyan.serializers.link = serializer;
		configuration.bunyan.serializers.session = function(session) {
			if(session._serialized) {
				return {"id":session.id};
			} else {
				session._serialized = true;
				return session;
			}
		};
		
		done({
			"log": bunyan.createLogger(configuration.bunyan)
		});
	});
};
