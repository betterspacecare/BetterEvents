import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface WebSidebarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

export default function WebSidebar({ state, descriptors, navigation }: WebSidebarProps) {
    return (
        <View style={styles.sidebar}>
            <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                    <Ionicons name="sparkles" size={24} color="#fff" />
                </View>
                <Text style={styles.logoText}>BetterEvents</Text>
            </View>

            <View style={styles.navigation}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconName = 'circle';
                    if (route.name === 'Home') iconName = isFocused ? 'sparkles' : 'sparkles-outline';
                    else if (route.name === 'MyEvents') iconName = isFocused ? 'calendar' : 'calendar-outline';
                    else if (route.name === 'Profile') iconName = isFocused ? 'person' : 'person-outline';

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={[styles.navItem, isFocused && styles.navItemActive]}
                        >
                            <Ionicons
                                name={iconName as any}
                                size={24}
                                color={isFocused ? colors.primary : colors.gray500}
                            />
                            <Text style={[styles.navText, isFocused && styles.navTextActive]}>
                                {label === 'Home' ? 'Plan' : label === 'MyEvents' ? 'Events' : label}
                            </Text>
                            {isFocused && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.footer}>
                <View style={styles.userProfile}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                    <View>
                        <Text style={styles.userName}>John Doe</Text>
                        <Text style={styles.userRole}>Event Planner</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        width: 280,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
        paddingVertical: 32,
        paddingHorizontal: 24,
        height: '100%',
        ...Platform.select({
            web: {
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            } as any,
        }),
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 48,
        paddingHorizontal: 12,
    },
    logoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        letterSpacing: -0.5,
    },
    navigation: {
        gap: 8,
        flex: 1,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 16,
        position: 'relative',
    },
    navItemActive: {
        backgroundColor: colors.primaryLight,
    },
    navText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray500,
    },
    navTextActive: {
        color: colors.primaryDark,
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        width: 4,
        height: 24,
        backgroundColor: colors.primary,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 24,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.darkGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    userRole: {
        fontSize: 12,
        color: colors.gray500,
    },
});
