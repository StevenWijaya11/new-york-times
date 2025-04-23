import { Article } from '@core/models/article';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MostViewedArticle from '@ui/components/MostViewedArticle';
import { useMostViewedArticles } from '@ui/hooks/customHooks/useMostViewedArticles';
import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import { t } from 'i18next';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';

const MostViewedSection = ({ reloadKey }: { reloadKey: number }) => {
  const { mostViewedArticles, isMostViewedLoading, mostViewedError, loadMostViewedArticles } = useMostViewedArticles(reloadKey);
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

  return (
    <View style={styles.mostViewedContainer}>
      <Text style={styles.sectionTitle}>{t('Home.MostViewed')}</Text>
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
  );
};

const styles = StyleSheet.create({
  mostViewedContainer: {
    flex: 1,
  },
  columnSeperator: {
    width: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#D32F2F',
    marginTop: 10,
    marginBottom: 15,
  },
  section: {
    paddingBottom: 20,
  },
});

export default MostViewedSection;
