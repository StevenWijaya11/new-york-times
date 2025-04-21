import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

const EmptyPlaceHolder = () => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Image
        source={require('src/resources/images/no-result.png')}
        style={styles.image}
      />

      <Text style={styles.title}>{t('EmptyPlaceholder.Title')}</Text>
      <Text style={styles.description}>{t('EmptyPlaceholder.Description')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    height: 200,
    width: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center'
  }
});

export default EmptyPlaceHolder;
