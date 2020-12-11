
import { Browser, Page } from 'puppeteer';
import { PageDto, ScraperPageDto } from '../types.d';
import { sendScreenshot } from '../../utils/telegramBot';

/**
 * Is product available
 * @param page
 */
async function isAvailable(page: Page): Promise<boolean> {
  const preorderH3 = await page.evaluate(() => {
    const el = document.querySelector('#info-preorder h3') as HTMLElement;
    return el && el.innerText;
  });

  return preorderH3 !== 'Sorry, PS5-Fans.';
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
