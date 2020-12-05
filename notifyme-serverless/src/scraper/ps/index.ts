import path from 'path';
import logger from '../../utils/logger';
import { Page } from '../types';

// @TODO fix missing files with dynamic imports
import './amazon';

const pages: Page[] = [
  { name: 'amazon', url: 'https://www.amazon.de/Sony-PlayStation-5-Digital-Edition/dp/B08H98GVK8' },
];

export default async function run(browser) {
  return Promise.all(pages.map(async (page) => {
    const module = await import(path.resolve(__dirname, page.name));
    module.default(page, browser);
  }))
  .catch((error) => {
    logger.error('Error has occurred while scraping the page', error);
  });
}
