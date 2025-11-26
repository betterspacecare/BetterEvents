import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

interface VendorDetailModalProps {
  visible: boolean;
  vendor: any;
  onClose: () => void;
  onSelect: () => void;
}

export default function VendorDetailModal({ visible, vendor, onClose, onSelect }: VendorDetailModalProps) {
  const { isLargeScreen } = useResponsive();

  if (!vendor) return null;

  const reviews = [
    { id: 1, name: 'Sarah M.', rating: 5, comment: 'Absolutely amazing service! Highly recommend.' },
    { id: 2, name: 'John D.', rating: 4, comment: 'Great experience, very professional.' },
    { id: 3, name: 'Emily R.', rating: 5, comment: 'Exceeded all expectations!' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle={isLargeScreen ? 'overFullScreen' : 'pageSheet'}
      transparent={isLargeScreen}
    >
      <View style={isLargeScreen ? styles.webModalOverlay : { flex: 1 }}>
        <SafeAreaView style={[styles.container, isLargeScreen && styles.webModalContainer]} edges={['bottom']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{vendor.name}</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.heroSection}>
              <View style={styles.iconContainer}>
                <Ionicons name={vendor.icon} size={64} color={colors.purple} />
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={20} color="#fbbf24" />
                <Text style={styles.ratingText}>{vendor.rating}</Text>
                <Text style={styles.reviewCount}>(127 reviews)</Text>
              </View>
              <Text style={styles.priceRange}>{vendor.price}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.description}>
                Professional event services with over 10 years of experience. We specialize in creating
                memorable experiences for all types of events. Our team is dedicated to making your
                special day perfect.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Services Included</Text>
              <View style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.serviceText}>Full setup and cleanup</Text>
              </View>
              <View style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.serviceText}>Professional staff</Text>
              </View>
              <View style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.serviceText}>Customizable packages</Text>
              </View>
              <View style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.serviceText}>24/7 support</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Reviews</Text>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Ionicons key={i} name="star" size={14} color="#fbbf24" />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color={colors.purple} />
                <Text style={styles.contactText}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color={colors.purple} />
                <Text style={styles.contactText}>contact@vendor.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="location" size={20} color={colors.purple} />
                <Text style={styles.contactText}>123 Event Street, City, State</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
              <Text style={styles.selectButtonText}>Select This Vendor</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  webModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webModalContainer: {
    width: 600,
    height: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  closeButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  placeholder: { width: 36 },
  content: { flex: 1 },
  heroSection: { alignItems: 'center', padding: 24, backgroundColor: '#f9fafb' },
  iconContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ratingText: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginLeft: 6 },
  reviewCount: { fontSize: 14, color: '#6b7280', marginLeft: 6 },
  priceRange: { fontSize: 16, fontWeight: '600', color: colors.purpleText },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  description: { fontSize: 14, color: '#6b7280', lineHeight: 20 },
  serviceItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  serviceText: { fontSize: 14, color: '#374151', marginLeft: 10 },
  reviewCard: { backgroundColor: '#f9fafb', padding: 12, borderRadius: 8, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  reviewName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  reviewRating: { flexDirection: 'row' },
  reviewComment: { fontSize: 13, color: '#6b7280', lineHeight: 18 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  contactText: { fontSize: 14, color: '#374151', marginLeft: 12 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  selectButton: { backgroundColor: colors.darkGray, padding: 16, borderRadius: 16, alignItems: 'center' },
  selectButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
