export type RootStackParamList = {
  Home: undefined;
  SearchArticle: undefined;
  ArticleDetails: { article: Article };
};

export type Props = NativeStackScreenProps<RootStackParamList, Screens.ArticleDetails>;

