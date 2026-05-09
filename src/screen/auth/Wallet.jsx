import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Walletheader from '../../components/Walletheader'
import Walletcard from '../../components/Walletcard'
import Wallettab from '../../components/Wallettab'
const Wallet = () => {
  return (
    <View>
      <Walletheader/>
      <Walletcard/>
      <Wallettab/>
    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({})