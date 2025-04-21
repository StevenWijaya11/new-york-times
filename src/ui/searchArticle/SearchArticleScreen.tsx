import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { Article } from '@core/models/article';
import ArticlePreview from '@ui/components/ArticlePreview';
import PaginationFooter from '@ui/components/PaginationFooter';
import { useSearchArticle } from './useSearchArticle';
import EmptyPlaceHolder from '@ui/components/EmptyPlaceholder';

const SearchArticleScreen = () => {
  const { t } = useTranslation();
  const {
    articles,
    isInitialLoad,
    isLoadingMore,
    initialLoadError,
    loadMoreError,
    loadInitialSearchArticles,
    loadNextSearchArticles,
    searchQuery,
    setSearchQuery,
  } = useSearchArticle();

  const renderSearchArticles: ListRenderItem<Article> = ({ item }) => {
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

  const renderFooter = () => {
    return (
      <PaginationFooter
        isLoading={isLoadingMore}
        error={loadMoreError}
        onRefresh={loadNextSearchArticles}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder={t('Home.SearchArticle')}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <StatefulContentWrapper
        loading={isInitialLoad}
        error={initialLoadError}
        onRefresh={loadInitialSearchArticles}
      >
        <FlatList
          data={articles}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={renderSearchArticles}
          showsVerticalScrollIndicator={false}
          onEndReached={!loadMoreError ? loadNextSearchArticles : () => {}}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={<EmptyPlaceHolder></EmptyPlaceHolder>}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={() => <View style={styles.searchArticleSpacing} />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={loadInitialSearchArticles}
            />
          }
        />
      </StatefulContentWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 25,
  },
  searchArticleSpacing: {
    height: 20,
  },
});

export default SearchArticleScreen;
