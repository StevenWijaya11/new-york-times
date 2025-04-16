import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

import { Article, MostViewedArticleModel } from '@core/models/article';
import MostViewedArticle from '@ui/components/MostViewedArticle';
import { useTranslation } from 'react-i18next';
import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import { ListRenderItem } from 'react-native';
import ArticlePreview from '@ui/components/ArticlePreview';
import { Searchbar } from 'react-native-paper';
import TopStorySection from '@ui/components/TopStorySection';
import { storiesList } from '@core/constant/storiesList';
import { interesetViewModel } from './interestViewModel';
import { mostViewedViewModel } from './mostViewedViewModel';

const HomeScreen = () => {
  const { selectedStoryArticles, isInterestLoading, interestError, selectedStory, setSelectedStory } =
    interesetViewModel();
  const { mostViewedArticles, isMostViewedLoading, mostViewedError } = mostViewedViewModel();

  const { t } = useTranslation();

  const renderMostViewedArticle: ListRenderItem<MostViewedArticleModel> = ({ item }) => {
    return (
      <MostViewedArticle
        title={item.title}
        imageUrl={item.imageUrl}
      />
    );
  };

  const renderStorySection: ListRenderItem<string> = ({ item }) => {
    return (
      <TopStorySection
        story={item}
        setSelectedStory={setSelectedStory}
        selectedStory={selectedStory}
      />
    );
  };

  const renderSelectedStoriesArticle: ListRenderItem<Article> = ({ item }) => {
    return (
      <ArticlePreview
        title={item.title}
        abstract={item.abstract}
        author={item.author}
        publishedDate={item.publishedDate}
        imageUrl={item.imageUrl}
      />
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Searchbar
          placeholder={'Search article ...'}
          value={''}
        />
        <Text style={styles.sectionTitle}>{t('Home.MostViewed')}</Text>
        <View style={styles.loadingContainer}>
          <StatefulContentWrapper
            loading={isMostViewedLoading}
            error={mostViewedError}
          >
            <FlatList
              style={styles.section}
              horizontal={true}
              data={mostViewedArticles}
              renderItem={renderMostViewedArticle}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.columnSeperator} />}
            />
          </StatefulContentWrapper>
        </View>

        <Text style={styles.sectionTitle}>{t('Home.Interests')}</Text>
        <FlatList
          style={styles.section}
          horizontal={true}
          data={storiesList}
          renderItem={renderStorySection}
          ItemSeparatorComponent={() => <View style={styles.storySectionSeperator} />}
        />
        <View style={styles.loadingContainer}>
          <StatefulContentWrapper
            loading={isInterestLoading}
            error={interestError}
          >
            <FlatList
              style={styles.section}
              data={selectedStoryArticles}
              renderItem={renderSelectedStoriesArticle}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.storyArticleSeperator} />}
            />
          </StatefulContentWrapper>
        </View>
      </View>
    </ScrollView>
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
  storySectionSeperator: {
    width: 10,
  },
  storyArticleSeperator: {
    height: 20,
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default HomeScreen;
