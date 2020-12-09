import path from 'path';
import logger from '../utils/logger';

import './telegram';

export enum Clients {
  TELEGRAM = 'telegram',
}

export function register(clients: string[], message: string) {
  return Promise.all(clients.map(async (client) => {
    const module = await import(path.resolve(__dirname, client));
    return await module.default(message);
  }))
  .then(async (result) => {
    return result;
  })
  .catch((error) => {
    logger.error('[Notifier] Error has occurred while register notifier', error);
  });
}

export default {
  register,
  clients: Clients,
};
