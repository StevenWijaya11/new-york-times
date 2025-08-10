import { AVAILABLE_LANGUAGES } from '@core/constant/constant';
import { useNavigation } from '@react-navigation/native';
import OptionButton from '@ui/components/OptionButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import userPreferenceStore from 'src/stores/userPreferenceStore';

const SettingScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const themes = Object.keys(t('Themes', { returnObjects: true }));
  const { getUserPreference, updateUserPreference, userPreference } = userPreferenceStore();
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedLang, setSelectedLang] = useState('');

  const handleSave = () => {
    updateUserPreference({ language: selectedLang, theme: selectedTheme });
    navigation.goBack();
  };

  useEffect(() => {
    getUserPreference();
  }, []);

  useEffect(() => {
    if (userPreference.theme && userPreference.language) {
      setSelectedTheme(userPreference.theme);
      setSelectedLang(userPreference.language);
    }
  }, [userPreference]);

  return (
    <View>
      <Text>{t('Languages')}</Text>
      <View style={styles.optionRows}>
        {AVAILABLE_LANGUAGES.map((lang) => {
          return (
            <OptionButton
              key={lang.tag}
              value={lang.tag}
              label={lang.label}
              selectedPreference={selectedLang}
              setSelectedPrefence={setSelectedLang}
            />
          );
        })}
      </View>
      <Text>{'Themes'}</Text>
      <View style={styles.optionRows}>
        {themes.map((theme) => {
          return (
            <OptionButton
              key={theme}
              value='2'
              label={theme}
              selectedPreference={selectedTheme}
              setSelectedPrefence={setSelectedTheme}
            />
          );
        })}
      </View>
      <View style={styles.saveButton}>
        <Button
          mode='contained'
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionRows: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    padding: 30,
    alignItems: 'center',
  },
});

export default SettingScreen;
