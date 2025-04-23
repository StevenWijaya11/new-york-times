import { Image, StyleSheet, Text, View } from 'react-native';

interface MostViewedArticleProps {
  title: string;
  imageUrl?: string;
}

const MostViewedArticle: React.FC<MostViewedArticleProps> = ({ title, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageUrl ? { uri: imageUrl } : require('src/resources/images/no-image.png')}
      />
      <Text
        style={styles.text}
        numberOfLines={2}
        ellipsizeMode='tail'
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    height: 175
  },
  image: {
    height: 125,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    resizeMode: 'cover',
  },
  text: {
    padding: 10,
  },
});
export default MostViewedArticle;
