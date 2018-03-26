
var configuration = require("a-configuration");
var EventEmitter = require("events");
var core = {};

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

var emitter = new EventEmitter();
this.listen = emitter.listen;
this.once = emitter.once;
this.off = emitter.off;
this.on = emitter.on;

configuration
._await
.then(function() {
	var x, csp = "default-src 'self'";
	for(x=0; x<configuration.domains.length; x++) {
		csp += " https://" + configuration.domains[x];
		csp += " http://" + configuration.domains[x];
		csp += " wss://" + configuration.domains[x];
		csp += " ws://" + configuration.domains[x];
	}
	
	var authentication = require("./connections/authentication");
	var Terminal = require("./connections/terminal");
	var Library = require("./library");
	
	var bodyParser = require("body-parser");
	var express = require("express");
	var WebSocket = require("ws");
	var https = require("https");
	var util = require("util");
	var url = require("url");
	var fs = require("fs");

	var server = express();
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use("/tower/auth", authentication);
	server.use(function(req, res, next) {
		res.setHeader("Content-Security-Policy", csp);
		next();
	});

	var key = fs.readFileSync(configuration.server.key || "/opt/ssl-tower.key", "utf-8");
	var crt = fs.readFileSync(configuration.server.crt || "/opt/ssl-tower.crt", "utf-8");
	var listener = https.createServer({
		"key": key,
		"cert": crt 
	}, server);
	
	var library = new Library(configuration);
	var terminals = [];
	
	var socketserver = new WebSocket.Server({"server": listener});
	socketserver.on("connection", function(ws, req) {
		var location = url.parse(req.url, true);
		console.log("Location: ", location);
		var terminal = new Terminal(ws, library);
		terminals.push(terminal);
		emitter.emit("connection", terminal);
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
	emitter.emit("listening", {
		"port": configuration.server.port
	});
});
