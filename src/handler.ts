// import { TEvent, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import message from './utils/message';
// import logger from './utils/logger';
import { register, Scrapers } from './scraper/';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

export async function notify() {
  const result = await register([Scrapers.PS]);

  return message.success(result as object);
}
