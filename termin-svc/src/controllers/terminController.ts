import { Request, Response } from 'express';
import config from 'config';
import scraperService from '../services/scraperService';

/**
 * GET /
 * Index route
 */
export async function getAll(req: Request, res: Response) {
    const termins = await scraperService.getTermins();
	res.json([{id: 0, email: 'foo@bar.com', name: 'Baz'}]);
}

export default {
	getAll
};
