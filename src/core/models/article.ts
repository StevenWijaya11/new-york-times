export interface MostViewedArticleModel {
  id: number;
  title: string;
  abstract: string;
  imageUrl?: string;
}

export interface Article {
  title: string;
  abstract: string;
  imageUrl?: string;
  author: string;
  publishedDate: string;
}