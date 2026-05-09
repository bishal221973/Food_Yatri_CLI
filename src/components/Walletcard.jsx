import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Walletcard = () => {
  return (
    <View style={styles.container}>

      {/* TODAY */}
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
          <Icon name="today-outline" size={18} color="#1E40AF" />
        </View>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.amount}>₹ 450</Text>
      </View>

      {/* THIS WEEK */}
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
          <Icon name="calendar-outline" size={18} color="#16A34A" />
        </View>
        <Text style={styles.title}>This Week</Text>
        <Text style={styles.amount}>₹ 2,800</Text>
      </View>

      {/* THIS MONTH */}
      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#FFE4E6' }]}>
          <Icon name="bar-chart-outline" size={18} color="#E11D48" />
        </View>
        <Text style={styles.title}>This Month</Text>
        <Text style={styles.amount}>₹ 11,500</Text>
      </View>

    </View>
  )
}

export default Walletcard
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 12,
  },

  card: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },

  title: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginTop: 3,
  },
})