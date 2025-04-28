import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import React, { useCallback, useEffect } from 'react';
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
import { AppDispatch, RootState } from '@app/store';
import { useDispatch, useSelector } from 'react-redux';
import { refreshPage, resetPage, setSearchQuery } from 'src/features/slices/searchSlice';
import { fetchSearchArticle } from 'src/features/thunks/searchTrunk';
import { INITIAL_PAGE } from '@core/constant/constants';
import { useDebounce } from '@ui/hooks/sharedHooks/useDebounce';

const SearchArticleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { articles, page, searchQuery, isInitialLoading, isLoadingMore, initialLoadError, loadMoreError, hasData } = useSelector(
    (state: RootState) => state.search,
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSearchArticle({ page: page, searchQuery: debouncedSearchQuery }));
  }, [dispatch, debouncedSearchQuery]);

  useEffect(() => {
    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  const handleLoadNextPage = useCallback(() => {
    if (isInitialLoading || isLoadingMore || !hasData) return;
    dispatch(fetchSearchArticle({ page, searchQuery }));
  }, [dispatch, isInitialLoading, isLoadingMore, page, searchQuery]);

  const handleRefreshPage = useCallback(() => {
    dispatch(refreshPage());
    dispatch(fetchSearchArticle({ page: INITIAL_PAGE, searchQuery }));
  }, [dispatch, searchQuery]);

  const handleSearchQuery = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

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
        onRefresh={handleLoadNextPage}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchQuery}
      />
      <StatefulContentWrapper
        loading={isInitialLoading}
        error={initialLoadError}
        onRefresh={handleRefreshPage}
      >
        <FlatList
          data={articles}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={renderSearchArticles}
          showsVerticalScrollIndicator={false}
          onEndReached={!loadMoreError ? handleLoadNextPage : () => {}}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={<EmptyPlaceHolder></EmptyPlaceHolder>}
          ListFooterComponent={renderFooter}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.searchArticleSpacing} />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefreshPage}
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
