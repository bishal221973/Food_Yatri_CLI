import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

import Homeheader from '../../components/Homeheader';
import OrderList from '../../components/OrderList';

const Home = ({ navigation }) => {

  const [location, setLocation] = useState(null);

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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{ fontWeight: 'bold' }}>
            Available Orders :
          </Text>

          <Text style={{ fontWeight: 'bold' }}>
            25 Orders
          </Text>
        </View>

        <OrderList location={location}/>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});