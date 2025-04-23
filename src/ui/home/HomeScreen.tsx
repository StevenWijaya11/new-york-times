import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import { Article } from '@core/models/article';
import MostViewedArticle from '@ui/components/MostViewedArticle';
import { useTranslation } from 'react-i18next';
import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import { ListRenderItem } from 'react-native';
import ArticlePreview from '@ui/components/ArticlePreview';
import { Searchbar } from 'react-native-paper';
import TopStorySection from '@ui/components/TopStorySection';
import { useMostViewedArticles } from './useMostViewedArticles';
import { useInterestArticles } from './useInterestArticles';
import { Stories } from 'src/enums/stories';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';

const HomeScreen = () => {
  const { mostViewedArticles, isMostViewedLoading, mostViewedError, loadMostViewedArticles } = useMostViewedArticles();
  const {
    selectedStoryArticles,
    isInterestLoading,
    interestError,
    selectedStory,
    setSelectedStory,
    loadSelectedStory,
  } = useInterestArticles();
  const { t } = useTranslation();
  const storiesList: string[] = Object.values(Stories);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderMostViewedArticle: ListRenderItem<Article> = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(Screens.ArticleDetails, { article: item })}>
        <MostViewedArticle
          title={item.title}
          imageUrl={item.imageUrl}
        />
      </TouchableOpacity>
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
      <TouchableOpacity onPress={() => navigation.navigate(Screens.ArticleDetails, { article: item })}>
        <ArticlePreview item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            loadMostViewedArticles(), loadSelectedStory(selectedStory);
          }}
        />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(Screens.SearchArticle)}>
          <Searchbar
            style={styles.searchBar}
            placeholder={t('Home.SearchArticle')}
            value={''}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{t('Home.MostViewed')}</Text>
        <View style={styles.mostViewedContainer}>
          <StatefulContentWrapper
            loading={isMostViewedLoading}
            error={mostViewedError}
            onRefresh={loadMostViewedArticles}
          >
            <FlatList
              style={styles.section}
              horizontal={true}
              data={mostViewedArticles}
              showsHorizontalScrollIndicator={false}
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
          showsHorizontalScrollIndicator={false}
          renderItem={renderStorySection}
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.storySectionSeperator} />}
        />
        <View style={styles.interestContainer}>
          <StatefulContentWrapper
            loading={isInterestLoading}
            error={interestError}
            onRefresh={() => loadSelectedStory(selectedStory)}
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
    flex: 1,
  },
  searchBar: {
    borderRadius: 20,
    elevation: 3,
    borderColor: '#D32F2F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  mostViewedContainer: {
    flex: 1,
    minHeight: 150,
  },
  interestContainer: {
    flex: 1,
    minHeight: 350,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#D32F2F',
    marginTop: 10,
    marginBottom: 15,
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
    paddingBottom: 20,
  },
});

export default HomeScreen;
