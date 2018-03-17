var mongoose = require("mongoose");

module.exports.resolve = function(configuration) {
	return new Promise(function(done, fail) {
		var load = {};
		
		var option = {}, options = ["user", "password", "auth"];
		
		load.host = configuration.mongoose.hostname || configuration.mongoose.host || configuration.mongoose.h;
		load.user = configuration.mongoose.username || configuration.mongoose.user || configuration.mongoose.u;
		load.pass = configuration.mongoose.password || configuration.mongoose.pass || configuration.mongoose.p;
		load.data = configuration.mongoose.database || configuration.mongoose.data || configuration.mongoose.base || load.db || load.d || "library";
		load.port = configuration.mongoose.dataport || configuration.mongoose.port || 27017;
		
		options.forEach(function(opt) {
			option[opt] = configuration.mongoose[opt];
		});
		
		if(configuration.mongoose.noauth === false || (load.user && load.pass && !configuration.mongoose.noauth)) {
			option.auth = option.auth || {};
			option.auth.user = option.auth.user || load.user;
			option.auth.password = option.auth.password || load.pass;
		} else {
			delete(option.auth);
			delete(option.user);
			delete(option.password);
		}
		
		if(!load.host) {
			fail(new Error("No host specified for Mongo connection"));
		} else if(!load.port) {
			fail(new Error("No port specified for Mongo connection"));
		} else {
			load.path = "mongodb://" + load.host + ":" + load.port + "/" + load.data;
			var connection = mongoose.createConnection(load.path, option);
			connection.then(function() {
				done({"connection": connection});
			}).catch(function(error) {
				error = error || {};
				console.log("Error: " + error.message, error.stack);
				fail(error);
			});
		}
	});
};
