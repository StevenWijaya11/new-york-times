import { Article } from '@core/models/article';
import { AxiosError } from 'axios';
import { Result } from 'src/types/result';
import { jest } from '@jest/globals';

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'The Rise of AI in Everyday Life',
    abstract: 'Exploring how artificial intelligence is becoming a part of our daily routines.',
    imageUrl: 'https://example.com/images/ai.jpg',
    author: 'Jane Doe',
    caption: 'A humanoid robot interacting with humans.',
    credit: 'Photo by TechVision',
    publishedDate: '2025-04-20',
  },
  {
    id: 2,
    title: 'Climate Change and Its Global Impact',
    abstract: 'A deep dive into the environmental challenges and what the future holds.',
    imageUrl: 'https://example.com/images/climate.jpg',
    author: 'John Smith',
    caption: 'Melting glaciers in the Arctic region.',
    credit: 'Image courtesy of EarthWatch',
    publishedDate: '2025-04-18',
  },
];

export const mockSuccessResult: Result<Article[]> = {
  data: mockArticles,
};

export const mockFailureResult: Result<Article[]> = {
  error: new AxiosError('Network error'),
};

export const mockHomeRepo = (result: Result<Article[]>) => ({
  fetchMostViewedArticles: jest.fn<() => Promise<Result<Article[]>>>().mockResolvedValue(result),
});
