
var configuration = require("a-configuration");
var core = {};

console.log("Build");
configuration
._await
.then(function() {
	console.log("Init");
	var authentication = require("./connections/authentication");
	var cspBuilder = require("content-security-policy-builder");
	var bodyParser = require("body-parser");
	var express = require("express");
	var WebSocket = require("ws");
	var https = require("https");
	var util = require("util");
	var url = require("url");
	var fs = require("fs");

	var contentSecurityPolicy = function(req, res, next) {
		var csp = {
			directives: {
				"default-src": ["'self'", "refugesystems.net", "tower.refugesystems.net"]
			}
		};

		console.log("Set Policy: ", csp);
		res.setHeader("Content-Security-Policy", "default-src 'self' https://refugesystems.net:3000 https://tower.refugesystems.net:3000 ws://tower.refugesystems.net:3000 wss://tower.refugesystems.net:3000; connect-src 'self' https://refugesystems.net:3000 https://tower.refugesystems.net:3000 ws://tower.refugesystems.net:3000 wss://tower.refugesystems.net:3000");
		console.log("Policies: ", res.get("Content-Security-Policy"));
		next();
	};
	
	var server = express();
//	server.use(contentSecurityPolicy);
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use("/tower/auth", authentication);
	server.use(contentSecurityPolicy);
	server.get("/", function(req, res) {
		res.send("hi");
	});

	var key = fs.readFileSync(configuration.server.key || "/opt/ssl-tower.key", "utf-8");
	var crt = fs.readFileSync(configuration.server.crt || "/opt/ssl-tower.crt", "utf-8");
	var listener = https.createServer({
		"key": key,
		"cert": crt 
	}, server);

	var onError = function(error) {
		switch(error.code) {
			case "EACCES":
				console.log(configuration.server.port + " requires elevated privileges");
				process.exit(1);
				break;
			case "EADDRINUSE":
				console.log(configuration.server.port + " is already in use");
				process.exit(1);
				break;
			default:
				console.log("Errored: ", error);
				throw error;
		}
	};

	var onListening = function() {
		console.log("Listening on port " + configuration.server.port);
	};
	
	var socketserver = new WebSocket.Server({"server": listener});
	
	socketserver.on("connection", function(ws, req) {
		console.log("New Connection - " + req.url);
		var location = url.parse(req.url, true);
		
		ws.on("message", function(message) {
			console.log("Message: ", message);
		});
		
		ws.on("close", function() {
			console.log("Close Connection");
		});
	});
	
	socketserver.on("close", function(ws, req) {
		console.log("Socket Server Closed: ", ws, req);
	});
	
	socketserver.on("open", function(ws, req) {
		console.log("Socket Server Open: ", ws, req);
	});
	
	socketserver.on("mount", function(ws, req) {
		console.log("Socket Server Mount: ", ws, req);
	});
	
	socketserver.on("listening", function(ws, req) {
		console.log("Socket Server Listening");
	});
	
	socketserver.on("upgrade", function(ws, req) {
		console.log("Socket Server Upgrade: ", ws, req);
	});
	
	socketserver.on("error", function(ws, req) {
		console.log("Socket Server Error: ", ws, req);
	});

	listener.on("error", onError);
	listener.on("listening", onListening);
	listener.listen(configuration.server.port);
	console.log("Up");
});

this.addLibrary = function(library) {
	return new Promise(function(done, fail) {
		configuration._await
		.then(function() {
			
		})
		.catch(fail);
	});
};