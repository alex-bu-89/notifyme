// import { TEvent, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import responseUtil from './utils/message';
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
  const msgs = Notifier.createMessages(result);

  if (msgs.length > 0) {
    await Promise.all(msgs.map(async (msg) => {
      await Notifier.register([Notifier.clients.TELEGRAM], msg);
    }));
  } else {
    // const msg = `<b>No products available</b>\n${new Date().toString()}\n<pre>${JSON.stringify(result)}</pre>`;
    // await Notifier.register([Notifier.clients.TELEGRAM], msg, true);
  }

  logger.info(`Result: ${JSON.stringify(result)}`);
  return responseUtil.success(result as object);
}
