import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader, ProgressBar } from '../components';
import { colors } from '../theme';

const EVENT_TYPES = [
  { id: 'birthday', name: 'Birthday Party', icon: 'gift' },
  { id: 'wedding', name: 'Wedding', icon: 'heart' },
  { id: 'corporate', name: 'Corporate Event', icon: 'briefcase' },
  { id: 'anniversary', name: 'Anniversary', icon: 'heart-circle' },
  { id: 'baby-shower', name: 'Baby Shower', icon: 'happy' },
  { id: 'graduation', name: 'Graduation', icon: 'school' },
  { id: 'custom', name: 'Custom Event', icon: 'sparkles' },
];

export default function EventTypeScreen({ navigation }: any) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      navigation.navigate('EventDetails', { eventType: selectedType });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <PageHeader
          title="Choose Event Type"
          subtitle="Select the type that best matches your needs"
          onBackPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <View style={styles.progressContainer}>
        <ProgressBar currentStep={1} totalSteps={4} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {EVENT_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.typeCardSelected,
              ]}
              onPress={() => setSelectedType(type.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={type.icon as any}
                size={48}
                color={selectedType === type.id ? colors.purpleText : colors.gray400}
                style={styles.typeIcon}
              />
              <Text style={[
                styles.typeName,
                selectedType === type.id && styles.typeNameSelected,
              ]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedType && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedType}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeArea: {
    backgroundColor: colors.white,
  },
  progressContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  typeCard: {
    width: '47%',
    backgroundColor: colors.white,
    margin: '1.5%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: colors.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  typeCardSelected: {
    borderColor: colors.purple,
    backgroundColor: colors.primaryLight,
    shadowOpacity: 0.12,
    transform: [{ scale: 1.02 }],
  },
  typeIcon: {
    marginBottom: 12,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
    textAlign: 'center',
    lineHeight: 20,
  },
  typeNameSelected: {
    color: colors.darkGray,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    paddingBottom: 24,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButton: {
    backgroundColor: colors.darkGray,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: colors.gray300,
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
