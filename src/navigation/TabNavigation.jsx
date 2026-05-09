import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import Home from "../screen/auth/Home"
import Wallet from "../screen/auth/Wallet"
import Notification from "../screen/auth/Notification"
import SOS from "../screen/auth/SOS"
import Gigs from "../screen/auth/Gigs"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Tabs = () => {
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline'
          else if (route.name === 'Wallet') iconName = focused ? 'wallet' : 'wallet-outline'
          else if (route.name === 'Gigs') iconName = focused ? 'fast-food' : 'fast-food-outline'
          else if (route.name === 'Update') iconName = focused ? 'notifications' : 'notifications-outline'
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Gigs" component={Gigs} />
      <Tab.Screen name="Update" component={Notification} />
      {/* Do NOT include SOS here */}
    </Tab.Navigator>
  )
}

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name="SOS" component={SOS} />
    </Stack.Navigator>
  )
}

export default RootNavigation