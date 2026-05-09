import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'

// Sample notification data
const notificationsData = [
  { id: '1', type: 'order', title: 'Order Delivered', description: 'Your order #1234 has been delivered', time: '2 hrs ago', unread: true },
  { id: '2', type: 'offer', title: 'New Offer', description: 'Get 20% off on your next order!', time: 'Yesterday', unread: true },
  { id: '3', type: 'wallet', title: 'Wallet Updated', description: '₹500 has been added to your wallet', time: '2 days ago', unread: false },
  { id: '4', type: 'reminder', title: 'Reminder', description: 'Your subscription will renew tomorrow', time: '3 days ago', unread: false },
  { id: '5', type: 'offer', title: 'Flash Sale', description: '50% off on select items!', time: 'Today', unread: true },
]

const filters = ['All', 'Orders', 'Offers', 'Wallet', 'Reminders']

const Notification = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredNotifications = notificationsData.filter((item) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Orders' && item.type === 'order') return true
    if (activeFilter === 'Offers' && item.type === 'offer') return true
    if (activeFilter === 'Wallet' && item.type === 'wallet') return true
    if (activeFilter === 'Reminders' && item.type === 'reminder') return true
    return false
  })

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Update Notifications</Text>
        {/* <TouchableOpacity>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity> */}
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersWrapper}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
     <View style={{flex:1,marginTop:'-130%'}}>
         <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20,marginTop:0 }}
        renderItem={({ item }) => (
          <View style={[styles.card, item.unread && styles.unreadCard]}>
            <View style={styles.textWrapper}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
     </View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop:30
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#BBDEFB',
  },
  filtersWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom:0,
    margin:0,
    marginBottom:-50,
    height:60,
    overflow:'hidden'
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    marginRight: 10,
    height:30
  },
  activeFilter: {
    backgroundColor: '#1E40AF',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E40AF',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#1E40AF',
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginLeft: 6,
  },
})