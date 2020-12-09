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
  console.log('------------>', JSON.stringify(result, null, 2));
  Notifier.register([Notifier.clients.TELEGRAM], 'Hello world');
  return message.success(result as object);
}
