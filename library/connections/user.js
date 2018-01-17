
var Random = require("../util/random");


/**
 * 
 * @class User
 * @constructor
 * @param {Object} details
 */
module.exports = function(id, details) {
	var user = this;
	
	fields.forEach(function(key) {
		user[key] = details[key];
		delete(details[key]);
	});
	
	/**
	 * 
	 * @property username
	 * @type String
	 */
	
	/**
	 * 
	 * @property id
	 * @type String
	 */
	
	/**
	 * Field values for arbitrary data.
	 * @property data
	 * @type Object
	 */
	this.data = details;
	
	if(users.names[user.username] || users.ids[user.username]) {
		throw new Error("Invalid ")
	}
};

var fields = ["username", "id"];

var users = {};
users.names = {};
users.ids = {};

module.exports.get = function(id) {
	return users.ids[id] || users.names[id];
};

/**
 * Return an identifier for a User.
 * @method userID
 * @static
 * @private
 * @return {String} A string for identifying an event. 
 */
var userID = function() {
	var id;
	do {
		id = "urID" + Random.string(32);
	} while(users.ids[id]);
	return id;
};
