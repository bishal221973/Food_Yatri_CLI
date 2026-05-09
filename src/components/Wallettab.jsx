import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const earningsData = [
  { id: '1', title: 'Order Delivery', amount: '+₹120', time: 'Today' },
  { id: '2', title: 'Bonus', amount: '+₹300', time: 'Yesterday' },
]

const withdrawData = [
  { id: '1', title: 'Bank Transfer', amount: '-₹500', time: '2 days ago' },
  { id: '2', title: 'Cash Out', amount: '-₹1000', time: '1 week ago' },
]

const Wallettab = () => {
  const [activeTab, setActiveTab] = useState('earnings')

  const data = activeTab === 'earnings' ? earningsData : withdrawData

  return (
    <View style={styles.container}>

      {/* TAB */}
      <View style={styles.tabWrapper}>

        {/* Earnings Tab */}
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'earnings' && styles.activeTab
          ]}
          onPress={() => setActiveTab('earnings')}
        >
          <Icon
            name="trending-up-outline"
            size={18}
            color={activeTab === 'earnings' ? '#fff' : '#1E40AF'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'earnings' && styles.activeText
            ]}
          >
            Earnings
          </Text>
        </TouchableOpacity>

        {/* Withdraw Tab */}
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'withdraw' && styles.activeTab
          ]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Icon
            name="cash-outline"
            size={18}
            color={activeTab === 'withdraw' ? '#fff' : '#1E40AF'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'withdraw' && styles.activeText
            ]}
          >
            Withdraw
          </Text>
        </TouchableOpacity>

      </View>

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            <Text
              style={[
                styles.amount,
                activeTab === 'withdraw'
                  ? styles.withdrawAmount
                  : styles.earnAmount
              ]}
            >
              {item.amount}
            </Text>
          </View>
        )}
      />

    </View>
  )
}

export default Wallettab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    marginTop:10
  },

  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    height:45
  },

  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: '#1E40AF',
  },

  tabText: {
    marginLeft: 6,
    fontWeight: '700',
    color: '#1E40AF', // default blue text
  },

  activeText: {
    color: '#FFFFFF', // FIX: visible on dark background
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    elevation: 2,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  time: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  amount: {
    fontSize: 14,
    fontWeight: '800',
  },

  earnAmount: {
    color: '#16A34A',
  },

  withdrawAmount: {
    color: '#EF4444',
  },
})