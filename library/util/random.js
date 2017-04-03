
/**
 * Provides static references to randomization functions.
 * @class Random
 * @constructor
 * @static
 */
var Random = function() {
	/* Self reference variable for within functions */
	var random = this;
	
	/**
	 * Quick reference array for generating random strings
	 * @private
	 * @property alphanumeric
	 * @type Array
	 */
	var alphanumeric = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	/**
	 * Return a floating point number.
	 * @method float
	 * @param {Number} range The range/spread in which the returned number
	 * 		should originate.
	 * @param {Number} [min] The minimum starting value to offset the returned
	 * 		number specified by the range. If omitted, the returned number is
	 * 		between 0 and this value.
	 * @return {Number} A number from within the specified range.
	 */
	this.float = function(range, min) {
		if(min) {
			return Math.random() * range + min;
		}
		return Math.random() * range;
	};

	/**
	 * Return an integer point number.
	 * @method int
	 * @param {Number} range The range/spread in which the returned number
	 * 		should originate.
	 * @param {Number} [min] The minimum starting value to offset the returned
	 * 		number specified by the range. If omitted, the returned number is
	 * 		between 0 and this value.
	 * @return {Integer} A number from within the specified range.
	 */
	this.int = function(range, min) {
		if(min) {
			return Math.floor(Math.random() * range) + min;
		}
		return Math.floor(Math.random() * range);
	};

	/**
	 * Return a String of the specified length.
	 * @method string
	 * @param {Number} len The length of the String to return.
	 * @return {String} A number from within the specified range.
	 */
	var this.string = function(len) {
		if(len) {
			var string = alphanumeric[random.int(alphanumeric.length)];
			while(string.length < len) {
				string += alphanumeric[random.int(alphanumeric.length)];
			}
			return string;
		} else {
			return null;
		}
	};
};

module.exports = new Random();
