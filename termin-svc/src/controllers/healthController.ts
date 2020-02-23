import { Request, Response } from 'express';

/**
 * GET /
 * Healthcheck route
 */
export function index(req: Request, res: Response) {
	res.json({ status: 'OK' });
}
