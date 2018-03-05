
var Schema = require("mongoose").Schema;

module.exports = new Schema({

	/**
	 * Authorizing key for activity from this petition.
	 * @property authorization
	 * @type String
	 * @for Petition
	 */
	"authorization": String,

	/**
	 * 
	 * @property tracking
	 * @type String
	 * @for Petition
	 */
	"tracking": String,

	/**
	 * The collection to access from within the library. 
	 * @property classification
	 * @type String
	 * @for Petition
	 */
	"classification": String,

	/**
	 * 
	 * @property action
	 * @type String
	 * @for Petition
	 */
	"action": String,

	/**
	 * When this petition was received by the library
	 * @property received
	 * @type Number
	 * @for Petition
	 */
	"received": Number,

	/**
	 * When this petition was sent by the terminal
	 * @property sent
	 * @type Number
	 * @for Petition
	 */
	"sent": Number,

	/**
	 * Array of text indicating the materials to be returned in
	 * response to the petition.
	 * @property numbering
	 * @type String
	 * @for Petition
	 */
	"numbering": [String],

	/**
	 * Array of Strings for differentiating the material to return
	 * for the petition.
	 * @property metadata
	 * @type String
	 * @for Petition
	 */
	"metadata": [String],

	/**
	 * Changes to apply to the subsequent materials indexed by the
	 * fields numbered off of the delta specifications.
	 * @property deltas
	 * @type Object
	 * @for Petition
	 */
	"deltas": Schema.Types.Mixed
});
