import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { colors } from '../theme';

export default function WebSidebarNavigation() {
    const navigation = useNavigation<any>();

    // Safely get the current route index
    const state = useNavigationState(state => state);

    // Find the active route name from the MainTabs navigator
    // This logic depends on the nesting. If MainTabs is the root or nested.
    // We'll assume we can find the 'Home', 'MyEvents', 'Profile' in the state.

    // Helper to check if a route is active
    const isRouteActive = (routeName: string) => {
        if (!state || !state.routes || typeof state.index !== 'number') return false;

        // If we are in the MainTabs navigator
        const route = state.routes[state.index];
        if (route.name === 'MainTabs') {
            // If MainTabs is nested
            const nestedState = route.state;
            if (nestedState && nestedState.routes && typeof nestedState.index === 'number') {
                const activeRoute = nestedState.routes[nestedState.index];
                return activeRoute.name === routeName;
            }
            // Default to first tab if no state yet
            return routeName === 'MyEvents';
        }

        // If we are directly in the tab navigator (unlikely given App.tsx structure)
        return route.name === routeName;
    };

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.sidebar}>
            <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                    <Ionicons name="sparkles" size={24} color="#fff" />
                </View>
                <Text style={styles.logoText}>BetterEvents</Text>
            </View>

            <View style={styles.navigation}>
                <NavItem
                    icon="calendar"
                    label="Events"
                    active={isRouteActive('MyEvents')}
                    onPress={() => navigateTo('MyEvents')}
                />
                <NavItem
                    icon="add-circle"
                    label="Plan"
                    active={isRouteActive('Home')}
                    onPress={() => navigateTo('Home')}
                />
                <NavItem
                    icon="person"
                    label="Profile"
                    active={isRouteActive('Profile')}
                    onPress={() => navigateTo('Profile')}
                />
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

const NavItem = ({ icon, label, active, onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.navItem, active && styles.navItemActive]}
    >
        <Ionicons
            name={active ? icon : `${icon}-outline` as any}
            size={24}
            color={active ? colors.primary : colors.gray500}
        />
        <Text style={[styles.navText, active && styles.navTextActive]}>
            {label}
        </Text>
        {active && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    sidebar: {
        width: 280,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
        paddingVertical: 32,
        paddingHorizontal: 24,
        height: '100%',
        // Fixed position is not needed if we use flex layout in App.tsx
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
