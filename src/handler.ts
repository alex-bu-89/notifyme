// import { TEvent, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import message from './utils/message';
import logger from './utils/logger';
import Scraper from './scraper/';
import Notifier from './notifier/';

const dotenvPath = path.join(__dirname, '../', 'config/.env');
const result = dotenv.config({
  path: dotenvPath,
});

if (result.error) {
  logger.error(`dotenv.config error ${result.error}`);
}

export async function notify() {
  const result = await Scraper.register([Scraper.scrapers.PS]);
  // @TOTO weird result structure
  await Notifier.register([Notifier.clients.TELEGRAM], 'Hello world');
  logger.info(`Result is: ${JSON.stringify(result, null, 2)}`);
  return message.success(result as object);
}
