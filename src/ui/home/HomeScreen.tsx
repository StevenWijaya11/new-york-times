import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title='Go to Search Article'
        onPress={() => navigation.navigate(Screens.SearchArticle)}
      />
      <Button
        title='Go to Article Details'
        onPress={() => navigation.navigate(Screens.ArticleDetails, { message: 'Passing data from home' })}
      />
    </View>
  );
};

export default HomeScreen;
