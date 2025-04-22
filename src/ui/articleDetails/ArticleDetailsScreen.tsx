import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Props } from 'src/types/rootStackParamList';

const ArticleDetailsScreen = ({ route }: Props) => {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title} </Text>

      <Image
        style={styles.images}
        source={{ uri: article.imageUrl }}
      ></Image>
      <Text style={styles.caption}>
        {article.caption} <Text style={styles.credit}>{article.credit}</Text>
      </Text>
      <View style={styles.authorInformation}>
        <Text>{article.publishedDate}</Text>
        <Text>{article.author}</Text>
      </View>
      <Text style={styles.abstract}>{article.abstract} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  topSection: {},
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  images: {
    width: '100%',
    height: '25%',
    resizeMode: 'stretch',
    marginBottom: 5,
  },
  caption: {
    textAlign: 'justify',
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
    marginBottom: 15,
  },
  credit: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  authorInformation: {
    flexDirection: 'row',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 15,
    gap: 5,
  },
  abstract: {
    textAlign: 'justify',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ArticleDetailsScreen;
