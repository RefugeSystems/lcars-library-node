
var express = require("express");
var passport = require("passport");
var Strategy = require("passport-google-oauth20").Strategy;
var configuration = require("a-configuration");
var Session = require("./session");

var extractProfile = function(profile) {
	var image = "none";
	if (profile.photos && profile.photos.length) {
		image = profile.photos[0].value;
	}
	var email = "none";
	if(profile.emails) {
		for(var x=0;x<profile.emails.length;x++) {
			email = profile.emails[x].value;
			if(profile.emails[x].type === "account") {
				break;
			}
		}
	}

	return {
		"id": profile.id,
		"display": profile.displayName,
		"image": image,
		"email": email
	};
};

passport.use(new Strategy({
		"clientID": configuration.passport.OAUTH2_CLIENT_ID,
		"clientSecret": configuration.passport.OAUTH2_CLIENT_SECRET,
		"callbackURL": configuration.passport.OAUTH2_CALLBACK,
		"accessType": "offline"
	}, function (req, accessToken, refreshToken, profile, done) {
		var now = Date.now();
		var session = random.string(128) + btoa(random.string(16) + req + now);
		var connector = random.string(32);
		var user = extractProfile(profile);
		User.findOne({"gmail": user.email})
		.then(function(rsuser) {
			console.log("User Retrieved:\n", rsuser);
			if(!rsuser) {
				rsuser = new User({
					"name": user.display,
					"image": user.image,
					"username": user.email,
					"gmail": user.email,
					"email": user.email,
					"contact": "mailto:" + user.email,
					"sessions": [],
					"ips": []
				});
			}
			session = new Session({
				"username": rsuser.username,
				"source": req,
				"ips": [],
				"authenticated": now,
				"authenticator": session,
				"connector": connector,
				"last": now,
				"user": rsuser._id
			});
			session.save()
			.then(function(saved) {
				console.log("Session Saved...");
				rsuser.sessions.push(saved._id);
				rsuser.save()
				.then(function() {
					console.log("User Saved...");
					done(null, {"session": session, "user": rsuser});
					console.log("...Done");
				});
			});
		})
		.catch(function(err) {
			done(err, user);
		});
	})
);

passport.serializeUser(function(req, processing, done) {
	req._session = processing.session;
	req._session.srcip = req.ip;
	req._session.save();
	
	if(processing.user.ips.indexOf(req.ip) === -1) {
		processing.user.ips.push(req.ip);
		processing.user.save();
	}
	done(null, req._session);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

var passport = passport;

var passportIn = passport.authenticate("google", { scope: ["email", "profile"] });

var passportBack = passport.authenticate("google", { scope: ["email", "profile"], failureRedirect: "https://refugesystems.net/#/?login=" });

var passportIncoming = function(req, res, next) {
	console.log("Passport Incoming...");
	logger.info({"point":"authenticating", "req":req});
	next();
};

var passportProcess = function(req, res, next) {
	logger.info({"point":"authenticated", "req":req});
	util.log("Passport Processing:\n", req.originalUrl);
	next();
};

var finalize = function(req, res, next) {
	if(req._session) {
		console.log("Finalizing Processing:\n", req._session);
		res.redirect("https://refugesystems.net/#/?login=" + req._session.connector);
	}
};

var connect = function(req, res, next) {
	var connector = req.body.login || req.query.login;
	Session.findOne({"connector":connector})
	.then(function(session) {
		if(session) {
			session.connector = undefined;
			session.save()
			.then(function() {
				res.json({"session": session.authenticator});
			});
		} else {
			next({
				"message": "Session not found. Either already consumed, or bad request",
				"code": 1,
				"status": 401
			});
		}
	})
	.catch(next);
};

/**
 * Middleware for validating user access to the requested resource.
 * @method authorization
 * @type Middleware
 */
var authorize = function(req, res, next) {
	var authenticator = req.get("x-authenticator");
	if(authenticator) {
		Session.findOne({"id":authenticator})
		.then(function(session) {
			if(session) {
				var now = Date.now();
				if(now - session.last >= configuration.passport.ttl) {
					// TODO: Instead of removing, Queue for final security review once Ares exists
					Session.remove({"id":authenticator})
					.then(function() {
						next();
					});
				} else {
					session.ips = session.ips || [];
					if(session.ips.indexOf(req.ip) === -1) {
						session.ips.push(req.ip);
					}
					session.last = now;
					req._session = session;
					session.save()
					.then(function() {
						next();
					});
				}
			} else {
				next();
			}
		})
		.catch(next);
	} else {
		next();
	}
};

var signOut = function(req, res, next) {
	var session = req._session || {"id":"1"};
	Session.remove({"id":session.authenticator})
	.then(function(removed) {
		res.json({
			"message": "Session deleted"
		});
	})
	.catch(next);
};

var router = express.Router();
router.use(passport.initialize());
router.get("/google" , passportIn);
router.post("/google", passportIn);
router.get("/google/callback" , passportBack);
router.post("/google/callback", passportBack);
router.use(finalize);

module.exports = router;
