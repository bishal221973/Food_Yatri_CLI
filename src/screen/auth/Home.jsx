import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
import React, { useEffect } from 'react';

import Homeheader from '../../components/Homeheader';
import OrderList from '../../components/OrderList';

const Home = ({ navigation }) => {

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
      } else {
        console.log('Location permission denied');
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View>
      <Homeheader navigation={navigation} />

      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontWeight: 'bold' }}>
            Available Orders :
          </Text>

          <Text style={{ fontWeight: 'bold' }}>
            25 Orders
          </Text>
        </View>

        <OrderList />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});