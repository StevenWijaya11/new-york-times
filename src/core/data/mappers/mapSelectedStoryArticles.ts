import { Article } from '@core/models/article';
import { formatDisplayDate } from '@utils/dateFormatter';

export const mapSelectedStoryArticle = (item: any): Article => {
  return {
    id: item.uri,
    title: item.title,
    abstract: item.abstract,
    author: item.byline,
    imageUrl: item.multimedia?.[0]?.url,
    caption: item.multimedia?.[0]?.caption ?? '',
    credit: item.media?.[0]?.copyright ?? '',
    publishedDate: formatDisplayDate(item.published_date),
  };
};

export const mapSelectedStoryArticles = (items: any) => {
  return items.map(mapSelectedStoryArticle);
};
