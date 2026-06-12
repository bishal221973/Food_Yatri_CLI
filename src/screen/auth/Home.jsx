import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import OrderList from '../../components/OrderList';
import AcceptedOrders from '../../components/AcceptedOrders';
import Homeheader from '../../components/Homeheader';
const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('available');
  const [refreshing, setRefreshing] = useState(false);

  // ================= LOCATION =================
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(currentLocation);
      },
      error => {
        console.log('LOCATION ERROR =>', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Permission denied');
      }
    } else {
      getCurrentLocation();
    }
  };

  // ================= PULL TO REFRESH =================
  const onRefresh = async () => {
    setRefreshing(true);
    await requestLocationPermission();
    setRefreshing(false);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // ================= UI =================
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Homeheader navigation={navigation} />
      <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>

        {/* ACCEPTED ORDERS HEADER (optional) */}
        {location && <AcceptedOrders location={location} />}
        {/* CONTENT */}
        {activeTab === 'available' ? (
          <>
            <View style={styles.headerRow}>
              <Text style={{ fontWeight: 'bold' }}>
                Available Orders :
              </Text>

              <Text style={{ fontWeight: 'bold' }}>
                25 Orders
              </Text>
            </View>

            <OrderList location={location} />
          </>
        ) : (
          <AcceptedOrders location={location} />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

// ================= STYLES =================
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 2,
    borderColor: '#1E40AF',
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
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

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});