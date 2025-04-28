import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';
import MostViewedSection from '@ui/sections/MostViewedSection';

import SearchBar from '@ui/components/SearchBar';
import SharedSnackbar from '@ui/shared/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@app/store';
import { InterestSection } from '@ui/sections/InterestSection';
import { fetchInterest } from 'src/features/thunks/interestThunk';
import { fetchMostVieweds } from 'src/features/thunks/mostViewedThunk';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedStory = useSelector((state: RootState) => state.interest.selectedStory);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              dispatch(fetchMostVieweds());
              dispatch(fetchInterest(selectedStory));
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
      <SharedSnackbar></SharedSnackbar>
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
