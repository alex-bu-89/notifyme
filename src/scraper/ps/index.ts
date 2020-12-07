import path from 'path';
import logger from '../../utils/logger';
import { Page } from '../types';

// @TODO fix missing files with dynamic imports
import './amazon';

const pages: Page[] = [
  {
    name: 'amazon',
    urls: [
      'https://www.amazon.de/Sony-PlayStation-5-Digital-Edition/dp/B08H98GVK8',
      'https://www.amazon.de/Sony-PlayStation-5-Digital-Edition/dp/B08H93ZRK9?th=1',
      'https://www.amazon.de/-/en/dp/B08H9724CC/ref=sr_1_1?dchild=1&keywords=ps5&qid=1607258538&s=videogames&sr=1-1&th=1',
    ],
  },
];

export default async function run(browser) {
  return Promise.all(
    pages.map(async (page) => {
      const module = await import(path.resolve(__dirname, page.name));
      const result = await module.default(page, browser);

      return {
        name: page.name,
        data: result,
      };
    }),
  ).catch((error) => {
    logger.error('Error has occurred while scraping the page', error);
  });
}
