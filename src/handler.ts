import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import message from './utils/message';
import { register, Scrapers } from './scraper/';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

console.log('------------> DEBUG', process.env.DEBUG);

export async function notify(event: any, context: Context): Handler {
  const result = await register([Scrapers.PS]);

  return Promise.resolve(message.success(result));
};
