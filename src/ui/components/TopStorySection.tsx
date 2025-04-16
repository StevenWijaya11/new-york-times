
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
      <Text>{t(`Stories.${story}`)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStory: {
    backgroundColor: '#D22B2B',
    color: 'white'
  }
});

export default TopStorySection;
