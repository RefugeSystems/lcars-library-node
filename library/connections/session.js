var configuration = require("a-configuration");
var Schema = require("mongoose").Schema;
var random = require("../util/random");

/**
 * Representation of message access request to retrieve information
 * from the library and process any needed session information.
 * @class Session
 * @module Connections
 * @constructor
 * @param {Object} description
 * @param {WebSocket | Socket | Request} description
 */
module.exports = function(description, socket) {
	var model = new Model(description);
	model.id = random.sessionID();
	model.authenticated = Date.now();
	model.last = model.authenticated;
	if(socket) {
		model.ips = model.ips || [];
		var ip = socket.ip || socket.srcip || socket.src_ip || socket.sourceIP || socket.source_ip || socket.sip;
		if(ip && model.ips.indexOf(ip) === -1 && model.srcip !== ip) {
			model.ips.push(ip);
		}
	}
	return model;
};

var Model = this.model = configuration.connection.model("session", new Schema({
	/**
	 * 
	 * @property id
	 * @type String
	 */
	"id": String,
	
	/**
	 * 
	 * @property username
	 * @type String
	 */
	"username": String,
	
	/**
	 * Due to the way passport processes requests, the source
	 * IP isn't available at sign-in. Additionally, this field
	 * is being moved to an array to track possible multitudes
	 * of IP addresses.
	 * @property srcip
	 * @type String
	 * @deprecated
	 */
	"srcip": String,
	
	/**
	 * Tracks IP addresses seen inside this session
	 * @property ips
	 * @type String
	 */
	"ips": [String],
	
	/**
	 * The passport request string that generated
	 * this request.
	 * @property source
	 * @type String
	 */
	"source": String,
	
	/**
	 * When this session was established.
	 * @property authenticated
	 * @type Number
	 */
	"authenticated": Number,
	
	/**
	 * The String representing the code for this session.
	 * @property authenticator
	 * @type String
	 */
	"authenticator": String,
	
	/**
	 * String used for looking up this session that should be deleted
	 * after fetch.
	 * @property connector
	 * @type String
	 */
	"connector": String,
	
	/**
	 * When set, this names the Tower instance to which the user has an
	 * active websocket.
	 * @property connected
	 * @type String
	 */
	"connected": String,
	
	/**
	 * The last time this session was used.
	 * @property last
	 * @type Number
	 */
	"last": Number,
	
	/**
	 * The Refuge user id
	 * @property user
	 * @type String
	 */
	"user": String
}));
