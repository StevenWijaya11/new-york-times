export type RootStackParamList = {
  Home: undefined;
  SearchArticle: undefined;
  ArticleDetails: { article: Article };
  Setting: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, Screens.ArticleDetails>;

