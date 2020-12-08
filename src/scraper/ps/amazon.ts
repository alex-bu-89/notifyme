import logger from '../../utils/logger';

/**
 * Handles cookie popup
 */
async function handleCookie(page) {
  const cookieBtn = 'input[data-cel-widget="sp-cc-accept"]';
  const cookieBtn2 = '#sp-cc-accept';
  if (await page.$(cookieBtn) !== null) {
    await page.click(cookieBtn);
  }
  if (await page.$(cookieBtn2) !== null) {
    await page.click(cookieBtn2);
  }
}

/**
 * is product available
 * @param page
 */
async function isAvailable(page): Promise<boolean> {
  return await page.$('#add-to-cart-button') !== null;
}

/**
 * Start point
 * @param pageData
 * @param browser
 */
export default async function run(pageData, browser) {
  logger.info('Start Amazon scraper');

  return await Promise.all(
    pageData.urls.map(async (url: string) => {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      // const content = await page.evaluate(() => document.body.innerHTML);

      // close cookie popup
      // await handleCookie(page);

      // cart button exist
      const available = await isAvailable(page);

      return {
        isAvailable: available,
        page: url,
      };
    }),
  );
}
