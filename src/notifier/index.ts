import path from 'path';
import logger from '../utils/logger';
import TelegramBot from 'node-telegram-bot-api';
import { ScraperResultDto, ScraperItemDto } from '../scraper/types.d';
import Scraper from '../scraper/';

import './telegram';

export enum Clients {
  TELEGRAM = 'telegram',
}

function createLogMsg(scrapers: ScraperResultDto[]): string {
  const messages: string[] = [];

  scrapers.forEach((scraper) => {
    scraper.result.forEach((item) => {
      item.data.forEach((itemData) => {
        const icon = itemData.isAvailable ? '✅' : '❌';
        const message = `${itemData.page} ${icon}\n`;
        messages.push(message);
      });
    });
  });

  return messages.join('');
}

function createPSMessages(scraperItems: ScraperItemDto[]) {
  const messages: string[] = [];

  scraperItems.forEach((item) => {
    item.data.forEach((itemData) => {
      if (itemData.isAvailable) {
        const message = [
          '<b>The PS5 is available</b>\n',
          `Shop: ${item.name}\n`,
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
      case Scraper.scrapers.PS:
        messages.push(...createPSMessages(scraper.result));
        break;

      default:
        logger.error(`Cannot create message for scraper: ${scraper.name}`);
        break;
    }
  });

  return messages;
}

export function notify(
  clients: string[],
  message: string,
  opt?: TelegramBot.SendMessageOptions,
): Promise<[]> {
  return Promise.all(
    clients.map(async (client) => {
      const module = await import(path.resolve(__dirname, client));
      return await module.default(message, opt);
    })
  )
    .then(async (result) => {
      return result as [];
    })
    .catch((error) => {
      logger.error('[Notifier] Error has occurred while register notifier');
      throw error;
    });
}

export default {
  notify,
  createMessages,
  createLogMsg,
  clients: Clients,
};
