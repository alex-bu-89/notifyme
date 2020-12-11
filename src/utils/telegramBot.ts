import TelegramBot from 'node-telegram-bot-api';
import { Page } from 'puppeteer';

export const chatId = process.env.CHAT_ID!;
export const token = process.env.TELEGRAM_TOKEN!;
export const bot: TelegramBot = new TelegramBot(token, { polling: false });

/**
 * Sends screenshot of the page to telegram chat
 */
export async function sendScreenshot(page: Page) {
  const rawScreenshot = await page.screenshot({
    encoding: 'binary',
  });

  return await bot.sendPhoto(chatId, Buffer.from(rawScreenshot.toString('base64'), 'base64'));
}
