export type RootStackParamList = {
  Home: undefined;
  SearchArticle: undefined;
  ArticleDetails: { message: string };
};

export type Props = NativeStackScreenProps<RootStackParamList, 'ArticleDetails'>;
