import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader, ProgressBar } from '../components';
import { colors } from '../theme';

export default function EventDetailsScreen({ navigation, route }: any) {
  const { eventType, template } = route.params;
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [guestCount, setGuestCount] = useState(template?.guestCount || 50);
  const [budget, setBudget] = useState(template?.budget || 5000);
  const [eventTime, setEventTime] = useState('evening');

  const handleContinue = () => {
    const eventData = {
      eventType,
      eventName,
      date: date.toLocaleDateString(),
      location,
      guestCount,
      budget,
      eventTime,
    };
    navigation.navigate('VendorSelection', { eventData });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const isFormValid = eventName && location;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <PageHeader
          title="Event Details"
          onBackPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <View style={styles.progressContainer}>
        <ProgressBar currentStep={2} totalSteps={4} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Sarah's 30th Birthday"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Date *</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={colors.purple} />
              <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Time</Text>
            <View style={styles.timeOptions}>
              {['morning', 'afternoon', 'evening'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeChip,
                    eventTime === time && styles.timeChipSelected,
                  ]}
                  onPress={() => setEventTime(time)}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      eventTime === time && styles.timeChipTextSelected,
                    ]}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <View style={styles.locationInput}>
              <Ionicons name="location-outline" size={20} color={colors.gray500} />
              <TextInput
                style={styles.locationTextInput}
                placeholder="City or Venue"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expected Guest Count: {guestCount}</Text>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={500}
              step={10}
              value={guestCount}
              onValueChange={setGuestCount}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray200}
              thumbTintColor={colors.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>10</Text>
              <Text style={styles.sliderLabel}>500+</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Budget: ₹{budget.toLocaleString()}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1000}
              maximumValue={50000}
              step={500}
              value={budget}
              onValueChange={setBudget}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray200}
              thumbTintColor={colors.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>₹1K</Text>
              <Text style={styles.sliderLabel}>₹50K+</Text>
            </View>
          </View>

          <View style={styles.budgetBreakdown}>
            <Text style={styles.breakdownTitle}>Estimated Budget Breakdown</Text>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Venue</Text>
              <Text style={styles.breakdownValue}>₹{Math.round(budget * 0.3).toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Catering</Text>
              <Text style={styles.breakdownValue}>₹{Math.round(budget * 0.35).toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Other Services</Text>
              <Text style={styles.breakdownValue}>₹{Math.round(budget * 0.35).toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isFormValid}
        >
          <Text style={styles.continueButtonText}>Continue to Vendors</Text>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 10,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: colors.gray50,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.darkGray,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  dateText: {
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: '500',
  },
  timeOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  timeChip: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  timeChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.purple,
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray600,
  },
  timeChipTextSelected: {
    color: colors.purpleText,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  locationTextInput: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.gray500,
  },
  budgetBreakdown: {
    backgroundColor: colors.primaryLight,
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  breakdownTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkGray,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 2,
  },
  breakdownLabel: {
    fontSize: 14,
    color: colors.gray600,
    fontWeight: '500',
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.purpleText,
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
