import logger from '../../utils/logger';

export default async function run(page, browser) {
  const browserPage = await browser.newPage();
  await browserPage.goto(page.url, { waitUntil: 'networkidle0' });
  const content = await browserPage.evaluate(() => document.body.innerHTML);

  logger.info('run amazon sraping', page);
}
