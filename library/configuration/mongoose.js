var mongoose = require("mongoose");

module.exports.resolve = function(configuration) {
	return new Promise(function(done, fail) {
		var load = {};
		
		load.host = configuration.mongoose.hostname || configuration.mongoose.host || configuration.mongoose.h;
		load.user = configuration.mongoose.username || configuration.mongoose.user || configuration.mongoose.u;
		load.pass = configuration.mongoose.password || configuration.mongoose.pass || configuration.mongoose.p;
		load.data = configuration.mongoose.database || configuration.mongoose.data || configuration.mongoose.base || load.db || load.d || "library";
		load.port = configuration.mongoose.dataport || configuration.mongoose.port || 27017;
		if(load.user && load.pass) {
			configuration.mongoose.auth = configuration.mongoose.auth || {};
			configuration.mongoose.auth.username = load.user;
			configuration.mongoose.auth.password = load.pass;
		}
		
		if(!load.host) {
			fail(new Error("No host specified for Mongo connection"));
		} else if(!load.port) {
			fail(new Error("No port specified for Mongo connection"));
		} else {
			load.path = "mongodb://" + load.path + load.hostname + ":" + load.dataport + "/" + load.database;
			done({"connection": mongoose.createConnection(load.path, configuration.mongoose)});
		}
	});
};
