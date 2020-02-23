import config from 'config';
import { Request, Response } from 'express';

/**
 * GET /
 * Index route
 */
export function index(req: Request, res: Response) {
	res.json({
		message: `Service ${config.get('serviceName')} is running`,
		status: 200
	});
}
