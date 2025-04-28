import { AppDispatch, RootState } from '@app/store';
import { Article } from '@core/models/article';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ArticlePreview from '@ui/components/ArticlePreview';
import TopStorySection from '@ui/components/TopStorySection';
import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import { t } from 'i18next';
import { useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screens } from 'src/enums/screens';
import { Stories } from 'src/enums/stories';
import { fetchInterest } from 'src/features/thunks/interestThunk';
import { RootStackParamList } from 'src/types/rootStackParamList';

export const InterestSection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const storiesList: string[] = Object.values(Stories);
  const dispatch = useDispatch<AppDispatch>();

  const { articles, loading, error, selectedStory } = useSelector((state: RootState) => state.interest);

  useEffect(() => {
    dispatch(fetchInterest(selectedStory));
  }, [dispatch]);

  const handleSetSelectedStory = (selectedStory: string) => {
    dispatch(fetchInterest(selectedStory));
  };

  const renderStorySection: ListRenderItem<string> = ({ item }) => {
    return (
      <TopStorySection
        story={item}
        setSelectedStory={handleSetSelectedStory}
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
    <View style={styles.interestContainer}>
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
      <StatefulContentWrapper
        loading={loading}
        error={error}
        onRefresh={() => dispatch(fetchInterest(selectedStory))}
      >
        <FlatList
          style={styles.section}
          data={articles}
          renderItem={renderSelectedStoriesArticle}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.storyArticleSeperator} />}
        />
      </StatefulContentWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
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
