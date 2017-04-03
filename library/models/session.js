
var configuration = require("../conf/configuration.js");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 
 * @class Session
 */
configuration.session.connection.model("Session", new Schema({
	/**
	 * 
	 * @property username
	 * @type String
	 */
	"username": String,
	/**
	 * Due to the way passport processes requests, the source
	 * IP isn't available at signin. Additionally, this field
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
