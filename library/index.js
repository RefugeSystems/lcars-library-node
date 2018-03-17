
/**
 * Library - Access/Retrieval server for the LCARS system
 * 
 * The library serves as an endpoint for specific collections as designated by the
 * configuration. A websocket is used to synchronize collections being provided to
 * various registrations, allowing for multiple displays to synchronize displayed
 * data.
 * 
 * @class Library
 * @constructor
 * @param {Handler} handler
 */
module.exports = function(handler) {
	var configuration = require("a-configuration");
	configuration
	._await
	.catch(function(error) {
		console.log("Configuration Error: ", error, error.stack);
	});

	configuration
	._await
	.then(function() {
		var Modification = require("./elements/modification");

		/* https://github.com/websockets/ws */
		var WebSocket = require("ws");
		var ws = new WebSocket.Server(configuration.listening);
		// Note: The ssl_key and ssl_cert fields are treated as file paths by WS, so no pre-loading is needed
		// Note: Acceptable origin is specified as an argument under the "origin" field. Library maybe too simple for multiple origins on the same socket.

		ws.on("connection", function(socket) {
			socket.on("text", function(data) {
				console.log("Recv: " + data);
			});


			socket.on("message", function(data) {
				console.log("Message: ", data);
				try {
					if(data instanceof String) {
						data = JSON.parse(data);
					}
					data = new Modification(data);
					switch(data.key) {
					case "establish":
						break;
					case "destroy":
						break;
					case "access":
						break;
					case "update":
						break;
					case "read":
						break;
					case "delete":
						break;
					default:

					}
					console.log("Modification: ", data);
				} catch(exception) {
					console.log("Ex: ", exception, exception.stack);
					socket.send(JSON.stringify({"key": "error", "message": "Parse failure: " + exception.message, "error": exception}));
				}
			});

			socket.on("close", function(code, reason) {
				console.log("Socket closed[" + code + "]: " + reason);
			});

			socket.on("error", function(error) {
				console.log("Socket Error:\n", error);
			});
		});


		/**
		 * Occurs when a Petition connects to an AccessSet successfully.  
		 * @event establish
		 * @param {Petition} data
		 */
		var establish = function(data) {

		};


		/**
		 * Occurs when a Petition appears valid but suffers an exception. 
		 * @event malformed
		 * @param {Anomaly} data
		 */
		var malformed = function(data) {

		};

		/**
		 * Occurs when a Petition is received with an unknown event key.
		 * @event fault
		 * @param {Petition} data
		 */
		var fault = function(data) {

		};

		/**
		 * 
		 * @method broadcast
		 * @param {Object} message The message to send to indicated connections.
		 * @param [{String}] [sessions] When specified, only the indicated sessions
		 * 		will receive the message. 
		 */
		this.broadcast = function(message, sets) {

		};

		/**
		 * 
		 * @method terminate
		 * @param {String} session The identifier for the session to be terminated. 
		 */
		this.terminate = function(session) {

		};

		ws.on("listening", function(a, b, c) {
			console.log("listening:", configuration.listening);
		});

//		/**
//		* 
//		* @event connection
//		* @param {Socket} socket
//		* @private
//		*/
//		io.on("connection", function(socket) {
//		console.log("Connection received:\n", socket);

//		socket.on("text", function(data) {
//		console.log("text");
//		});

//		socket.on("error", function(data) {
//		console.log("error");
//		});

//		socket.on("message", function(data) {
//		console.log("message");
//		});

//		/**
//		* Establish or connect to a set of materials.
//		* @event establish
//		* @param {Petition} data
//		*/
//		socket.on("establish", function(data) {

//		});

//		/**
//		* If the creator of a set destroys it, it is removed. If not the creator,
//		* the originating session is merely disconnected.
//		* @event destroy
//		* @param {Petition} data
//		*/
//		socket.on("destroy", function(data) {

//		});

//		/**
//		* Modify an active material set to include of remove additional items.
//		* @event access
//		* @param {Petition} data
//		*/
//		socket.on("access", function(data) {

//		});

//		/**
//		* Modify an existing material in the library. If the target material does
//		* not exist, it is created.
//		* @event update
//		* @param {Petition} data
//		*/
//		socket.on("update", function(Data) {

//		});

//		/**
//		* Pull a set of material from the library without creating an active set.
//		* @event read
//		* @param {Petition} data
//		*/
//		socket.on("read", function(Data) {

//		});

//		/**
//		* Remove items from the library.
//		* @event delete
//		* @param {Petition} data
//		*/
//		socket.on("delete", function(Data) {

//		});

//		/**
//		* Establish or connect to a set of materials.
//		* @event establish
//		* @param {Petition} data
//		*/
//		socket.on("establish", function(data) {

//		});

//		/**
//		* Establish or connect to a set of materials.
//		* @event establish
//		* @param {Petition} data
//		*/
//		socket.on("examine", function(data) {
//		console.log("Examination:\n", data);
//		});
//		});
	});
};
