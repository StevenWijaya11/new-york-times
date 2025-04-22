import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList, ListRenderItem, RefreshControl, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { Article } from '@core/models/article';
import ArticlePreview from '@ui/components/ArticlePreview';
import PaginationFooter from '@ui/components/PaginationFooter';
import { useSearchArticle } from './useSearchArticle';
import EmptyPlaceHolder from '@ui/components/EmptyPlaceholder';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/rootStackParamList';
import { Screens } from 'src/enums/screens';

const SearchArticleScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
      <TouchableOpacity onPress={() => navigation.navigate(Screens.ArticleDetails, { article: item })}>
        <ArticlePreview item={item} />
      </TouchableOpacity>
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
