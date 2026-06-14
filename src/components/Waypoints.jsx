import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Waypoints = ({ restaurants = [] }) => {
  // Total stops including Me and Client
  const totalSteps = restaurants.length + 2; 

  return (
    <View style={styles.container}>
      {/* Background Connector Line */}
      <View style={styles.lineBackground} />

      <View style={styles.row}>
        {/* 1. Driver Start Point */}
        <View style={[styles.item, { flex: 1 / totalSteps }]}>
          <View style={[styles.iconWrapper, styles.driverBorder]}>
            <FontAwesome6 name="motorcycle" size={14} color="#16A34A" />
          </View>
          <Text style={styles.label} numberOfLines={1}>Me</Text>
        </View>

        {/* 2. Dynamic Restaurant Stops */}
        {restaurants.map((rest, index) => (
          <View key={index} style={[styles.item, { flex: 1 / totalSteps }]}>
            <View style={[styles.iconWrapper, styles.shopBorder]}>
              <FontAwesome6 name="shop" size={14} color="#2563EB" />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {rest?.restaurent_name || `Rest. ${index + 1}`}
            </Text>
          </View>
        ))}

        {/* 3. Final Client Destination */}
        <View style={[styles.item, { flex: 1 / totalSteps }]}>
          <View style={[styles.iconWrapper, styles.clientBorder]}>
            <FontAwesome6 name="user" size={14} color="#F59E0B" />
          </View>
          <Text style={styles.label} numberOfLines={1}>Client</Text>
        </View>
      </View>
    </View>
  );
};

export default Waypoints;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  lineBackground: {
    position: 'absolute',
    left: 32, // Offsets line to start from center of first icon
    right: 32, // Offsets line to end at center of last icon
    top: 16, // Centers line vertically relative to the 32px icon wrapper
    height: 2,
    backgroundColor: '#E5E7EB',
    zIndex: 0,
  },
  item: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // Soft Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  driverBorder: {
    borderColor: '#DCFCE7', // Light green ring
  },
  shopBorder: {
    borderColor: '#DBEAFE', // Light blue ring
  },
  clientBorder: {
    borderColor: '#FEF3C7', // Light amber ring
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
    width: '100%',
  },
});