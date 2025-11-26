import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../components';
import { colors } from '../theme';

const EVENT_TEMPLATES = [
  {
    id: 1,
    name: 'Intimate Birthday Party',
    type: 'birthday',
    icon: 'gift',
    color: '#FFE8E0',
    iconColor: colors.deepOrange,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
    guests: 30,
    budget: 15000,
    description: 'Cozy celebration with close friends and family',
    creator: 'Priya S.',
    rating: 4.8,
    uses: 234,
  },
  {
    id: 2,
    name: 'Grand Birthday Bash',
    type: 'birthday',
    icon: 'gift',
    color: '#FFE8E0',
    iconColor: colors.deepOrange,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop',
    guests: 100,
    budget: 50000,
    description: 'Large-scale birthday celebration with entertainment',
    creator: 'Rahul M.',
    rating: 4.9,
    uses: 189,
  },
  {
    id: 3,
    name: 'Traditional Wedding',
    type: 'wedding',
    icon: 'heart',
    color: '#FFE4E1',
    iconColor: colors.coral,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    guests: 300,
    budget: 800000,
    description: 'Complete traditional wedding with all ceremonies',
    creator: 'Anjali & Rohan',
    rating: 5.0,
    uses: 456,
  },
  {
    id: 4,
    name: 'Destination Wedding',
    type: 'wedding',
    icon: 'heart',
    color: '#FFE4E1',
    iconColor: colors.coral,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
    guests: 150,
    budget: 1200000,
    description: 'Intimate destination wedding at a resort',
    creator: 'Neha K.',
    rating: 4.9,
    uses: 312,
  },
  {
    id: 5,
    name: 'Corporate Conference',
    type: 'corporate',
    icon: 'briefcase',
    color: '#E8E8E8',
    iconColor: colors.darkGray,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    guests: 200,
    budget: 150000,
    description: 'Professional conference with networking sessions',
    creator: 'TechCorp Events',
    rating: 4.7,
    uses: 567,
  },
  {
    id: 6,
    name: 'Team Building Event',
    type: 'corporate',
    icon: 'briefcase',
    color: '#E8E8E8',
    iconColor: colors.darkGray,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    guests: 50,
    budget: 40000,
    description: 'Fun team building activities and dinner',
    creator: 'StartupHub',
    rating: 4.8,
    uses: 423,
  },
  {
    id: 7,
    name: 'Baby Shower Celebration',
    type: 'baby-shower',
    icon: 'happy',
    color: '#FFF5E0',
    iconColor: colors.amber,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
    guests: 40,
    budget: 25000,
    description: 'Sweet baby shower with games and decorations',
    creator: 'Divya P.',
    rating: 4.9,
    uses: 278,
  },
  {
    id: 8,
    name: 'Graduation Party',
    type: 'graduation',
    icon: 'school',
    color: colors.primaryLight,
    iconColor: colors.purple,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    guests: 60,
    budget: 30000,
    description: 'Celebrate academic achievements with style',
    creator: 'Arjun T.',
    rating: 4.6,
    uses: 156,
  },
  {
    id: 9,
    name: 'Anniversary Dinner',
    type: 'anniversary',
    icon: 'heart-circle',
    color: '#FFE4E1',
    iconColor: colors.coral,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    guests: 20,
    budget: 12000,
    description: 'Romantic anniversary celebration',
    creator: 'Vikram & Sonia',
    rating: 5.0,
    uses: 189,
  },
  {
    id: 10,
    name: 'Housewarming Party',
    type: 'custom',
    icon: 'home',
    color: colors.successLight,
    iconColor: colors.green,
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop',
    guests: 50,
    budget: 20000,
    description: 'Welcome guests to your new home',
    creator: 'Amit S.',
    rating: 4.7,
    uses: 234,
  },
];

export default function EventTemplatesScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'birthday', label: 'Birthday', icon: 'gift' },
    { id: 'wedding', label: 'Wedding', icon: 'heart' },
    { id: 'corporate', label: 'Corporate', icon: 'briefcase' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? EVENT_TEMPLATES
    : EVENT_TEMPLATES.filter(t => t.type === selectedCategory);

  const handleSelectTemplate = (template: any) => {
    navigation.navigate('EventDetails', {
      eventType: template.type,
      template: {
        guestCount: template.guests,
        budget: template.budget,
      },
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <PageHeader
          title="Event Templates"
          onBackPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterChip,
                selectedCategory === category.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={category.icon as any}
                size={16}
                color={selectedCategory === category.id ? colors.purpleText : colors.gray600}
              />
              <Text style={[
                styles.filterChipText,
                selectedCategory === category.id && styles.filterChipTextActive,
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.templatesGrid}>
          {filteredTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateCard}
              onPress={() => handleSelectTemplate(template)}
              activeOpacity={0.7}
            >
              {/* Image with Icon Fallback */}
              <View style={styles.templateImageContainer}>
                <Image
                  source={{ uri: template.image }}
                  style={styles.templateImage}
                  onError={() => { }}
                />
                <View style={[styles.imageFallback, { backgroundColor: template.color }]}>
                  <Ionicons name={template.icon as any} size={48} color={template.iconColor} />
                </View>
                <View style={styles.imageOverlay} />
              </View>

              {/* Content */}
              <View style={styles.templateContent}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription} numberOfLines={2}>{template.description}</Text>

                {/* Meta Info */}
                <View style={styles.templateMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={13} color={colors.gray500} />
                    <Text style={styles.metaText}>{template.guests}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="cash-outline" size={13} color={colors.gray500} />
                    <Text style={styles.metaText}>₹{(template.budget / 1000).toFixed(0)}k</Text>
                  </View>
                </View>

                {/* Footer */}
                <View style={styles.templateFooter}>
                  <View style={styles.creatorInfo}>
                    <Ionicons name="person-circle-outline" size={14} color={colors.gray500} />
                    <Text style={styles.creatorText}>{template.creator}</Text>
                  </View>
                  <View style={styles.ratingInfo}>
                    <Ionicons name="star" size={12} color={colors.amber} />
                    <Text style={styles.ratingText}>{template.rating}</Text>
                    <Text style={styles.usesText}>• {template.uses} uses</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('EventType')}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.purpleText} />
          <Text style={styles.customButtonText}>Create Custom Event</Text>
        </TouchableOpacity>
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
  filterContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  filterChipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.purple,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray600,
  },
  filterChipTextActive: {
    color: colors.purpleText,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  templatesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  templateImageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
    backgroundColor: colors.gray100,
  },
  templateImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  templateContent: {
    padding: 12,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkGray,
    marginBottom: 4,
    lineHeight: 20,
  },
  templateDescription: {
    fontSize: 12,
    color: colors.gray600,
    lineHeight: 16,
    marginBottom: 10,
  },
  templateMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.gray600,
    fontWeight: '500',
  },
  templateFooter: {
    gap: 6,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  creatorText: {
    fontSize: 11,
    color: colors.gray500,
    fontWeight: '500',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: colors.gray700,
    fontWeight: '600',
  },
  usesText: {
    fontSize: 10,
    color: colors.gray500,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 16,
    margin: 16,
    marginTop: 8,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    gap: 8,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.purpleText,
  },
});
