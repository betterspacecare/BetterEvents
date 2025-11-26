import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const QUICK_TEMPLATES = [
  {
    id: 1,
    name: 'Intimate Birthday',
    type: 'birthday',
    icon: 'gift',
    color: '#FFE8E0',
    iconColor: colors.deepOrange,
    guests: 30,
    budget: 15000,
    description: 'Small gathering with close friends',
  },
  {
    id: 2,
    name: 'Grand Wedding',
    type: 'wedding',
    icon: 'heart',
    color: '#FFE4E1',
    iconColor: colors.coral,
    guests: 200,
    budget: 500000,
    description: 'Traditional wedding celebration',
  },
  {
    id: 3,
    name: 'Corporate Meet',
    type: 'corporate',
    icon: 'briefcase',
    color: '#E8E8E8',
    iconColor: colors.darkGray,
    guests: 50,
    budget: 50000,
    description: 'Professional business event',
  },
  {
    id: 4,
    name: 'Baby Shower',
    type: 'baby-shower',
    icon: 'happy',
    color: '#FFF5E0',
    iconColor: colors.amber,
    guests: 40,
    budget: 20000,
    description: 'Celebrate the new arrival',
  },
];

export default function HomeScreen({ navigation }: any) {
  const handleTemplateSelect = (template: any) => {
    navigation.navigate('EventDetails', {
      eventType: template.type,
      template: {
        guestCount: template.guests,
        budget: template.budget,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.illustrationContainer}>
            <Ionicons name="calendar" size={56} color={colors.purple} />
          </View>
          <Text style={styles.title}>Plan Your Perfect Event</Text>
          <Text style={styles.subtitle}>Create memorable moments in just 5 minutes</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('EventType')}
        >
          <Text style={styles.primaryButtonText}>Start Planning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('EventTemplates')}
        >
          <Ionicons name="albums-outline" size={20} color={colors.purpleText} />
          <Text style={styles.secondaryButtonText}>Browse Templates</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>quick presets</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.templatesSection}>
          <Text style={styles.sectionTitle}>Quick Templates</Text>
          <View style={styles.templatesGrid}>
            {QUICK_TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateCard}
                onPress={() => handleTemplateSelect(template)}
                activeOpacity={0.7}
              >
                <View style={[styles.templateIcon, { backgroundColor: template.color }]}>
                  <Ionicons name={template.icon as any} size={28} color={template.iconColor} />
                </View>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
                <View style={styles.templateMeta}>
                  <View style={styles.templateMetaItem}>
                    <Ionicons name="people-outline" size={12} color={colors.gray500} />
                    <Text style={styles.templateMetaText}>{template.guests}</Text>
                  </View>
                  <View style={styles.templateMetaItem}>
                    <Ionicons name="cash-outline" size={12} color={colors.gray500} />
                    <Text style={styles.templateMetaText}>₹{(template.budget / 1000).toFixed(0)}k</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#FFE8E0' }]}>
              <Text style={styles.featureNumber}>1</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Choose Event Type</Text>
              <Text style={styles.featureText}>Birthday, Wedding, Corporate, or Custom</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#FFF5E0' }]}>
              <Text style={styles.featureNumber}>2</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Add Details</Text>
              <Text style={styles.featureText}>Date, location, guest count, and budget</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#E8ECFF' }]}>
              <Text style={styles.featureNumber}>3</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Select Vendors</Text>
              <Text style={styles.featureText}>Choose from our curated list of vendors</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#E5F5F3' }]}>
              <Text style={styles.featureNumber}>4</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Done!</Text>
              <Text style={styles.featureText}>Connect with vendors and finalize your event</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FAF8F3',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  illustrationContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: 'center',
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: colors.darkGray,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    marginHorizontal: 24,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  secondaryButtonText: {
    color: colors.purpleText,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: colors.gray500,
    fontWeight: '500',
  },
  templatesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  templateCard: {
    width: '48%',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    margin: '1%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  templateIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkGray,
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 12,
    color: colors.gray600,
    lineHeight: 16,
    marginBottom: 12,
  },
  templateMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  templateMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  templateMetaText: {
    fontSize: 11,
    color: colors.gray600,
    fontWeight: '500',
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
  },
  featureNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
