import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator()

const Home = () => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text>Home Screen</Text>
  </View>
)

const Profile = () => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text>Profile Screen</Text>
  </View>
)

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNavigation