// import { TEvent, Context } from 'aws-lambda';
import './utils/config';
import responseUtil from './utils/message';
// import logger from './utils/logger';
import Scraper from './scraper/';
import Notifier, { NOTIFIER_CLIENTS } from './notifier/';

export async function notify() {
  const result = await Scraper.scrape([Scraper.scrapers.PS]);
  const msgs = Notifier.createMessages(result);

  // log every notify call
  const logMsg = Notifier.createLogMsg(result);

  await Notifier.notify([NOTIFIER_CLIENTS.TELEGRAM], logMsg, {
    disable_web_page_preview: true,
    disable_notification: true,
  });

  if (msgs.length > 0) {
    await Promise.all(msgs.map(async (msg) => {
      await Notifier.notify([NOTIFIER_CLIENTS.TELEGRAM], msg);
    }));
  }

  // for debug
  if (process.env.DEBUG) {
    const msg = `<b>No products available</b>\n${new Date().toString()}\n<pre>${JSON.stringify(result, null, 2)}</pre>`;
    await Notifier.notify([NOTIFIER_CLIENTS.TELEGRAM], msg, { disable_notification: true });
  }

  return responseUtil.success(result as object);
}
