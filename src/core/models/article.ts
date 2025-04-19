export interface MostViewedArticleModel {
  id: number;
  title: string;
  abstract: string;
  imageUrl?: string;
}

export interface Article {
  id: number;
  title: string;
  abstract: string;
  imageUrl?: string;
  author: string;
  caption: string;
  credit: string;
  publishedDate: string;
}