import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homeheader from '../../components/Homeheader'
import OrderList from '../../components/OrderList'
const Home = ({navigation}) => {
  return (
    <View>
        <Homeheader navigation={navigation}/>
      <View style={{padding:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold'}}>Available Orders :</Text>
            <Text style={{fontWeight:'bold'}}>25 Orders</Text>
        </View>
        <OrderList/>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})