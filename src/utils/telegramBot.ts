import TelegramBot from 'node-telegram-bot-api';

export const chatId = process.env.CHAT_ID!;
export const token = process.env.TELEGRAM_TOKEN!;
export const bot: TelegramBot = new TelegramBot(token, { polling: false });
