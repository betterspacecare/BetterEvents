import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar, VendorDetailModal, SearchBar, Chip, EmptyState, Button, Card, PageHeader } from '../components';
import { colors } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

const VENDOR_CATEGORIES = [
  { id: 'venue', name: 'Venue', icon: 'business' },
  { id: 'catering', name: 'Catering', icon: 'restaurant' },
  { id: 'photography', name: 'Photography', icon: 'camera' },
  { id: 'decoration', name: 'Decoration', icon: 'color-palette' },
  { id: 'entertainment', name: 'Entertainment', icon: 'musical-notes' },
  { id: 'cake', name: 'Cake', icon: 'cafe' },
];

const SAMPLE_VENDORS = {
  venue: [
    { id: 'v1', name: 'Grand Ballroom', rating: 4.8, price: '$$$', icon: 'business' },
    { id: 'v2', name: 'Garden Paradise', rating: 4.9, price: '$$', icon: 'leaf' },
  ],
  catering: [
    { id: 'c1', name: 'Gourmet Delights', rating: 4.7, price: '$$$', icon: 'restaurant' },
    { id: 'c2', name: 'Tasty Bites', rating: 4.6, price: '$$', icon: 'fast-food' },
  ],
  photography: [
    { id: 'p1', name: 'Perfect Moments', rating: 4.9, price: '$$$', icon: 'camera' },
    { id: 'p2', name: 'Snap Studio', rating: 4.8, price: '$$', icon: 'images' },
  ],
};

export default function VendorSelectionScreen({ navigation, route }: any) {
  const { eventData, selectedVendors: initialVendors, isEditing, onVendorsUpdate } = route.params;
  const { isLargeScreen } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState('venue');
  const [selectedVendors, setSelectedVendors] = useState<any>(initialVendors || {});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendorDetail, setSelectedVendorDetail] = useState<any>(null);
  const [sortBy, setSortBy] = useState('rating');

  const toggleVendor = (category: string, vendor: any) => {
    setSelectedVendors((prev: any) => ({
      ...prev,
      [category]: prev[category]?.id === vendor.id ? null : vendor,
    }));
  };

  const handleContinue = () => {
    if (isEditing && onVendorsUpdate) {
      onVendorsUpdate(selectedVendors);
      navigation.goBack();
    } else {
      navigation.navigate('Summary', { eventData, selectedVendors });
    }
  };

  const handleVendorSelect = (vendor: any) => {
    toggleVendor(selectedCategory, vendor);
    setSelectedVendorDetail(null);
  };

  let vendors = SAMPLE_VENDORS[selectedCategory as keyof typeof SAMPLE_VENDORS] || [];

  if (searchQuery) {
    vendors = vendors.filter((v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  vendors = [...vendors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.price.length - b.price.length;
    return 0;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <PageHeader
          title="Select Vendors"
          onBackPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <View style={styles.progressContainer}>
        <ProgressBar currentStep={3} totalSteps={4} />
      </View>

      <View style={[styles.searchSection, isLargeScreen && styles.webSearchSection]}>
        <View style={{ flex: 1 }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search vendors..."
          />
        </View>
        <View style={[styles.sortButtons, isLargeScreen && styles.webSortButtons]}>
          <Chip
            label="Rating"
            icon="star"
            selected={sortBy === 'rating'}
            onPress={() => setSortBy('rating')}
            style={styles.sortChip}
          />
          <Chip
            label="Price"
            icon="cash"
            selected={sortBy === 'price'}
            onPress={() => setSortBy('price')}
            style={styles.sortChip}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {VENDOR_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.id ? colors.darkGray : colors.gray600}
              style={styles.categoryIcon}
            />
            <Text style={[
              styles.categoryName,
              selectedCategory === category.id && styles.categoryNameSelected,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.vendorList} contentContainerStyle={{ paddingBottom: 20 }}>
        {vendors.length === 0 ? (
          <EmptyState
            icon="search-outline"
            title="No vendors found"
            description="Try adjusting your search or filters"
          />
        ) : (
          <View style={isLargeScreen ? styles.webGrid : undefined}>
            {vendors.map((vendor) => (
              <View key={vendor.id} style={isLargeScreen ? styles.webVendorCardWrapper : undefined}>
                <TouchableOpacity
                  style={[
                    styles.vendorCard,
                    selectedVendors[selectedCategory]?.id === vendor.id && styles.vendorCardSelected,
                  ]}
                  onPress={() => toggleVendor(selectedCategory, vendor)}
                >
                  <View style={styles.vendorIconContainer}>
                    <Ionicons name={vendor.icon as any} size={32} color={colors.purpleText} />
                  </View>
                  <View style={styles.vendorInfo}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <View style={styles.vendorMeta}>
                      <Ionicons name="star" size={14} color="#fbbf24" />
                      <Text style={styles.vendorRating}>{vendor.rating}</Text>
                      <Text style={styles.vendorPrice}>{vendor.price}</Text>
                    </View>
                  </View>
                  <View style={styles.vendorActions}>
                    <TouchableOpacity
                      style={styles.infoButton}
                      onPress={() => setSelectedVendorDetail(vendor)}
                    >
                      <Ionicons name="information-circle-outline" size={24} color={colors.darkGray} />
                    </TouchableOpacity>
                    {selectedVendors[selectedCategory]?.id === vendor.id && (
                      <Ionicons name="checkmark-circle" size={28} color={colors.darkGray} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <VendorDetailModal
        visible={!!selectedVendorDetail}
        vendor={selectedVendorDetail}
        onClose={() => setSelectedVendorDetail(null)}
        onSelect={() => handleVendorSelect(selectedVendorDetail)}
      />

      <View style={[styles.footer, isLargeScreen && styles.webFooter]}>
        <Button
          title={isEditing ? 'Save Vendors' : 'Review Summary'}
          variant="primary"
          size="large"
          onPress={handleContinue}
          style={isLargeScreen ? styles.webFooterButton : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
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
  searchSection: {
    backgroundColor: '#FAF8F3',
    padding: 16,
  },
  webSearchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  webSortButtons: {
    marginTop: 0,
    width: 300,
  },
  sortChip: {
    flex: 1,
  },
  categoryScroll: {
    backgroundColor: '#FAF8F3',
    maxHeight: 80,
    paddingBottom: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  categoryChipSelected: {
    backgroundColor: '#eef2ff',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryNameSelected: {
    color: colors.darkGray,
  },
  vendorList: {
    flex: 1,
    padding: 16,
  },
  webGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  webVendorCardWrapper: {
    width: '48%',
  },
  vendorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  vendorCardSelected: {
    borderColor: colors.darkGray,
    backgroundColor: '#fff',
    shadowOpacity: 0.12,
  },
  vendorIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vendorInfo: {
    flex: 1,
    marginRight: 8,
  },
  vendorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoButton: {
    padding: 4,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  vendorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vendorRating: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 6,
  },
  vendorPrice: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    backgroundColor: '#FAF8F3',
  },
  webFooter: {
    alignItems: 'flex-end',
  },
  webFooterButton: {
    width: 250,
  },
});
