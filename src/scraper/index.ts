import path from 'path';
import chromium from 'chrome-aws-lambda';
import logger from '../utils/logger';

// @TODO fix missing files with dynamic imports
import './ps';

export enum Scrapers {
  PS = 'ps',
}

export async function register(scrapers: string[]) {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  return Promise.all(scrapers.map(async (scraper) => {
    const module = await import(path.resolve(__dirname, scraper));
    return await module.default(browser);
  }))
  .then(async (result) => {
    await browser.close();
    return result;
  })
  .catch((error) => {
    logger.error('Error has occurred while register scrapers', error);
  });
}

export default {
  register,
};
