import fetch from 'node-fetch';
import { Page } from 'puppeteer';
import logger from '../utils/logger';

export const chatId = process.env.CHAT_ID!;
export const token = process.env.TELEGRAM_TOKEN!;
const telegramApiUrl = `https://api.telegram.org/bot${token}`;

/**
 * Sends screenshot of the page to telegram chat
 */
// export async function sendScreenshot(page: Page) {
//   logger.debug(`Send screenshot ${page.url()}`);

//   const rawScreenshot = await page.screenshot({
//     encoding: 'binary',
//   });

//   return await bot.sendPhoto(chatId, Buffer.from(rawScreenshot.toString('base64'), 'base64'));
// }

/**
 * Sends message to telegram chanell
 * @param message
 * @param opt telegrams API opt
 */
export async function sendMessage(message: string, opt: any = {}) {
  const endpoint = `${telegramApiUrl}/sendMessage`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      ...opt,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    logger.error('Error while sending telegram message', {
      status: response.status,
      statusText: response.statusText,
    });
    return null;
  }

  const result = await response.json();
  logger.debug('Telegram message sent', { chatId, response, msg: message });
  return result;
}
