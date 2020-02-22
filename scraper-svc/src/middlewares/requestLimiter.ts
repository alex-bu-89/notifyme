import express from 'express';
import {
    RateLimiterMemory,
    RLWrapperBlackAndWhite
} from 'rate-limiter-flexible';
import logger from '../utils/logger';
import utils from '../utils/utils';

// IP black list
const IP_BLACKLIST: string[] = [];

// add ips to black list from env variable
if (process.env?.IP_BLACKLIST?.length > 0) {
    process.env.IP_BLACKLIST.split(',').forEach(ip => IP_BLACKLIST.push(ip));
    logger.info('IP blacklist ' + JSON.stringify(IP_BLACKLIST));
}

// wrapped rate limiter instance
const rateLimiter = new RLWrapperBlackAndWhite({
    limiter: new RateLimiterMemory({
        keyPrefix: 'middleware',
        blockDuration: 60 * 60 * 24 // block for 1 day
    }),
    blackList: IP_BLACKLIST,
    runActionAnyway: false
});

/**
 * Limits repeating requests by ip
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 * @param {*} rateLimiter rate-limiter-flexible instance
 */
export function requestLimiter(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const ip: string = utils.getIp(req);

    rateLimiter
        .consume(ip)
        .then(() => {
            return next();
        })
        .catch((err: any) => {
            err.status = 429;
            err.message = `Request rejected: ${ip}`;

            return next(err);
        });
}

export default requestLimiter;
