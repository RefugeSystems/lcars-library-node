
var configuration = require("../conf/configuration.js");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 
 * @class Session
 * @constructor
 */
module.exports = function(id, profile) {
	/**
	 * 
	 * @property id
	 * @type String
	 */
	this.id = id;
	
	/**
	 * 
	 * @property username
	 * @type String
	 */
	this.username = profile.username;
	
	/**
	 * Tracks IP addresses seen for this session
	 * @property ips
	 * @type String
	 */
	this.ips = [];
	if(profile.sourceIP) {
		this.ips.push(profile.sourceIP);
	}
	
	/**
	 * The passport request string that generated this request.
	 * @property source
	 * @type String
	 */
	this.source = profile.sourcePassport;
	
	/**
	 * When this session was established.
	 * @property authenticated
	 * @type Number
	 */
	this.authenticated = Date.now();
	
	/**
	 * String used for looking up this session that should be deleted
	 * after fetch.
	 * @property connector
	 * @type String
	 */
	this.connector = profile.connector;
	
	/**
	 * The last time this session was used.
	 * @property last
	 * @type Number
	 */
	this.last = Date.now();

	/**
	 * The Refuge user id
	 * @property user
	 * @type String
	 */
	this.user = profile.id;
};
