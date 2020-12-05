import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import message from './utils/message';
import { register, Scrapers } from './scraper/';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

export const notify: Handler = (event: any, context: Context) => {
  register([Scrapers.PS]);

  return Promise.resolve(message.success({ message: 'test' }));
};
