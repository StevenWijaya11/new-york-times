import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ArticleDetailsScreen from '@ui/articleDetails/ArticleDetailsScreen';
import HomeScreen from '@ui/home/HomeScreen';
import SearchArticleScreen from '@ui/searchArticle/SearchArticleScreen';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.Home}>
        <Stack.Screen
          name={Screens.Home}
          component={HomeScreen}
          options={{ title: 'New York Times' }}
        ></Stack.Screen>
        <Stack.Screen
          name={Screens.SearchArticle}
          component={SearchArticleScreen}
          options={{ title: 'New York Times' }}
        ></Stack.Screen>
        <Stack.Screen
          name={Screens.ArticleDetails}
          component={ArticleDetailsScreen}
          options={{ title: 'New York Times' }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
