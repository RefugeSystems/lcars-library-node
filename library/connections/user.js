"use strict";

var configuration = require("a-configuration");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 
 * @class User
 */
module.exports = function(description) {
	var model = new Model(description);
	return model;
};

var Schema = this.schema = new Schema({
	/**
	 * Full name of user
	 * @property name
	 * @type String 
	 */
	"name": String,
	/**
	 * URL of profile picture
	 * @property image
	 * @type String 
	 */
	"image": String,
	/**
	 * User's username.
	 * @property username
	 * @type String 
	 */
	"username": String,
	/**
	 * User's GMail account for google auth.
	 * @property gmail
	 * @type String 
	 */
	"gmail": String,
	/**
	 * User's eMail account for general correspondence.
	 * @property gmail
	 * @type String 
	 */
	"email": String,
	/**
	 * Describes where to contact the user, type is prepended as
	 * a protocol and is partially defined by parsing the contact
	 * string for patterns.
	 * @property contact
	 * @type String
	 */
	"contact": String,
	/**
	 * The minecraft user for this user
	 * @property minecraft
	 * @type String
	 */
	"minecraft": String,
	/**
	 * The steam user for this user
	 * @property steam
	 * @type String
	 */
	"steam": String,
	/**
	 * BattleNet Tag
	 * @property battlenet
	 * @type String
	 */
	"battlenet": String,
	/**
	 * League of Legends Main
	 * @property pvpnet
	 * @type String
	 */
	"pvpnet": String,
	/**
	 * When this User was last modified wise of properties
	 * or permissions.
	 * @proptery modified
	 * @type Number
	 */
	"modified": Number,
	/**
	 * Map of authorizations by grant for lookup. This is based on the
	 * authorizations array and stored for debugging.
	 * @property authorized
	 * @type Object
	 */
	"authorized": Schema.Types.Mixed,
	/**
	 * String array of session ObjectId's (This prevents
	 * other sessions from being exposed in links).
	 * @property sessions
	 * @type String
	 */
	"sessions": [String],
	/**
	 * List of seen IPs for security purposes.
	 * @property ips
	 * @type String
	 */
	"ips": [String]
});

var Model = this.model = configuration.connection.model("User", Schema);
