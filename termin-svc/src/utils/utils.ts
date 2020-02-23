import { Request } from 'express';

/**
 *
 * @param req
 */
export function getIp(req: Request) {
	const forwarded: string = req.headers['x-forwarded-for'] as string;
	const ip: string = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

	return ip;
}

export default {
  getIp
};
