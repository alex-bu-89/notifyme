import dotenv from 'dotenv';
import path from 'path';
import logger from '../utils/logger';

const dotenvPath = path.join(__dirname, '../../', 'config/.env');
const result = dotenv.config({
  path: dotenvPath,
});

if (result.error) {
  logger.error(`.env not found ${result.error}`);
}
