import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Props } from 'src/types/rootStackParamList';

const ArticleDetailsScreen = ({ route }: Props) => {
  const { article } = route.params;
  const { title, imageUrl, caption, credit, publishedDate, author } = article;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} </Text>
      <Image
        style={styles.image}
        source={imageUrl ? { uri: imageUrl } : require('src/resources/images/no-image.png')}
      />
      <Text style={styles.caption}>
        {caption} <Text style={styles.credit}>{credit}</Text>
      </Text>
      <View style={styles.authorInformation}>
        <Text style={styles.date}>{publishedDate}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
      <Text style={styles.abstract}>{article.abstract} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '25%',
    resizeMode: 'stretch',
    marginBottom: 5,
  },
  caption: {
    textAlign: 'justify',
    fontSize: 12,
    fontWeight: '400',
    color: 'grey',
    marginBottom: 15,
  },
  credit: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  authorInformation: {
    flexDirection: 'row',
    textAlign: 'left',
    marginBottom: 15,
    gap: 5,
  },
  date: {
    fontWeight: 'bold',
  },
  author: {
    fontWeight: 'bold',
  },
  abstract: {
    textAlign: 'justify',
    fontSize: 15,
  },
});

export default ArticleDetailsScreen;
