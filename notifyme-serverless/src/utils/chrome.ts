import launchChrome from '@serverless-chrome/lambda';
import superagent from 'superagent';

export async function getChrome() {
  const chrome = await launchChrome({
    flags: [],
  });

  const response = await superagent
    .get(`${chrome.url}/json/version`)
    .set('Content-Type', 'application/json');

  const endpoint = response.body.webSocketDebuggerUrl;

  return {
    endpoint,
    instance: chrome,
  };
}
