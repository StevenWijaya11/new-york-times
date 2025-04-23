import { t } from 'i18next';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
  value: string;
  onChangeText?: (text: string) => void;
  isEditable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, isEditable = true }) => {
  return (
    <Searchbar
      style={styles.searchBar}
      placeholder={t('Home.SearchArticle')}
      value={value}
      onChangeText={isEditable ? onChangeText : undefined}
      editable={isEditable}
      pointerEvents={isEditable ? 'auto' : 'none'}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 20,
    elevation: 3,
    borderColor: '#D32F2F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
});

export default SearchBar;
