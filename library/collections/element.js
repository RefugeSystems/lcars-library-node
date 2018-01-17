/**
 * 
 * @class Element
 * @constructor
 * @param {Object} base Basic data for the Element such as ID, creater, updater, etc.
 * @param {Object} data Extended field information for the element such as a description,
 * 		metadata tags, etc. Anything in this object should be considered optional.
 */
module.exports = function(base, data) {
	Object.assign(this, base);
	this.data = data;
	
	if(!this.id) {
		throw new Error("No ID specified for Element");
	}
	
	/**
	 * 
	 * @property id
	 * @type String
	 */
	this.id = id;

	/**
	 * Describes who created this object
	 * @property creation
	 * @type SessionMarker
	 */
	this.creation = base.creation;
	
	/**
	 * Describes who modified this object
	 * @property modification
	 * @type SessionMArker
	 */
	this.modification = base.modification;
	
	/**
	 * When specified, this element should be considered as part of a specific set. This
	 * action of this should be to ignore links and elements that are not a member of that
	 * set.
	 * @property set
	 * @type String
	 */
	this.set = base.set;
	
	/**
	 * 
	 * @property data
	 * @type Object
	 */
	this.data = data;
};
