import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader, Card, StatusBadge, EmptyState } from '../components';
import { colors } from '../theme';

const SAMPLE_EVENTS = [
  {
    id: 1,
    name: "Sarah's 30th Birthday",
    type: 'birthday',
    date: '2025-12-15',
    time: 'evening',
    location: 'Grand Ballroom, Downtown',
    guests: 50,
    budget: 5000,
    status: 'Planning',
    vendors: 3,
    vendorsList: [
      { id: 1, category: 'Venue', name: 'Grand Ballroom', status: 'Confirmed', contact: '+1 555-0101' },
      { id: 2, category: 'Catering', name: 'Gourmet Delights', status: 'Pending', contact: '+1 555-0102' },
      { id: 3, category: 'Photography', name: 'Perfect Moments', status: 'Confirmed', contact: '+1 555-0103' },
    ],
    timeline: [
      { id: 1, date: '2025-11-20', title: 'Event Created', completed: true },
      { id: 2, date: '2025-11-22', title: 'Vendors Selected', completed: true },
      { id: 3, date: '2025-12-01', title: 'Final Confirmation', completed: false },
      { id: 4, date: '2025-12-15', title: 'Event Day', completed: false },
    ],
    notes: 'Remember to confirm dietary restrictions with guests.',
  },
  {
    id: 2,
    name: 'Company Annual Party',
    type: 'corporate',
    date: '2025-11-30',
    time: 'evening',
    location: 'Skyline Convention Center',
    guests: 200,
    budget: 25000,
    status: 'Confirmed',
    vendors: 5,
    vendorsList: [
      { id: 1, category: 'Venue', name: 'Skyline Convention Center', status: 'Confirmed', contact: '+1 555-0201' },
      { id: 2, category: 'Catering', name: 'Corporate Catering Co', status: 'Confirmed', contact: '+1 555-0202' },
      { id: 3, category: 'Photography', name: 'Pro Event Photos', status: 'Confirmed', contact: '+1 555-0203' },
      { id: 4, category: 'Entertainment', name: 'Live Band Express', status: 'Confirmed', contact: '+1 555-0204' },
      { id: 5, category: 'Decoration', name: 'Event Decor Plus', status: 'Confirmed', contact: '+1 555-0205' },
    ],
    timeline: [
      { id: 1, date: '2025-10-15', title: 'Event Created', completed: true },
      { id: 2, date: '2025-10-20', title: 'Vendors Selected', completed: true },
      { id: 3, date: '2025-11-15', title: 'Final Confirmation', completed: true },
      { id: 4, date: '2025-11-30', title: 'Event Day', completed: false },
    ],
    notes: 'Arrange parking passes for all attendees. Setup starts at 3 PM.',
  },
];

export default function MyEventsScreen({ navigation }: any) {
  const upcomingEvents = SAMPLE_EVENTS.filter(e => new Date(e.date) >= new Date());
  const pastEvents = SAMPLE_EVENTS.filter(e => new Date(e.date) < new Date());

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getEventTypeConfig = (type: string) => {
    switch (type) {
      case 'birthday':
        return { icon: 'gift', color: colors.deepOrange, bg: '#FFE8E0' };
      case 'corporate':
        return { icon: 'briefcase', color: colors.darkGray, bg: '#E8E8E8' };
      case 'wedding':
        return { icon: 'heart', color: colors.coral, bg: '#FFE4E1' };
      default:
        return { icon: 'calendar', color: colors.purple, bg: colors.primaryLight };
    }
  };

  const renderEventCard = (event: any) => {
    const daysUntil = getDaysUntil(event.date);
    const isUpcoming = daysUntil >= 0;
    const typeConfig = getEventTypeConfig(event.type);

    return (
      <TouchableOpacity
        key={event.id}
        onPress={() => navigation.navigate('EventDetail', { event })}
        activeOpacity={0.7}
      >
        <Card style={styles.eventCard}>
          {/* Header Row */}
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.iconBadge, { backgroundColor: typeConfig.bg }]}>
                <Ionicons
                  name={typeConfig.icon as any}
                  size={20}
                  color={typeConfig.color}
                />
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.eventName} numberOfLines={1}>{event.name}</Text>
                <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={13} color={colors.gray500} />
                  <Text style={styles.eventDate}>{event.date}</Text>
                  {isUpcoming && daysUntil <= 7 && (
                    <View style={styles.urgentDot} />
                  )}
                </View>
              </View>
            </View>
            <StatusBadge status={event.status.toLowerCase() as any} showIcon={false} />
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.gray500} />
            <Text style={styles.eventLocation} numberOfLines={1}>{event.location}</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={15} color={colors.purpleText} />
              <Text style={styles.statText}>{event.guests}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="briefcase-outline" size={15} color={colors.coral} />
              <Text style={styles.statText}>{event.vendorsList?.length || event.vendors}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={15} color={colors.amber} />
              <Text style={styles.statText}>{event.time}</Text>
            </View>
            <View style={styles.budgetBadge}>
              <Text style={styles.budgetText}>₹{(event.budget / 1000).toFixed(0)}k</Text>
            </View>
          </View>

          {/* Progress Bar for Planning Status */}
          {event.status.toLowerCase() === 'planning' && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>60% Complete</Text>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <PageHeader
          title="My Events"
          rightActions={
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.7}
            >
              <View style={styles.addButton}>
                <Ionicons name="add" size={24} color={colors.purpleText} />
              </View>
            </TouchableOpacity>
          }
        />
      </SafeAreaView>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {SAMPLE_EVENTS.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title="No events yet"
            description="Start planning your first event!"
            actionLabel="Create Event"
            onAction={() => navigation.navigate('Home')}
          />
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="calendar" size={22} color={colors.purpleText} />
                  <Text style={styles.sectionTitle}>Upcoming ({upcomingEvents.length})</Text>
                </View>
                {upcomingEvents.map(renderEventCard)}
              </View>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="time" size={22} color={colors.green} />
                  <Text style={styles.sectionTitle}>Past Events ({pastEvents.length})</Text>
                </View>
                {pastEvents.map(renderEventCard)}
              </View>
            )}
          </>
        )}
      </ScrollView>
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
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  scrollView: { flex: 1, backgroundColor: colors.gray50 },
  section: { padding: 16, paddingBottom: 0 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkGray,
    letterSpacing: 0.3,
  },
  eventCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkGray,
    marginBottom: 4,
    lineHeight: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  eventDate: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray600,
  },
  urgentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.deepOrange,
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingLeft: 52,
  },
  eventLocation: {
    fontSize: 13,
    color: colors.gray600,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray700,
    textTransform: 'capitalize',
  },
  budgetBadge: {
    marginLeft: 'auto',
    backgroundColor: colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  budgetText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.greenText,
  },
  progressSection: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray100,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.purple,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    color: colors.gray600,
    fontWeight: '500',
  },
});
