import path from 'path';
import { Browser } from 'puppeteer';
import logger from '../../utils/logger';
import { PageDto, ScraperItemDto, ScraperPageDto } from '../types';

// @TODO fix missing files with dynamic imports
import './amazon';
import './mediamarkt-saturn';
import './gamestop';
import './mueller';
import './medimax';

const pages: PageDto[] = [
  {
    name: 'amazon',
    urls: [
      'https://www.amazon.de/Sony-PlayStation-5-Digital-Edition/dp/B08H98GVK8',
      'https://www.amazon.de/Sony-PlayStation-5-Digital-Edition/dp/B08H93ZRK9?th=1',
      // 'https://www.amazon.de/-/en/dp/B08H9724CC/ref=sr_1_1?dchild=1&keywords=ps5&qid=1607258538&s=videogames&sr=1-1&th=1',
    ],
  },
  {
    name: 'mediamarkt-saturn',
    urls: [
      'https://www.mediamarkt.de/de/product/_sony-playstation%C2%AE5-2661938.html',
      'https://www.mediamarkt.de/de/product/_sony-playstation%C2%AE5-digital-edition-2661939.html',
      // 'https://www.mediamarkt.de/de/product/_sony-dualsense%E2%84%A2-2681392.html',
      'https://www.saturn.de/de/product/_sony-playstation%C2%AE5-2661938.html',
      'https://www.saturn.de/de/product/_sony-playstation%C2%AE5-digital-edition-2661939.html',
    ],
  },
  {
    name: 'mediamarkt-saturn',
    urls: [
      'https://www.mediamarkt.de/de/product/_sony-playstation%C2%AE5-2661938.html',
      'https://www.mediamarkt.de/de/product/_sony-playstation%C2%AE5-digital-edition-2661939.html',
      // 'https://www.mediamarkt.de/de/product/_sony-dualsense%E2%84%A2-2681392.html',
      'https://www.saturn.de/de/product/_sony-playstation%C2%AE5-2661938.html',
      'https://www.saturn.de/de/product/_sony-playstation%C2%AE5-digital-edition-2661939.html',
    ],
  },
  {
    name: 'gamestop',
    urls: [
      'https://www.gamestop.de/ps5',
    ],
  },
  {
    name: 'mueller',
    urls: [
      'https://www.mueller.de/multi-media/playstation-5/',
    ],
  },
  {
    name: 'medimax',
    urls: [
      'https://www.medimax.de/p/1315336/play-station-5-825gb-ssd',
    ],
  },
];

export default async function run(browser: Browser): Promise<ScraperItemDto[]>  {
  return Promise.all(
    pages.map(async (page) => {
      const module = await import(path.resolve(__dirname, page.name));
      const pageResult: ScraperPageDto[] = await module.default(page, browser);
      const result: ScraperItemDto = {
        name: page.name,
        data: pageResult,
      };
      return result;
    }),
  )
  .catch((error) => {
    logger.error('Error has occurred while scraping the page');
    throw error;
  });
}
