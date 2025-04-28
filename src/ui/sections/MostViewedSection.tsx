import { AppDispatch, RootState } from '@app/store';
import { Article } from '@core/models/article';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MostViewedArticle from '@ui/components/MostViewedArticle';
import { StatefulContentWrapper } from '@ui/shared/StatefulContentWrapper';
import { t } from 'i18next';
import { useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screens } from 'src/enums/screens';
import { fetchMostVieweds } from 'src/features/thunks/mostViewedThunk';
import { RootStackParamList } from 'src/types/rootStackParamList';

const MostViewedSection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMostVieweds());
  }, [dispatch]);

  const { articles, loading, error } = useSelector((state: RootState) => state.mostViewed);

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
        loading={loading}
        error={error}
        onRefresh={() => {}}
      >
        <FlatList
          style={styles.section}
          horizontal={true}
          data={articles}
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
