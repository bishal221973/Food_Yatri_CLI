import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';
import api from '../../utils/axiosUtils';
import { useNavigation } from '@react-navigation/native';
const QrScanner = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleScan = (event) => {
    if (scanned) return;

    setScanned(true);

    const vendorId = event.nativeEvent?.codeStringValue || '';

    if (vendorId) {
      fetchOrders(vendorId)
    }

  };
  const [modalVisible, setModalVisible] = useState(false);

  const [orders, setOrders] = useState([]);
  const [restaurant, setRestaurant] = useState();
  // const fetchOrders = async (vendorId) => {
  //   const response = await api.post('/vendor/vendor-order', {
  //     vendorId: vendorId
  //   });
  //   // Alert.alert(JSON.stringify(response.data))
  //   setOrders(response.data.orders);
  //   setRestaurant(response.data.restaurent);
  //   if(response.data.orders.length > 1){
  //     setModalVisible(true);
  //   }else if(response.data.orders.length == 1){
  //     const response = await api.put(`/rider/accept-order-final/${response.data.orders[0]?.id}`);
  //   }
  // }
  const fetchOrders = async (vendorId) => {
    try {
      const res = await api.post('/vendor/vendor-order', {
        vendorId: vendorId,
      });

      const orders = res?.data?.orders || [];
      const restaurant = res?.data?.restaurent || null;

      setOrders(orders);
      setRestaurant(restaurant);

      if (orders.length > 1) {
        setModalVisible(true);
      } else if (orders.length === 1) {
        await api.put(`/rider/accept-order-final/${orders[0]?.id}`);
        navigation.replace('Home'); 
      }
    } catch (error) {
      console.log('fetchOrders error:', error);
      // optionally show alert
      // Alert.alert('Error', 'Failed to fetch orders');
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        scanBarcode={true}
        onReadCode={handleScan}
      />

      <View style={styles.overlay}>
        <View style={styles.scanBox} />
        <View style={styles.logo}>
          <Text style={[styles.name, { color: '#1E40AF' }]}>Food</Text>
          <Text style={[styles.name, { color: "#DC2525" }]}>Yatri</Text>
        </View>
        <Text style={styles.text}>
          Point your camera at a QR Code
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>{restaurant?.name}</Text>
            <Text style={{ textAlign: 'center', marginTop: -10 }}>{restaurant?.address}</Text>

            {orders?.length > 0 ? (
              orders.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Text>Order ID: {item.id}</Text>
                  <Text>Total: {item.total_amount}</Text>
                </View>
              ))
            ) : (
              <Text>No orders found</Text>
            )}

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setModalVisible(false);
                setScanned(false);
              }}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#00FF00',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },

  text: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#1E40AF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    top: 150,
    flexDirection: 'row',
    gap: 10
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold'
  },





  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },

  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  closeBtn: {
    marginTop: 15,
    backgroundColor: '#1E40AF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});