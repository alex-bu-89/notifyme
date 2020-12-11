
import { Browser, Page } from 'puppeteer';
import { sendScreenshot } from '../../utils/telegramBot';
import { PageDto, ScraperPageDto } from '../types.d';

/**
 * Is product available
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

      // screenshot debugging
      if (process.env.DEBUG && process.env.DEBUG.includes(pageDto.name)) {
        await sendScreenshot(page);
      }

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
