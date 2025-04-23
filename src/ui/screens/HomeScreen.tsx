import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';
import { useNetworkStatus } from '@ui/hooks/sharedHooks/useNetInfo';
import MostViewedSection from '@ui/sections/MostViewedSection';
import InterestSection from '@ui/sections/InterestSection';
import SearchBar from '@ui/components/SearchBar';
import { useHomeScreen } from '@ui/hooks/customHooks/useHomeScreen';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { reloadKey, isRefreshing, onRefresh } = useHomeScreen();
  const isConnected = useNetworkStatus();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(Screens.SearchArticle)}>
          <SearchBar
            value={''}
            isEditable={false}
          />
        </TouchableOpacity>
        <MostViewedSection reloadKey={reloadKey} />
        <InterestSection reloadKey={reloadKey}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});

export default HomeScreen;
