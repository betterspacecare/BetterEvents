import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'planning' | 'cancelled';
  label?: string;
  showIcon?: boolean;
}

export default function StatusBadge({ status, label, showIcon = true }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return {
          color: colors.greenText,
          backgroundColor: colors.successLight,
          icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
          text: label || 'Confirmed',
        };
      case 'pending':
        return {
          color: colors.amberText,
          backgroundColor: colors.warningLight,
          icon: 'time' as keyof typeof Ionicons.glyphMap,
          text: label || 'Pending',
        };
      case 'planning':
        return {
          color: colors.purpleText,
          backgroundColor: colors.primaryLight,
          icon: 'create' as keyof typeof Ionicons.glyphMap,
          text: label || 'Planning',
        };
      case 'cancelled':
        return {
          color: colors.coralText,
          backgroundColor: colors.errorLight,
          icon: 'close-circle' as keyof typeof Ionicons.glyphMap,
          text: label || 'Cancelled',
        };
      default:
        return {
          color: colors.gray600,
          backgroundColor: colors.gray100,
          icon: 'help-circle' as keyof typeof Ionicons.glyphMap,
          text: label || status,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      {showIcon && <Ionicons name={config.icon} size={14} color={config.color} />}
      <Text style={[styles.text, { color: config.color }]}>{config.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
