import TelegramBot from 'node-telegram-bot-api';
import { chatId, bot } from '../utils/telegramBot';
import logger from '../utils/logger';

export default async function run(message: string, opt?: TelegramBot.SendMessageOptions) {
  const options = opt || {};
  const result = await bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    ...options,
  });
  logger.debug('Telegram message sent', { chatId, msg: message });

  return result;
}
