import path from 'path';
import puppeteer from 'puppeteer';
import logger from '../../utils/logger';
import { getChrome } from '../../utils/chrome';
import { Page } from '../index.d';

// @TODO fix missing files with dynamic imports
import './amazon';

const pages: Page[] = [
  { name: 'amazon', url: 'https://www.amazon.de/Sony-PlayStation-5-Digital-Edition/dp/B08H98GVK8' },
];

export default async function run() {
  logger.info('running scraping');

  const chrome = await getChrome();

  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint,
  });

  return Promise.all(pages.map(async (page) => {
    const browserPage = await browser.newPage();
    await browserPage.goto(page.url, { waitUntil: 'networkidle0' });
    const content = await browserPage.evaluate(() => document.body.innerHTML);
    logger.info(content);
    // const module = await import(path.resolve(__dirname, page.name));
    // module.default(page);
  }))
  .catch((error) => {
    logger.error('Error has occurred while scraping the page', error);
  });
}
