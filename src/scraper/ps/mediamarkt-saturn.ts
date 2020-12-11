
import { Browser, Page } from 'puppeteer';
import userAgent from 'user-agents';

import { PageDto, ScraperPageDto } from '../types.d';
import { sendScreenshot } from '../../utils/telegramBot';

/**
 * Is product available
 * @param page
 */
async function isAvailable(page: Page): Promise<boolean> {
  const cartBtn = await page.$('#pdp-add-to-cart-button');
  const cartBtnDisabled = await page.$('#pdp-add-to-cart-button[disabled]');
  const notAvailableSection = await page.$('div[data-test="pdp-product-not-available"]');

  return cartBtn !== null && cartBtnDisabled === null && notAvailableSection === null;
}

/**
 * Handles cookie popup
 */
async function handleCookie(page: Page) {
  const cookieBtn = '#privacy-layer-accept-all-button';

  if (await page.$(cookieBtn) !== null) {
    await page.click(cookieBtn);
  }

  return await Promise.resolve();
}

/**
 * Start point
 * @param pageData
 * @param browser
 */
export default async function run(pageDto: PageDto, browser: Browser): Promise<ScraperPageDto[]> {
  const result: ScraperPageDto[] = [];

  for (let i = 0; i < pageDto.urls.length; i++) {
    const url: string = pageDto.urls[i];

    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());

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
    result.push({
      title,
      isAvailable: available,
      page: url,
    });

    await page.close();
  }

  return Promise.resolve(result);
  // return await Promise.all(
  //   pageDto.urls.map(async (url: string) => {
  //     const page = await browser.newPage();
  //     await page.goto(url, { waitUntil: 'networkidle0' });

  //     const title = await page.evaluate(() => document.title);
  //     // logger.info(`Page title: ${title}`);

  //     // close cookie popups
  //     await handleCookie(page);

  //     // screenshot debugging
  //     if (process.env.DEBUG && process.env.DEBUG.includes(pageDto.name)) {
  //       await sendScreenshot(page);
  //     }

  //     // cart button exist
  //     const available = await isAvailable(page);
  //     const result: ScraperPageDto = {
  //       title,
  //       isAvailable: available,
  //       page: url,
  //     };

  //     return result;
  //   }),
  // );
}
