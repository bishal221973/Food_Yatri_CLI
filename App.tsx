import { StyleSheet } from 'react-native'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import StackNavigation from "./src/navigation/StackNavigation";

enableScreens(true);

const App = () => {
  return <StackNavigation />
}

export default App

const styles = StyleSheet.create({})