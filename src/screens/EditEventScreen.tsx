import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Chip, PageHeader } from '../components';
import { colors } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

export default function EditEventScreen({ navigation, route }: any) {
  const { event } = route.params;
  const { isLargeScreen } = useResponsive();

  const [eventName, setEventName] = useState(event.name);
  const [date, setDate] = useState(new Date(event.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(event.location);
  const [guestCount, setGuestCount] = useState(event.guests);
  const [budget, setBudget] = useState(event.budget);
  const [eventTime, setEventTime] = useState(event.time);
  const [notes, setNotes] = useState(event.notes || '');
  const [vendors, setVendors] = useState(event.vendorsList || []);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (!eventName || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const updatedEvent = {
      ...event,
      name: eventName,
      date: date.toLocaleDateString(),
      location,
      guests: guestCount,
      budget,
      time: eventTime,
      notes,
      vendorsList: vendors,
      vendors: vendors.length,
    };

    Alert.alert(
      'Success',
      'Event updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('EventDetail', { event: updatedEvent }),
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes?',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleAddVendor = () => {
    navigation.navigate('VendorSelection', {
      eventData: {
        eventType: event.type,
        eventName,
        date: date.toLocaleDateString(),
        location,
        guestCount,
        budget,
        eventTime,
      },
      selectedVendors: vendors.reduce((acc: any, vendor: any) => {
        acc[vendor.category.toLowerCase()] = vendor;
        return acc;
      }, {}),
      isEditing: true,
      onVendorsUpdate: (updatedVendors: any) => {
        const vendorsList = Object.entries(updatedVendors)
          .filter(([_, vendor]) => vendor)
          .map(([category, vendor]: any) => ({
            ...vendor,
            category: category.charAt(0).toUpperCase() + category.slice(1),
          }));
        setVendors(vendorsList);
      },
    });
  };

  const handleRemoveVendor = (vendorId: number) => {
    Alert.alert(
      'Remove Vendor',
      'Are you sure you want to remove this vendor?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setVendors(vendors.filter((v: any) => v.id !== vendorId)),
        },
      ]
    );
  };

  const handleChangeVendorStatus = (vendorId: number, newStatus: string) => {
    setVendors(
      vendors.map((v: any) =>
        v.id === vendorId ? { ...v, status: newStatus } : v
      )
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader
        title="Edit Event"
        onBackPress={handleCancel}
        rightActions={
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <View style={styles.saveButton}>
              <Ionicons name="checkmark" size={20} color={colors.purple} />
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={isLargeScreen ? styles.webGrid : undefined}>
            <View style={[styles.inputGroup, isLargeScreen && styles.webInputGroup]}>
              <Text style={styles.label}>Event Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Sarah's 30th Birthday"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            <View style={[styles.inputGroup, isLargeScreen && styles.webInputGroup]}>
              <Text style={styles.label}>Event Date *</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
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

            <View style={[styles.inputGroup, isLargeScreen && styles.webInputGroup]}>
              <Text style={styles.label}>Event Time</Text>
              <View style={styles.timeOptions}>
                {['morning', 'afternoon', 'evening'].map((time) => (
                  <Chip
                    key={time}
                    label={time.charAt(0).toUpperCase() + time.slice(1)}
                    selected={eventTime === time}
                    onPress={() => setEventTime(time)}
                    style={styles.timeChip}
                  />
                ))}
              </View>
            </View>

            <View style={[styles.inputGroup, isLargeScreen && styles.webInputGroup]}>
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
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>

          <View style={isLargeScreen ? styles.webGrid : undefined}>
            <View style={[styles.inputGroup, isLargeScreen && styles.webInputGroup]}>
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

            <View style={[styles.inputGroup, isLargeScreen && styles.webInputGroup]}>
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
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vendors ({vendors.length})</Text>
            <TouchableOpacity onPress={handleAddVendor} style={styles.addButton}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
              <Text style={styles.addButtonText}>Add/Edit</Text>
            </TouchableOpacity>
          </View>

          {vendors.length === 0 ? (
            <View style={styles.emptyVendors}>
              <Ionicons name="people-outline" size={48} color={colors.gray300} />
              <Text style={styles.emptyVendorsText}>No vendors added yet</Text>
              <Text style={styles.emptyVendorsSubtext}>Tap "Add/Edit" to select vendors</Text>
            </View>
          ) : (
            <View style={isLargeScreen ? styles.webGrid : undefined}>
              {vendors.map((vendor: any) => (
                <View key={vendor.id} style={[styles.vendorItem, isLargeScreen && styles.webVendorItem]}>
                  <View style={styles.vendorIconContainer}>
                    <Ionicons name="briefcase" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.vendorInfo}>
                    <Text style={styles.vendorCategory}>{vendor.category}</Text>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <View style={styles.vendorStatusRow}>
                      <TouchableOpacity
                        style={[
                          styles.statusChip,
                          vendor.status === 'Confirmed' && styles.statusConfirmed,
                          vendor.status === 'Pending' && styles.statusPending,
                        ]}
                        onPress={() => {
                          const statuses = ['Pending', 'Confirmed'];
                          const currentIndex = statuses.indexOf(vendor.status);
                          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                          handleChangeVendorStatus(vendor.id, nextStatus);
                        }}
                      >
                        <Text style={styles.statusChipText}>{vendor.status}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveVendor(vendor.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="close-circle" size={24} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any special notes or requirements..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Card>
      </ScrollView>

      <View style={[styles.footer, isLargeScreen && styles.webFooter]}>
        <Button
          title="Cancel"
          variant="outline"
          onPress={handleCancel}
          style={[styles.footerButton, isLargeScreen && styles.webFooterButton]}
        />
        <Button
          title="Save Changes"
          variant="primary"
          icon="checkmark-circle"
          onPress={handleSave}
          style={[styles.footerButton, isLargeScreen && styles.webFooterButton]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  saveButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  content: { flex: 1, backgroundColor: colors.gray50 },
  section: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  webGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  inputGroup: { marginBottom: 20 },
  webInputGroup: {
    width: '48%',
    marginBottom: 0,
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
  timeOptions: { flexDirection: 'row', gap: 10 },
  timeChip: { flex: 1 },
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
  slider: { width: '100%', height: 40 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabel: { fontSize: 12, color: colors.gray500 },
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyVendors: {
    alignItems: 'center',
    padding: 32,
  },
  emptyVendorsText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray900,
    marginTop: 12,
  },
  emptyVendorsSubtext: {
    fontSize: 14,
    color: colors.gray500,
    marginTop: 4,
  },
  vendorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  webVendorItem: {
    width: '48%',
    marginBottom: 0,
  },
  vendorIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorCategory: {
    fontSize: 12,
    color: colors.gray500,
    marginBottom: 2,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: 4,
  },
  vendorStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.warningLight,
  },
  statusConfirmed: {
    backgroundColor: colors.successLight,
  },
  statusPending: {
    backgroundColor: colors.warningLight,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray700,
  },
  removeButton: {
    padding: 4,
  },
  notesInput: {
    backgroundColor: colors.gray50,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.darkGray,
    minHeight: 100,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 24,
    backgroundColor: colors.white,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  webFooter: {
    justifyContent: 'flex-end',
  },
  footerButton: { flex: 1 },
  webFooterButton: {
    flex: 0,
    minWidth: 150,
  },
});
