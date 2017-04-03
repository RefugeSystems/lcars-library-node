
var Schema = require("mongoose").Schema;
var Petition = require("./petition.js");

module.exports = new require("mongoose").Schema({

	/**
	 * Serves as a general descriptor for the anomaly.
	 * @property code
	 * @type String
	 * @for Anomaly
	 */
	"code": String,

	/**
	 * 
	 * @property petition
	 * @type Petition
	 * @for Anomaly
	 */
	"petition": Petition,

	/**
	 * 
	 * @property error
	 * @type Object
	 * @for Anomaly
	 */
	"error": Schema.Types.Mixed,

	/**
	 *  
	 * @property message
	 * @type String
	 * @for Anomaly
	 */
	"message": String,

	/**
	 * 
	 * @property action
	 * @type Object
	 * @for Anomaly
	 */
	"stack": Schema.Types.Mixed,

	/**
	 * When the Anomaly occurred.
	 * @property occurred
	 * @type Number
	 * @for Anomaly
	 */
	"occurred": Number
});
