
import { Browser, Page } from 'puppeteer';
import { getBot, getChatId } from '../../utils/telegramBot';
import { PageDto, ScraperPageDto } from '../types.d';
// import logger from '../../utils/logger';

/**
 * is product available
 * @param page
 */
async function isAvailable(page: Page): Promise<boolean> {
  return await page.$('#add-to-cart-button') !== null;
}

/**
 * Handles cookie popup
 */
async function handleCookie(page: Page) {
  const cookieBtn = 'input[data-cel-widget="sp-cc-accept"]';
  const cookieBtn2 = '#sp-cc-accept';
  if (await page.$(cookieBtn) !== null) {
    await page.click(cookieBtn);
  }
  if (await page.$(cookieBtn2) !== null) {
    await page.click(cookieBtn2);
  }

  return await Promise.resolve();
}

/**
 * Handles cookie popup
 */
async function sendScreenshot(page: Page) {
  const bot = getBot();
  const chatId = getChatId();

  // create screenshot
  const rawScreenshot = await page.screenshot({
    encoding: 'binary',
  });

  return await bot.sendPhoto(chatId, Buffer.from(rawScreenshot.toString('base64'), 'base64'));
}

/**
 * Start point
 * @param pageData
 * @param browser
 */
export default async function run(pageDto: PageDto, browser: Browser): Promise<ScraperPageDto[]> {
  return await Promise.all(
    pageDto.urls.map(async (url: string) => {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });

      const title = await page.evaluate(() => document.title);
      // logger.info(`Page title: ${title}`);

      // close cookie popups
      await handleCookie(page);

      // if (false) {
      //   await sendScreenshot(page);
      // }

      // cart button exist
      const available = await isAvailable(page);
      const result: ScraperPageDto = {
        title,
        isAvailable: available,
        page: url,
      };

      return result;
    }),
  );
}
