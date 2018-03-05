var bunyan = require("bunyan");

module.exports.resolve = function(configuration) {
	objects = {};
	
	return new Promise(function(done) {
		var serializer = function(obj) {
			return {"id": obj.id || obj._id};
		};
		
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
