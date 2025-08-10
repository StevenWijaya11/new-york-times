import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface OptionButtonProps {
  label: string;
  value: string;
  selectedPreference: string;
  setSelectedPrefence: (newValue: string) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, value, selectedPreference, setSelectedPrefence }) => {
  const isSelected = value === selectedPreference;
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => setSelectedPrefence(value)}
      style={[styles.optionButton, isSelected && styles.selectedOptionButton]}
    >
      <Text style={[isSelected && styles.selectedText]}>{t(label)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    borderColor: '#D32F2F',
    borderWidth: 2,
    padding: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#D32F2F',
  },
  selectedText: {
    color: 'white',
  },
});

export default OptionButton;
