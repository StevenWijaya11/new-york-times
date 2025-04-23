import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TopStoryProps {
  story: string;
  selectedStory: string;
  setSelectedStory: (selectedStory: string) => void;
}

const TopStorySection: React.FC<TopStoryProps> = ({ story, selectedStory, setSelectedStory }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={[styles.button, selectedStory === story && styles.selectedStory]}
      onPress={() => setSelectedStory(story)}
    >
      <Text style={selectedStory === story && styles.selectedText}>{t(`Stories.${story}`)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D32F2F',
    backgroundColor: '#F8F8F8',
  },
  selectedStory: {
    backgroundColor: '#D32F2F',
  },
  selectedText: {
    color: 'white',
  },
});

export default TopStorySection;
