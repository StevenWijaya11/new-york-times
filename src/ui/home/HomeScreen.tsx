import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { homeViewModel } from './homeViewModel';

import { Article } from '@core/models/article';
import MostViewedArticle from '@ui/components/MostViewedArticle';
import { useTranslation } from 'react-i18next';
import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';

const HomeScreen = () => {
  const { mostViewedArticles, loading, error } = homeViewModel();
  const { t } = useTranslation();

  const renderMostViewedArticle = ({ item }: { item: Article }) => {
    return (
      <MostViewedArticle
        title={item.title}
        imageUrl={item.imageUrl}
      />
    );
  };

  return (
    <View style={[styles.container, (loading || error) && styles.loadingContainer]}>
      <StatefulContentWrapper
        loading={loading}
        error={error}
      >
        <Text style={styles.sectionTitle}>{t('Home.MostViewed')}</Text>
        <FlatList
          horizontal={true}
          data={mostViewedArticles}
          renderItem={renderMostViewedArticle}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.columnSeperator} />}
        />
      </StatefulContentWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#D22B2B',
    marginBottom: 10,
  },
  columnSeperator: {
    width: 16,
  },
});

export default HomeScreen;
