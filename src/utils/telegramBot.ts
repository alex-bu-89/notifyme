import TelegramBot from 'node-telegram-bot-api';

export const chatId = process.env.CHAT_ID!;
export const token = process.env.TELEGRAM_TOKEN!;
export const bot: TelegramBot = new TelegramBot(token, { polling: false });

// export function getChatId(): string {
//   return process.env.CHAT_ID!;
// }

// export function getToken(): string {
//   return process.env.TELEGRAM_TOKEN!;
// }

// export const getBot = () => {
//   if (!bot) {
//     bot = new TelegramBot(getToken(), { polling: false });
//   }

//   return bot;
// };
