"use strict";

const config = require("../config/default.json");

const Koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");

// for passport support
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");

const app = new Koa();

exports.app = app;
exports.passport = passport;

// the auth model for passport support
// require("./models/auth");

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.site.secret];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// Error handling middleware
app.use(async(ctx,next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		await ctx.render("error", {
			message: err.message,
			error: {}
		});
	}
});

require("./routes");

console.log(`${config.site.name} is now listening on port ${config.site.port}`);
app.listen(config.site.port);

process.on("SIGINT", function exit() {
	process.exit();
});
