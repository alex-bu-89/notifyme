import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import MessageUtil from './utils/message';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

export const notify: Handler = (_event: any, _context: Context) => {
  return Promise.resolve(MessageUtil.success({message: 'test'}));
};
