import path from 'path';
import logger from '../utils/logger';

// @TODO fix missing files with dynamic imports
import './ps';

export enum Scrapers {
  PS = 'ps',
}

export function register(scrapers: string[]) {
  Promise.all(scrapers.map(async (scraper) => {
    const module = await import(path.resolve(__dirname, scraper));
    await module.default();
  }))
  .catch((error) => {
    logger.error('Error has occurred while register scrapers', error);
  });
}

export default {
  register,
};
