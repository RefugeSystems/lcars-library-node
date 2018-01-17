
var configuration = require("a-configuration");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 
 * @class SessionMarker
 * @constructor
 */
module.exports.schema = new Schema({
	/**
	 * 
	 * @property userID
	 * @type String
	 */
	"userID": String,
	/**
	 * 
	 * @property sessionID
	 * @type String
	 */
	"sessionID": String,
	/**
	 * 
	 * @property time
	 * @type Number
	 */
	"time": Number
});
