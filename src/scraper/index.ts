import path from 'path';
import chromium from 'chrome-aws-lambda';
import { Browser } from 'puppeteer';
import logger from '../utils/logger';
import { ScraperResultDto } from './types.d';

// @TODO fix missing files with dynamic imports
import './ps';

export enum Scrapers {
  PS = 'ps',
}

export async function register(scrapers: string[]) {
  logger.info(`Start scraping: ${JSON.stringify(scrapers)}`);

  const browser: Browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: process.env.HEADLESS === 'false' ? false : true,
    ignoreHTTPSErrors: true,
  });

  const version = await browser.version();
  logger.info(`Running browser: ${version}`);

  return Promise.all(scrapers.map(async (scraper) => {
    const module = await import(path.resolve(__dirname, scraper));
    const scraperResult: ScraperResultDto[] = await module.default(browser);
    return {
      [scraper]: scraperResult,
    };
  }))
  .then(async (result) => {
    await browser.close();
    return result;
  })
  .catch((error) => {
    logger.error('[Scraper] Error has occurred while register scrapers', error);
  });
}

export default {
  register,
  scrapers: Scrapers,
};
