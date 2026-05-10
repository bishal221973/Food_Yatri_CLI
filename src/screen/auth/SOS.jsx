import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const recentAlerts = [
  { id: '1', type: 'Emergency', message: 'SOS sent to authorities', time: '2 mins ago' },
  { id: '2', type: 'Location Shared', message: 'Your location sent to contacts', time: '1 hour ago' },
  { id: '3', type: 'Emergency', message: 'SOS sent to authorities', time: 'Yesterday' },
  { id: '4', type: 'Emergency', message: 'SOS sent to authorities', time: 'Yesterday' },
  { id: '5', type: 'Emergency', message: 'SOS sent to authorities', time: 'Yesterday' },
  { id: '6', type: 'Emergency', message: 'SOS sent to authorities', time: 'Yesterday' },
];

const SOS = ({ navigation }) => {
  const handleCall = (number) => Linking.openURL(`tel:${number}`);

  const handleSendSOS = () =>
    Alert.alert('SOS Alert', 'Your emergency alert has been sent!', [{ text: 'OK' }]);

  const handleShareLocation = () =>
    Alert.alert(
      'Location Shared',
      'Your current location has been sent to your emergency contacts.',
      [{ text: 'OK' }]
    );

  const renderAlert = ({ item }) => (
    <View style={styles.alertCard}>
      <View style={styles.alertLeft}>
        <Icon name="alert-circle-outline" size={22} color="#EF4444" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.alertType}>{item.type}</Text>
          <Text style={styles.alertMessage}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.alertTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Emergency SOS</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* SOS Button */}
        <View style={styles.sosSection}>
          <TouchableOpacity style={styles.sosButton} onPress={handleSendSOS}>
            {/* <Icon name="alert-circle" size={50} color="#fff" /> */}
            <Image source={require('../../../assets/images/help.png')} style={{height:50,width:50}}/>
            <Text style={styles.sosText}>Company Alert</Text>
          </TouchableOpacity>
          <Text style={styles.sosInstruction}>
            Press the button above to send an emergency alert to authorities and your contacts.
          </Text>
        </View>

        {/* Quick Contact */}
        <View style={styles.quickContact}>
          <Text style={styles.sectionTitle}>Quick Contacts</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={[styles.contactBtn, { backgroundColor: '#EF4444' }]}
              onPress={() => handleCall('9814668499')}
            >
              <Icon name="call" size={24} color="#fff" />
              <Text style={styles.contactText}>Police</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactBtn, { backgroundColor: '#3B82F6' }]}
              onPress={() => handleCall('9814668499')}
            >
              <Icon name="call" size={24} color="#fff" />
              <Text style={styles.contactText}>Ambulance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactBtn, { backgroundColor: '#10B981' }]}
              onPress={handleShareLocation}
            >
              <Icon name="location" size={24} color="#fff" />
              <Text style={styles.contactText}>Share Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.recentAlerts}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <FlatList
            data={recentAlerts}
            keyExtractor={(item) => item.id}
            renderItem={renderAlert}
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'android' ? 30 : 0,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SOS;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    paddingBottom: Platform.OS === 'android' ? 20 : 0, // Add padding for nav bar
  },
  header: {
    backgroundColor: '#1E40AF',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sosSection: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  sosButton: {
    backgroundColor: '#EF4444',
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  sosText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sosInstruction: {
    color: '#6B7280',
    fontSize: 13,
    textAlign: 'center',
  },
  quickContact: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  recentAlerts: {
    paddingHorizontal: 16,
    flex: 1,
  },
  alertCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  alertMessage: {
    fontSize: 12,
    color: '#6B7280',
  },
  alertTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});