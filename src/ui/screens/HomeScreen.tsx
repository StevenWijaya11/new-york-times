import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';
import MostViewedSection from '@ui/sections/MostViewedSection';
import InterestSection from '@ui/sections/InterestSection';
import SearchBar from '@ui/components/SearchBar';
import SharedSnackbar from '@ui/shared/Snackbar';
import { useMostViewedArticles } from '@ui/hooks/customHooks/useMostViewedArticles';
import { useInterestArticles } from '@ui/hooks/customHooks/useInterestArticles';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { loadMostViewedArticles } = useMostViewedArticles();
  const {
    selectedStoryArticles,
    isInterestLoading,
    interestError,
    selectedStory,
    setSelectedStory,
    loadSelectedStory,
  } = useInterestArticles();

  return (
    <View style={styles.container}>
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
        <View>
          <TouchableOpacity onPress={() => navigation.navigate(Screens.SearchArticle)}>
            <SearchBar
              value={''}
              isEditable={false}
            />
          </TouchableOpacity>
          <MostViewedSection />
          <InterestSection />
        </View>
      </ScrollView>
      <SharedSnackbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});

export default HomeScreen;
