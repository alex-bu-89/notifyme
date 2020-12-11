// import { TEvent, Context } from 'aws-lambda';
import './utils/config';
import responseUtil from './utils/message';
// import logger from './utils/logger';
import Scraper from './scraper/';
import Notifier from './notifier/';

export async function notify() {
  const result = await Scraper.scrape([Scraper.scrapers.PS]);
  const msgs = Notifier.createMessages(result);

  if (msgs.length > 0) {
    await Promise.all(msgs.map(async (msg) => {
      await Notifier.notify([Notifier.clients.TELEGRAM], msg);
    }));
  } else {
    const msg = `<b>No products available</b>\n${new Date().toString()}\n<pre>${JSON.stringify(result)}</pre>`;
    await Notifier.notify([Notifier.clients.TELEGRAM], msg, true);
  }

  return responseUtil.success(result as object);
}
