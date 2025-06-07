import { Article } from '@core/models/article';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NetworkStatusIcon } from './NetworkStatusIcon';

interface ArticlePreviewProps {
  item: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ item }) => {
  const { title, abstract, author, publishedDate, imageUrl } = item;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageUrl ? { uri: imageUrl } : require('src/resources/images/no-image.png')}
      />
      <View style={styles.textContainer}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {abstract}
        </Text>
        <View style={styles.information}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{publishedDate}</Text>
            <Text style={styles.author} numberOfLines={2}>{author}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <NetworkStatusIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    flexShrink: 1,
    justifyContent: 'space-between',
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    marginRight: 5,
    fontSize: 14,
  },
  author: {
    fontSize: 14,
  },
  information: {
    flexDirection: 'row',
  },
  dateContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconWrapper: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArticlePreview;
