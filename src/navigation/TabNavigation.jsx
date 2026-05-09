import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Home from "../screen/auth/Home"
import Wallet from "../screen/auth/Wallet"
import Notification from "../screen/auth/Notification"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const Tab = createBottomTabNavigator()

const Profile = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
)


const Gigs = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Wallet Screen</Text>
  </View>
)

const TabNavigation = () => {
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Update') {
            iconName = focused ? 'notifications' : 'notifications-outline'
          }else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline'
          }else if (route.name === 'Gigs') {
            iconName = focused ? 'fast-food' : 'fast-food-outline'
          }
          

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
    </Tab.Navigator>
  )
}

export default TabNavigation