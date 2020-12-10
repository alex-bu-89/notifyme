import { Scrapers } from '.';

export interface PageDto {
  name: string;
  urls: string[];
}

interface ScraperResultDto {
  isAvailable: boolean;
  page: string;
}

export interface ScraperDto {
  name: string;
  data: ScraperResultDto[];
}
