
/**
 * 
 * @module Elements
 * @main
 */
var Modification = this.Modification = require("./modification");
var Element = this.Element = require("./element");
var Event = this.Event = require("./event");
var Edge = this.Edge = require("./edge");
var Set = this.Set = require("./set");

var active = {};
this.element = {};
this.edge = {};

this.element.retrieve = function(session, description) {
	return eRetrieve(Element, session, description);
};

this.element.write = function(session, description) {
	return eWrite(Element, session, description);
};

this.element.drop = function(session, description) {
	return eDrop(Element, session, description);
};

this.edge.retrieve = function(session, description) {
	return eRetrieve(Edge, session, description);
};

this.edge.write = function(session, description) {
	return eWrite(Edge, session, description);
};

this.edge.drop = function(session, description) {
	return eDrop(Edge, session, description);
};


var eRetrieve = function(Constructor, session, description) {
	return new Promise(function(done, fail) {
		if(description.id) {
			if(active[description.id]) {
				done(active[description.id]);
			} else {
				Constructor.model.findOne({"id":description.id})
				.then(function(element) {
					done(element);
				})
				.catch(fail);
			}
		} else {
			fail(new Error("No ID present"));
		}
	});
};

var eWrite = function(Constructor, session, description) {
	return new Promise(function(done, fail) {
		var previous, resultant;
		
		if(description.id) {
			if(active[description.id]) {
				previous = JSON.stringify(active[description.id]);
				Object.assign(active[description.id], description);
				resultant = JSON.stringify(active[description.id]);
				active[description.id].save()
				.then(function() {
					done(active[description.id]);
					var mod = new Modification(session, previous, resultant);
					mod.save()
					.catch(function(err) {
						console.log("Failed to save modification: " + err.message, err.stack);
					});
				})
				.catch(fail);
			} else {
				Constructor.model.findOne({"id":description.id})
				.then(function(model) {
					if(model) {
						previous = JSON.stringify(model);
						Object.assign(model, description);
						resultant = JSON.stringify(model);
						model.save()
						.then(function() {
							done(model);
							var mod = new Modification(session, previous, resultant);
							mod.save()
							.catch(function(err) {
								console.log("Failed to save modification: " + err.message, err.stack);
							});
						})
						.catch(fail);
					} else {
						fail(new Error("Element not found"));
					}
				})
				.catch(fail);
			}
		} else {
			var model = new Constructor(session, description);
			model.save()
			.then(function() {
				previous = null;
				resultant = JSON.stringify(model);
				done(model);
				var mod = new Modification(session, previous, resultant);
				mod.save()
				.catch(function(err) {
					console.log("Failed to save modification: " + err.message, err.stack);
				});
			})
			.catch(fail);
		}
	});
};

var eDrop = function(Constructor, session, description) {
	return new Promise(function(done, fail) {
		var previous;
		Constructor.model.remove({"id":description.id})
		.then(function(model) {
			previous = JSON.stringify(model);
			done(model);
			var mod = new Modification(session, previous);
			mod.save()
			.catch(function(err) {
				console.log("Failed to save modification: " + err.message, err.stack);
			});
		})
		.catch(fail);
	});
};
