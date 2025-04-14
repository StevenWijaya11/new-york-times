import React from 'react';
import { View, Text } from 'react-native';
import { Props } from 'src/types/rootStackParamList';

const ArticleDetailsScreen = ({ route }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Article Details Screen!</Text>
      <Text> {route.params.message} </Text>
    </View>
  );
};

export default ArticleDetailsScreen;


