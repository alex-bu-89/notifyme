// import { TEvent, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import message from './utils/message';
import logger from './utils/logger';
import Scraper, { Scrapers } from './scraper/';

const dotenvPath = path.join(__dirname, '../', 'config/.env');
console.log('------------>', dotenvPath);
const result = dotenv.config({
  path: dotenvPath,
});

if (result.error) {
  logger.error(`dotenv.config error ${result.error}`);
}

export async function notify() {
  const result = await Scraper.register([Scrapers.PS]);

  return message.success(result as object);
}
