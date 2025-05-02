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
import { Screens } from 'src/enums/screens';
import { Stories } from 'src/enums/stories';
import useInterestStore from 'src/stores/interestStore';
import { RootStackParamList } from 'src/types/rootStackParamList';

const InterestSection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    selectedStoryArticles,
    isInterestLoading,
    interestError,
    selectedStory,
    setSelectedStory,
    fetchSelectedStoryArticles,
  } = useInterestStore();
  const storiesList: string[] = Object.values(Stories);

  useEffect(() => {
    fetchSelectedStoryArticles(selectedStory);
  }, [fetchSelectedStoryArticles, selectedStory]);

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
        loading={isInterestLoading}
        error={interestError}
        onRefresh={() => fetchSelectedStoryArticles(selectedStory)}
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

export default InterestSection;
