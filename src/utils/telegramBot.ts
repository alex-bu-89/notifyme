import TelegramBot from 'node-telegram-bot-api';
import { Page } from 'puppeteer';
import logger from '../utils/logger';

export const chatId = process.env.CHAT_ID!;
export const token = process.env.TELEGRAM_TOKEN!;
export const bot: TelegramBot = new TelegramBot(token, { polling: false });

/**
 * Sends screenshot of the page to telegram chat
 */
export async function sendScreenshot(page: Page) {
  logger.debug(`Send screenshot ${page.url()}`);

  const rawScreenshot = await page.screenshot({
    encoding: 'binary',
  });

  return await bot.sendPhoto(chatId, Buffer.from(rawScreenshot.toString('base64'), 'base64'));
}
