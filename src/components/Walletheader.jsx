import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const WalletHeader = ({earnings}) => {
  const totalEarning = (earnings || []).reduce((sum, item) => {
  return sum + Number(item.rider_amount || 0);
}, 0);
  return (
    <View style={styles.headerContainer}>
        <View style={styles.header}>

      {/* decorative bubbles */}
      <View style={[styles.bubble, styles.bubble1]} />
      <View style={[styles.bubble, styles.bubble2]} />
      <View style={[styles.bubble, styles.bubble3]} />

      {/* LEFT SIDE */}
      <View>
        <Text style={styles.label}>Available Balance</Text>
        <Text style={styles.balance}>Rs. {Number(totalEarning).toFixed(2)}</Text>
        <Text style={[styles.label,{fontSize:10}]}>Instant withdraw available</Text>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.iconBox}>
        <Icon name="wallet-outline" size={26} color="#1E40AF" />
      </View>

    </View>
    <TouchableOpacity style={styles.btnWithdraw}>
        <Text>Withdraw Money</Text>
    </TouchableOpacity>
    </View>
  )
}

export default WalletHeader
const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor: '#1E40AF',
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation:5
    
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 13,
    color: '#E5E7EB',
    fontWeight: '500',
  },

  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },

  iconBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
  },

  // ===== bubbles =====
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 100,
  },

  bubble1: {
    width: 150,
    height: 150,
    top: -50,
    right: -30,
  },

  bubble2: {
    width: 50,
    height: 50,
    bottom: 10,
    left: 20,
  },

  bubble3: {
    width: 30,
    height: 30,
    top: 20,
    left: 120,
  },
  btnWithdraw:{
    backgroundColor:"#f2f2f2",
    flexDirection:'row',
    justifyContent:'center',
    paddingVertical:8,
    borderRadius:10,
    marginTop:10
  }
})