export interface PageDto {
  name: string;
  urls: string[];
}

interface ScraperPageDto {
  isAvailable: boolean;
  page: string;
  title: string;
}

export interface ScraperItemDto {
  name: string;
  data: ScraperPageDto[];
}
export interface ScraperResultDto {
  name: string;
  result: ScraperItemDto[];
}
