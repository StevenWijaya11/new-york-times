import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleDetailsScreen from '@ui/screens/ArticleDetailsScreen';
import HomeScreen from '@ui/screens/HomeScreen';
import SearchArticleScreen from '@ui/screens/SearchArticleScreen';
import { View } from 'react-native';
import { Screens } from 'src/enums/screens';
import { RootStackParamList } from 'src/types/rootStackParamList';
import { IconButton } from 'react-native-paper';
import SettingScreen from '@ui/screens/SettingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Home}
        screenOptions={({ navigation, route }) => ({
          title: 'New York Times',
          headerRight: () =>
            route.name !== Screens.Setting ? (
              <View>
                <IconButton
                  icon='cog'
                  onPress={() => navigation.navigate(Screens.Setting)}
                />
              </View>
            ) : null,
        })}
      >
        <Stack.Screen
          name={Screens.Home}
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={Screens.SearchArticle}
          component={SearchArticleScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={Screens.ArticleDetails}
          component={ArticleDetailsScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={Screens.Setting}
          component={SettingScreen}
          options={{ title: 'Setting', headerBackTitle: 'Back' }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
