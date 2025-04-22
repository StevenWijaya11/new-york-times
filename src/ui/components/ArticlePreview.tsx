import { Article } from '@core/models/article';
import { Image, StyleSheet, Text, View } from 'react-native';

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
          <Text style={styles.date}>{publishedDate}</Text>
          <Text>{author}</Text>
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
    padding: 10,
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    marginRight: 5,
  },
  information: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});

export default ArticlePreview;
