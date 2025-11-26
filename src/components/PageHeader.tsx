import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  onBackPress?: () => void;
  rightActions?: React.ReactNode;
  showShadow?: boolean;
  variant?: 'default' | 'gradient' | 'minimal';
}

export default function PageHeader({
  title,
  subtitle,
  backgroundColor = colors.white,
  onBackPress,
  rightActions,
  showShadow = true,
  variant = 'default',
}: PageHeaderProps) {
  const getContainerStyle = () => {
    const baseStyle: any[] = [styles.container, { backgroundColor }];

    if (showShadow) {
      baseStyle.push(styles.containerWithShadow);
    }

    if (variant === 'gradient') {
      baseStyle.push(styles.gradientContainer);
    }

    return baseStyle;
  };

  return (
    <View style={getContainerStyle()}>
      <View style={styles.headerRow}>
        {/* Back Button */}
        {onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <View style={styles.backButtonInner}>
              <Ionicons name="arrow-back" size={20} color={colors.purpleText} />
            </View>
          </TouchableOpacity>
        )}

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>

        {/* Right Actions */}
        {rightActions ? (
          <View style={styles.rightActions}>{rightActions}</View>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  containerWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gradientContainer: {
    backgroundColor: colors.primaryLight,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  backButton: {
    padding: 0,
  },
  backButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  placeholder: {
    width: 36,
  },
});
