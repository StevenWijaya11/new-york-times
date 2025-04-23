import { Article } from '@core/models/article';
import { formatDisplayDate } from '@utils/dateFormatter';

export const mapSearchArticle = (item: any): Article => {
  return {
    id: item.uri,
    title: item.headline.main,
    abstract: item.abstract,
    author: item.byline?.original,
    imageUrl: item.multimedia?.thumbnail?.url,
    caption: item.multimedia?.caption ?? '',
    credit: item.multimedia?.credit ?? '',
    publishedDate: formatDisplayDate(item.pub_date),
  };
};

export const mapSearchArticles = (items: any) => {
  if (!Array.isArray(items)) return [];
  return items.map(mapSearchArticle);
};
