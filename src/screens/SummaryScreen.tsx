import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar, PageHeader } from '../components';
import { colors } from '../theme';

export default function SummaryScreen({ navigation, route }: any) {
  const { eventData, selectedVendors } = route.params;
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleConfirm = () => {
    Alert.alert(
      'Event Created!',
      'Your event has been planned. Vendors will be notified.',
      [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my event: ${eventData.eventName} on ${eventData.date}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const vendorCount = Object.values(selectedVendors).filter(Boolean).length;
  const totalEstimate = vendorCount * 1500; // Simple estimate

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <PageHeader
          title="Event Summary"
          onBackPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <View style={styles.progressContainer}>
        <ProgressBar currentStep={4} totalSteps={4} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <View style={styles.card}>
            <DetailRow label="Event Name" value={eventData.eventName} />
            <DetailRow label="Type" value={eventData.eventType} />
            <DetailRow label="Date" value={eventData.date} />
            <DetailRow label="Location" value={eventData.location} />
            <DetailRow label="Guests" value={`${eventData.guestCount} people`} />
            <DetailRow label="Budget" value={`₹${eventData.budget}`} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Vendors ({vendorCount})</Text>
          <View style={styles.card}>
            {Object.entries(selectedVendors).map(([category, vendor]: any) =>
              vendor && (
                <View key={category} style={styles.vendorRow}>
                  <Text style={styles.vendorCategory}>{category}</Text>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                </View>
              )
            )}
            {vendorCount === 0 && (
              <Text style={styles.emptyText}>No vendors selected</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Total</Text>
          <View style={styles.card}>
            <Text style={styles.totalAmount}>₹{totalEstimate.toLocaleString()}</Text>
            <Text style={styles.totalNote}>Final pricing will be confirmed by vendors</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-social" size={20} color={colors.purple} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.confirmButtonText}>Confirm & Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  safeArea: { backgroundColor: colors.white },
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
  scrollView: { flex: 1 },
  section: { padding: 20, paddingBottom: 0 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  detailLabel: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  detailValue: { fontSize: 14, color: '#111827', fontWeight: '600' },
  vendorRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  vendorCategory: { fontSize: 12, color: '#6b7280', textTransform: 'capitalize', marginBottom: 2 },
  vendorName: { fontSize: 14, color: '#111827', fontWeight: '600' },
  emptyText: { fontSize: 14, color: '#9ca3af', textAlign: 'center', paddingVertical: 12 },
  totalAmount: { fontSize: 32, fontWeight: 'bold', color: colors.purpleText, textAlign: 'center', marginBottom: 8 },
  totalNote: { fontSize: 12, color: '#6b7280', textAlign: 'center' },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  footerActions: { flexDirection: 'row', gap: 12 },
  shareButton: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' },
  confirmButton: { flex: 1, backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
