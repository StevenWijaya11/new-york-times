import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';
import MostViewedSection from '@ui/sections/MostViewedSection';
import InterestSection from '@ui/sections/InterestSection';
import SearchBar from '@ui/components/SearchBar';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate(Screens.SearchArticle)}>
            <SearchBar
              value={''}
              isEditable={false}
            />
          </TouchableOpacity>
          <MostViewedSection />
          <InterestSection />
          <Text style={styles.attribution}>Data provided by The New York Times.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  attribution: {
    marginVertical: 16,
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
