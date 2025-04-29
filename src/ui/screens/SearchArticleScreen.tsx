import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem, RefreshControl, TouchableOpacity } from 'react-native';

import { Article } from '@core/models/article';
import ArticlePreview from '@ui/components/ArticlePreview';
import PaginationFooter from '@ui/components/PaginationFooter';
import EmptyPlaceHolder from '@ui/components/EmptyPlaceholder';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/rootStackParamList';
import { Screens } from 'src/enums/screens';
import SearchBar from '@ui/components/SearchBar';
import useSearchStore from 'src/stores/searchStore';
import { useDebounce } from '@ui/hooks/sharedHooks/useDebounce';

const SearchArticleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    articles,
    isInitialLoading,
    isLoadingMore,
    initialLoadError,
    loadMoreError,
    fetchInitialSearchArticles,
    fetchNextSearchArticles,
    searchQuery,
    setSearchQuery,
    resetState,
  } = useSearchStore();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchInitialSearchArticles();
  }, [fetchInitialSearchArticles, debouncedSearchQuery]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

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
        onRefresh={fetchNextSearchArticles}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <StatefulContentWrapper
        loading={isInitialLoading}
        error={initialLoadError}
        onRefresh={fetchInitialSearchArticles}
      >
        <FlatList
          data={articles}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={renderSearchArticles}
          showsVerticalScrollIndicator={false}
          onEndReached={!loadMoreError ? fetchNextSearchArticles : () => {}}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={<EmptyPlaceHolder></EmptyPlaceHolder>}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={() => <View style={styles.searchArticleSpacing} />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={fetchInitialSearchArticles}
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
  searchArticleSpacing: {
    height: 20,
  },
});

export default SearchArticleScreen;
