import express from "express";
import logger from "../utils/logger";

export function errorHandler(
	err: any,
	req: express.Request,
	res: express.Response,
	next: any
) {
	if (res.headersSent) {
		return next(err);
	}

	logger.error(err.message, err, req.header, req.body);

	res.status(500);
	res.render("error", { error: err });
}

export default errorHandler;
