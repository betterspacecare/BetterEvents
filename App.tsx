import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebSidebarNavigation } from './src/components';
import { useResponsive } from './src/hooks/useResponsive';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import EventTypeScreen from './src/screens/EventTypeScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import VendorSelectionScreen from './src/screens/VendorSelectionScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import MyEventsScreen from './src/screens/MyEventsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import EditEventScreen from './src/screens/EditEventScreen';
import EventTemplatesScreen from './src/screens/EventTemplatesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { isLargeScreen } = useResponsive();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#5A6BC7',
        tabBarInactiveTintColor: '#9e9e9e',
        headerShown: false,
        tabBarStyle: isLargeScreen ? { display: 'none' } : {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#5A6BC7',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
          paddingHorizontal: 24,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="MyEvents"
        component={MyEventsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: focused ? '#E8ECFF' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: focused ? 1 : 0.9 }],
              }}>
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={26}
                  color={focused ? '#5A6BC7' : color}
                />
              </View>
              {focused && (
                <View style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#5A6BC7',
                  marginTop: 2,
                }} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -28,
            }}>
              <View style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#5A6BC7',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                shadowColor: '#5A6BC7',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
                elevation: 8,
                transform: [{ scale: focused ? 1.05 : 1 }],
              }}>
                <Ionicons
                  name="add-circle"
                  size={28}
                  color="#ffffff"
                  style={{ textAlign: 'center' }}
                />
              </View>
              {focused && (
                <Text style={{
                  color: '#5A6BC7',
                  fontSize: 11,
                  fontWeight: '700',
                  marginTop: 4,
                  letterSpacing: 0.5,
                  textAlign: 'center',
                }}>
                  PLAN
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: focused ? '#E8ECFF' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: focused ? 1 : 0.9 }],
              }}>
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={26}
                  color={focused ? '#5A6BC7' : color}
                />
              </View>
              {focused && (
                <View style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#5A6BC7',
                  marginTop: 2,
                }} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppLayout() {
  const { isLargeScreen } = useResponsive();

  return (
    <View style={{ flex: 1, flexDirection: isLargeScreen ? 'row' : 'column', backgroundColor: '#F3F4F6' }}>
      {isLargeScreen && <WebSidebarNavigation />}
      <View style={{ flex: 1 }}>
        <View style={isLargeScreen ? { flex: 1, maxWidth: 1200, width: '100%', alignSelf: 'center' } : { flex: 1 }}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#6366f1' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventTemplates"
              component={EventTemplatesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventType"
              component={EventTypeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetails"
              component={EventDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VendorSelection"
              component={VendorSelectionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Summary"
              component={SummaryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetail"
              component={EventDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditEvent"
              component={EditEventScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <NavigationContainer>
        <AppLayout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
