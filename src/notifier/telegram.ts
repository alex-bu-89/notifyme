import { getBot, getChatId } from '../utils/telegramBot';
import logger from '../utils/logger';

export default async function run(message: string) {
  const bot = getBot();
  const chatId = getChatId();
  const result = await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  logger.debug('Telegram message sent', { chatId, msg: message });

  return result;
}
