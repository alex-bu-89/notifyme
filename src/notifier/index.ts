import path from 'path';
import logger from '../utils/logger';
import { ScraperResultDto, ScraperItemDto } from '../scraper/types.d';
import { Scrapers } from '../scraper/';

import './telegram';

export enum Clients {
  TELEGRAM = 'telegram',
}

function createPSMessages(scraperItems: ScraperItemDto[]) {
  const messages: string[] = [];

  scraperItems.forEach((item) => {
    item.data.forEach((itemData) => {
      if (itemData.isAvailable) {
        const message = [
          '<b>The PS5 is available</b>\n',
          `Title: ${itemData.title}\n`,
          `<a href="${itemData.page}">To the page</a>`,
        ].join('');

        messages.push(message);
      }
    });
  });

  return messages;
}

export function createMessages(data: ScraperResultDto[]) {
  const messages: string[] = [];

  data.forEach((scraper) => {
    switch (scraper.name) {
      case Scrapers.PS:
        messages.push(...createPSMessages(scraper.result));
        break;

      default:
        logger.error(`Cannot create message for scraper: ${scraper.name}`);
        break;
    }
  });

  return messages;
}

export function register(clients: string[], message: string): Promise<[]> {
  return Promise.all(clients.map(async (client) => {
    const module = await import(path.resolve(__dirname, client));
    return await module.default(message);
  }))
  .then(async (result) => {
    return result as [];
  })
  .catch((error) => {
    logger.error('[Notifier] Error has occurred while register notifier');
    throw error;
  });
}

export default {
  register,
  createMessages,
  clients: Clients,
};
