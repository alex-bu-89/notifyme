import dotenv from 'dotenv';
import path from 'path';

const dotenvPath = path.join(__dirname, '../../', 'config/.env');
const result = dotenv.config({
  path: dotenvPath,
});

import logger from '../utils/logger';
if (result.error) {
  logger.error(`.env not found ${result.error}`);
}
