import path from 'path';
import chromium from 'chrome-aws-lambda';
import { Browser } from 'puppeteer';
import logger from '../utils/logger';
import { ScraperItemDto, ScraperResultDto } from './types.d';

// @TODO fix missing files with dynamic imports
import './ps';

export enum Scrapers {
  PS = 'ps',
}

export async function register(scrapers: string[]): Promise<ScraperResultDto[]> {
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
    const scraperResult: ScraperItemDto[] = await module.default(browser);
    const result: ScraperResultDto = {
      name: scraper,
      result: scraperResult,
    };

    return result;
  }))
  .then(async (result) => {
    await browser.close();
    return result;
  })
  .catch((error) => {
    logger.error('[Scraper] Error has occurred while register scrapers');
    throw error;
  });
}

export default {
  register,
  scrapers: Scrapers,
};
