
var fs = require("fs");

var mongoose = require("mongoose");
mongoose.Promise = Promise;

var storeSupport = ["mongodb"];

/**
 * The configuration for the library as specified from the composure of the instance.json file as well
 * as various additional JSON files specified by that file.
 * 
 * Also provides mechanisms for reloading the configuration and subsequent event emission. 
 * @class Configuration
 * @static
 * @constructor
 */
module.exports = (function() {
	var configuration = {};
	var system, instance;

	/**
	 * 
	 * @method load
	 * @private
	 * @param {Object} loading Object to load for configuration properties.
	 */
	var load = function(loading) {
		Object.keys(loading).forEach(function(key) {
			switch(key) {
				case "_reload":
				case "_on":
					console.warn("Configuration attempted to override '_reload', or '_on'.");
					break;
				case "":
					break;
				default:
					configuration[key] = configuration[key] || {};
					Object.assign(configuration[key], loading[key]);
					break;
			}
		});
	};
	
	
	var read = function(path) {
		return new Promise(function(done, fail) {
			fs.readFile(path, "utf8", function (err, config) {
				try {
					config = JSON.parse(config);
					done(config);
				} catch(parseException) {
					fail(parseException);
				}
			});
		});
	};
	
	var loadConfiguration = function(config) {
		return new Promise(function(done) {
			if(config) {load(config);}
			done(config);
		});
	};
	
	var loadSystem = function(config) {
		if(config.system !== false) {
			return read(config.system?config.system:"/etc/lcars/system.json");
		} else {
			return new Promise(function(done) {done();});
		}
	};

	var loader = function(path) {
		return new Promise(function(done, fail) {
			read(path)
			.then(loadConfiguration)
			.then(done)
			.catch(fail);
		});
	};
	
	var loadAdditions = function(config) {
		var promised = [];
		
		if(config.additional) {
			config.additional.forEach(function(path) {
				promised.push(loader(path));
			});
		}
		
		return Promise.all(promised);
	};
	
	var notify = function() {
		return new Promise(function(done) {
			
			done();
		});
	};
	
	/**
	 * 
	 * @method _reload
	 */
	configuration._reload = function() {
		return new Promise(function(done, fail) {
			read("./instance.json")
			.then(loadConfiguration)
			.then(loadSystem)
			.then(loadConfiguration)
			.then(loadAdditions)
			.then(notify)
			.then(done)
			.catch(fail);
		});
	};
	
	/**
	 * 
	 * @method _on
	 * @param {String} key
	 * @param {Function} listener
	 */
	configuration._on = function(key, listener) {
		
	};
	
	/* Parse and assign configurations */
	instance = require("./instance.json");
	load(instance);
	
	if(instance.system !== false) {
		system = instance.system || "/etc/lcars/system.json";
		system = require(system);
		load(system);
	}
	
	if(instance.additional) {
		instance.additional.forEach(function(path) {
			load(require(path));
		});
	}

	/* Connect databases as needed */
	if(configuration.mongo && configuration.mongo.host) {
		configuration.mongo.connection = mongoose.createConnection(configuration.mongo.path || configuration.mongo.uri, configuration.mongo);
	}

	/* Establish logging destinations */
	if(!configuration.logging) {
		throw new Error("No logging section found in configuration");
	} else {
		switch(configuration.logging.storage) {
			case "mongodb":
				configuration.logging.connection = mongoose.createConnection(configuration.logging.path || configuration.logging.uri, configuration.logging);
				break;
			default:
				console.log("Logging Configuration:\n" + JSON.stringify(configuration.logging));
				throw new Error("No storage location specified for logging. Supported: [" + storeSupport.stringify() + "]");
		}
	}

	/* Establish session source*/
	if(!configuration.session) {
		throw new Error("No session section found in configuration");
	} else {
		switch(configuration.session.storage) {
			case "mongodb":
				configuration.session.connection = mongoose.createConnection(configuration.session.path || configuration.session.uri, configuration.logging);
				break;
			default:
				console.log("Session Configuration:\n" + JSON.stringify(configuration.session));
				throw new Error("No storage location specified for session. Supported: " + storeSupport.toString());
		}
	}
	
	return configuration;
})();
