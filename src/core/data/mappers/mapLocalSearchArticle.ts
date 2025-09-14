import { Article } from '@core/models/article';
import { ResultSet } from 'react-native-sqlite-storage';

export const mapLocalSearchArticles = (resultSet: ResultSet): Article[] => {
  const searchArticles: Article[] = [];
  for (let i = 0; i < resultSet.rows.length; i++) {
    searchArticles.push(resultSet.rows.item(i));
  }
  return searchArticles;
};
