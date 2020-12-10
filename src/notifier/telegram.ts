import TelegramBot from 'node-telegram-bot-api';
import logger from '../utils/logger';

export default async function run(message: string) {
  const chatId = process.env.CHAT_ID;
  const token = process.env.TELEGRAM_TOKEN;

  if (!token) throw new Error(`process.env.TELEGRAM_TOKEN is required; token: ${token}`);
  if (!chatId) throw new Error(`process.env.CHAT_ID is required; chatId:${chatId}`);

  const bot = new TelegramBot(token, { polling: false });
  const result = await bot.sendMessage(chatId, message);
  logger.info('Telegram message sent', { chatId, msg: message });

  return result;
}
