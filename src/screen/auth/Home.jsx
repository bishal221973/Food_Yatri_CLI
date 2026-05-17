import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

import Homeheader from '../../components/Homeheader';
import OrderList from '../../components/OrderList';
import AcceptedOrders from '../../components/AcceptedOrders';

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  const [activeTab, setActiveTab] = useState('available');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('POSITION => ', position);

        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setLocation(currentLocation);
      },
      error => {
        console.log('ERROR => ', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Homeheader navigation={navigation} />

      <View style={{ paddingHorizontal: 10 }}>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'available' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('available')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'available' && styles.activeTabText,
              ]}>
              Available
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'accepted' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('accepted')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'accepted' && styles.activeTabText,
              ]}>
              Accepted
            </Text>
          </TouchableOpacity>
        </View>

        {/* Header */}

        {/* Content */}
        {activeTab === 'available' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                {activeTab === 'available'
                  ? 'Available Orders :'
                  : 'Accepted Orders :'}
              </Text>

              <Text style={{ fontWeight: 'bold' }}>
                25 Orders
              </Text>
            </View>

            <OrderList location={location} />
          </>
        ) : (
          <AcceptedOrders />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#f1f1f1',
    // borderRadius: 10,
    // padding: 5,
    borderBottomWidth: 2,
    borderColor: "#1E40AF"
  },

  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',

  },

  activeTab: {
    backgroundColor: '#1E40AF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  tabText: {
    color: '#000',
    fontWeight: '600',
  },

  activeTabText: {
    color: '#fff',
  },
});