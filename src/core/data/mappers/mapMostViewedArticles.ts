import { Article } from '@core/models/article';
import { formatDisplayDate } from '@utils/dateFormatter';

export const mapMostViewedArticle = (item: any): Article => {
  return {
    id: item.uri,
    title: item.title,
    abstract: item.abstract,
    author: item.byline,
    imageUrl: item.media?.[0]?.['media-metadata']?.[2]?.url ?? item.media?.[0]?.['media-metadata']?.[0]?.url,
    caption: item.media?.[0]?.caption ?? '',
    credit: item.media?.[0]?.copyright ?? '',
    publishedDate: formatDisplayDate(item.published_date),
  };
};

export const mapMostViewedArticles = (items: any) => {
  return items.map(mapMostViewedArticle);
};
