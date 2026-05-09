import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homeheader from '../../components/Homeheader'
const Home = ({navigation}) => {
  return (
    <View>
        <Homeheader navigation={navigation}/>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})