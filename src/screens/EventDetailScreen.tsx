import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button, StatusBadge, InfoRow } from '../components';
import { colors } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

export default function EventDetailScreen({ navigation, route }: any) {
  const { event } = route.params || {};
  const [activeTab, setActiveTab] = useState('overview');
  const { isWeb, isLargeScreen } = useResponsive();

  // Use event data from route params
  const eventData = {
    ...event,
    vendors: event?.vendorsList || [],
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me for ${eventData.name} on ${eventData.date} at ${eventData.location}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactVendor = (vendor: any) => {
    Alert.alert(
      `Contact ${vendor.name}`,
      `Call ${vendor.contact}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling...') },
      ]
    );
  };

  const handleEditEvent = () => {
    navigation.navigate('EditEvent', { event: eventData });
  };

  const handleCancelEvent = () => {
    Alert.alert(
      'Cancel Event',
      'Are you sure you want to cancel this event?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.gray900} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditEvent} style={styles.iconButton}>
              <Ionicons name="create-outline" size={24} color={colors.gray900} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.eventName}>{eventData.name}</Text>
        <StatusBadge status={eventData.status.toLowerCase() as any} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, isLargeScreen && styles.webTabs]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vendors' && styles.tabActive]}
          onPress={() => setActiveTab('vendors')}
        >
          <Text style={[styles.tabText, activeTab === 'vendors' && styles.tabTextActive]}>
            Vendors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'timeline' && styles.tabActive]}
          onPress={() => setActiveTab('timeline')}
        >
          <Text style={[styles.tabText, activeTab === 'timeline' && styles.tabTextActive]}>
            Timeline
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
        {activeTab === 'overview' && (
          <View style={isLargeScreen ? styles.webGrid : undefined}>
            {/* Event Details Card */}
            <Card style={[styles.cardMargin, isLargeScreen && styles.webCard]}>
              <Text style={styles.cardTitle}>Event Details</Text>
              <InfoRow
                icon="calendar-outline"
                label="Date & Time"
                value={`${eventData.date} • ${eventData.time}`}
              />
              <InfoRow
                icon="location-outline"
                label="Location"
                value={eventData.location}
              />
              <InfoRow
                icon="people-outline"
                label="Guest Count"
                value={`${eventData.guests} people`}
              />
              <InfoRow
                icon="cash-outline"
                label="Budget"
                value={`₹${eventData.budget.toLocaleString()}`}
              />
            </Card>

            {/* Budget Breakdown */}
            <Card style={[styles.cardMargin, isLargeScreen && styles.webCard]}>
              <Text style={styles.cardTitle}>Budget Breakdown</Text>
              <View style={styles.budgetBar}>
                <View style={[styles.budgetSegment, { flex: 3, backgroundColor: colors.primary }]} />
                <View style={[styles.budgetSegment, { flex: 3.5, backgroundColor: colors.purple }]} />
                <View style={[styles.budgetSegment, { flex: 3.5, backgroundColor: colors.pink }]} />
              </View>
              <View style={styles.budgetLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                  <Text style={styles.legendText}>Venue: ₹{Math.round(eventData.budget * 0.3).toLocaleString()}</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.purple }]} />
                  <Text style={styles.legendText}>Catering: ₹{Math.round(eventData.budget * 0.35).toLocaleString()}</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.pink }]} />
                  <Text style={styles.legendText}>Other: ₹{Math.round(eventData.budget * 0.35).toLocaleString()}</Text>
                </View>
              </View>
            </Card>

            {/* Notes */}
            {eventData.notes && (
              <Card style={[styles.cardMargin, isLargeScreen && styles.webCardFull]}>
                <Text style={styles.cardTitle}>Notes</Text>
                <Text style={styles.notesText}>{eventData.notes}</Text>
              </Card>
            )}
          </View>
        )}

        {activeTab === 'vendors' && (
          <View style={isLargeScreen ? styles.webGrid : undefined}>
            <Text style={[styles.sectionTitle, { width: '100%' }]}>{eventData.vendors.length} Vendors</Text>
            {eventData.vendors.map((vendor: any) => (
              <Card key={vendor.id} style={[styles.cardMargin, isLargeScreen && styles.webCard]}>
                <View style={styles.vendorHeader}>
                  <View>
                    <Text style={styles.vendorCategory}>{vendor.category}</Text>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                  </View>
                  <StatusBadge status={vendor.status.toLowerCase() as any} showIcon={false} />
                </View>
                <View style={styles.vendorActions}>
                  <TouchableOpacity
                    style={styles.vendorActionButton}
                    onPress={() => handleContactVendor(vendor)}
                  >
                    <Ionicons name="call-outline" size={18} color={colors.primaryDark} />
                    <Text style={styles.vendorActionText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.vendorActionButton}>
                    <Ionicons name="mail-outline" size={18} color={colors.primaryDark} />
                    <Text style={styles.vendorActionText}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.vendorActionButton}>
                    <Ionicons name="chatbubble-outline" size={18} color={colors.primaryDark} />
                    <Text style={styles.vendorActionText}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {activeTab === 'timeline' && (
          <View>
            <Text style={styles.sectionTitle}>Event Timeline</Text>
            {eventData.timeline.map((item: any, index: number) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineIndicator}>
                  <View style={[
                    styles.timelineDot,
                    item.completed ? styles.timelineDotCompleted : styles.timelineDotPending
                  ]}>
                    {item.completed && <Ionicons name="checkmark" size={12} color="#fff" />}
                  </View>
                  {index < eventData.timeline.length - 1 && (
                    <View style={[
                      styles.timelineLine,
                      item.completed ? styles.timelineLineCompleted : styles.timelineLinePending
                    ]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer Actions */}
      <View style={[styles.footer, isLargeScreen && styles.webFooter]}>
        <Button
          title="Cancel Event"
          variant="outline"
          onPress={handleCancelEvent}
          style={[styles.footerButton, isLargeScreen && styles.webFooterButton]}
        />
        <Button
          title="Add to Calendar"
          variant="primary"
          icon="calendar-outline"
          onPress={() => Alert.alert('Calendar', 'Add to calendar functionality')}
          style={[styles.footerButton, isLargeScreen && styles.webFooterButton]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  header: {
    backgroundColor: '#FAF8F3',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerActions: { flexDirection: 'row', gap: 16 },
  iconButton: { padding: 4 },
  eventName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  webTabs: {
    width: 400,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.darkGray,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  tabTextActive: {
    color: '#fff',
  },
  content: { flex: 1, padding: 16, backgroundColor: '#FAF8F3' },
  webGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardMargin: { marginBottom: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  webCard: {
    flex: 1,
    minWidth: 300,
    marginBottom: 0,
  },
  webCardFull: {
    width: '100%',
    marginBottom: 0,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.gray900, marginBottom: 16 },
  budgetBar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  budgetSegment: { height: '100%' },
  budgetLegend: { gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 14, color: colors.gray500 },
  notesText: { fontSize: 14, color: colors.gray500, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.gray900, marginBottom: 16 },
  vendorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  vendorCategory: { fontSize: 12, color: colors.gray500, marginBottom: 4 },
  vendorName: { fontSize: 16, fontWeight: 'bold', color: colors.gray900 },
  vendorActions: { flexDirection: 'row', gap: 12 },
  vendorActionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 8, backgroundColor: colors.primaryLight, gap: 6 },
  vendorActionText: { fontSize: 14, fontWeight: '600', color: colors.primaryDark },
  timelineItem: { flexDirection: 'row', marginBottom: 24 },
  timelineIndicator: { alignItems: 'center', marginRight: 16 },
  timelineDot: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  timelineDotCompleted: { backgroundColor: colors.success },
  timelineDotPending: { backgroundColor: colors.gray200 },
  timelineLine: { width: 2, flex: 1, marginTop: 4 },
  timelineLineCompleted: { backgroundColor: colors.success },
  timelineLinePending: { backgroundColor: colors.gray200 },
  timelineContent: { flex: 1, paddingTop: 2 },
  timelineTitle: { fontSize: 16, fontWeight: '600', color: colors.gray900, marginBottom: 4 },
  timelineDate: { fontSize: 14, color: colors.gray500 },
  footer: { flexDirection: 'row', padding: 24, backgroundColor: '#FAF8F3', gap: 12 },
  webFooter: {
    justifyContent: 'flex-end',
  },
  footerButton: { flex: 1 },
  webFooterButton: {
    flex: 0,
    minWidth: 180,
  },
});
