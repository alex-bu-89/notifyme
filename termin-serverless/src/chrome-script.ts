import launchChrome from '@serverless-chrome/lambda';
import request from 'superagent';

export const getChrome = async () => {
  const chrome = await launchChrome({
    flags: ['--window-size=1280,1696', '--hide-scrollbars', '--headless']
  });

  const response = await request
    .get(`${chrome.url}/json/version`)
    .set('Content-Type', 'application/json');

  const endpoint = response.body.webSocketDebuggerUrl;

  return {
    endpoint,
    instance: chrome,
  };
};