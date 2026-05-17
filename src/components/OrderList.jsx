import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
// import api from '../../utils/axiosUtils';

import api from '../../utils/axiosUtils';

const OrderList = ({ location }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Accept order
  const handleAccept = async(orderId) => {
    Alert.alert('Order Accepted', `You accepted order #${orderId}`);
    const response=await api.put(`/rider/accept-order/${orderId}`);

    fetchNearbyOrders();
    // setOrders((prev) => prev.filter((order) => order.id !== orderId));
    setSelectedOrder(null);
  };

  // Fetch orders
  const fetchNearbyOrders = async () => {
    // Alert.alert(location?.lat.toString())
    try {
      const response = await api.get(`/rider/orders?lat=${location.lat}&lng=${location.lng}`);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.lat && location?.lng) {
      fetchNearbyOrders();
    }
  }, [location?.lat, location?.lng]);

  // Open Google Maps (Driving mode)
  const openGoogleMaps = (order) => {
    const riderLat = location?.lat;
    const riderLng = location?.lng;

    // const restLat = order?.current_lat;
    // const restLng = order?.current_lng;

     const restLat = order?.farest_restaurent?.restaurent_lat;
    const restLng = order?.farest_restaurent?.restaurent_lng;

    if (!riderLat || !riderLng || !restLat || !restLng) {
      Alert.alert('Location not available');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${riderLat},${riderLng}&destination=${restLat},${restLng}&travelmode=driving`;

    Linking.openURL(url);
  };

  const getLocationName = async (lat, lng) => {
  try {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK") {
      return data.results[0].formatted_address;
    } else {
      console.log("Geocode error:", data.status);
      return null;
    }
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};
  // Render order card
  const renderOrder = ({ item }) => (
    
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setSelectedOrder(item)}
      style={styles.orderCard}
    >
      <View style={styles.topRow}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text style={styles.price}>Rs. {item.total_amount}</Text>
          <Text style={{ fontSize: 12 }}>
            (EST.{' '}
            {Number(Number(item.farest_restaurent?.distance_from_me) +
              Number(item.farest_restaurent?.distance)).toFixed(2)}{' '}
            K.M.)
          </Text>
        </View>
        <View style={styles.userInfo}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAccept(item.id)}
          >
            <Text style={styles.actionText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 10 }} />
          <Text>{item?.receiver_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ height: 10, width: 10, backgroundColor: 'green', borderRadius: 10 }} />
          <Text>{item.farest_restaurent?.restaurent_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Order List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.noOrdersText}>No orders available.</Text>
        }
      />

      {/* Modal */}
      <Modal
        visible={!!selectedOrder}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Order Details</Text>

              {selectedOrder && (
                
                <>
                  <DetailRow label="Order ID" value={`#${selectedOrder.order_id}`} />
                  <DetailRow label="Total Amount" value={`Rs. ${selectedOrder.total_amount}`} />
                  <DetailRow label="Customer" value={selectedOrder?.receiver_name} />
                  <DetailRow label="Phone" value={selectedOrder?.receiver_phone} />
                  <DetailRow
                    label="Restaurant"
                    value={selectedOrder.farest_restaurent?.restaurent_name}
                  />
                  {/* <DetailRow
                    label="Restaurant Address"
                    value={selectedOrder.farest_restaurent?.restaurent_address}
                  /> */}
                  <DetailRow
                    label="Distance"
                    value={`${
                      Number(Number(selectedOrder.farest_restaurent?.distance_from_me) +
                      Number(selectedOrder.farest_restaurent?.distance)).toFixed(2)
                    } K.M.`}
                  />
                  <DetailRow label="Payment Mode" value={selectedOrder.payment_mode} />
                  <DetailRow label="Payment Status" value={selectedOrder.payment_status} />
                  
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 && (
                    <>
                      <Text style={[styles.modalTitle, { fontSize: 16, marginTop: 12 }]}>
                        Items
                      </Text>
                      {selectedOrder.items.map((it, idx) => (
                        <DetailRow
                          key={idx}
                          label={`${it.quantity || 1} x ${it.name}`}
                          value={`Rs. ${it.price}`}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.closeBtn]}
                onPress={() => setSelectedOrder(null)}
              >
                <Text style={styles.actionText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.mapBtn]}
                onPress={() => openGoogleMaps(selectedOrder)}
              >
                <Text style={styles.actionText}>Map</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.acceptButton]}
                onPress={() => handleAccept(selectedOrder?.id)}
              >
                <Text style={styles.actionText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Detail row
const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value ?? '-'}</Text>
  </View>
);

export default OrderList;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  listContent: { paddingTop: 10 },

   orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

 bottomRow: {
    justifyContent: 'space-between',
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    paddingLeft: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  acceptButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  actionText: {
    color: '#fff',
    fontWeight: '600',
  },

  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '85%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  detailLabel: {
    color: '#666',
    flex: 1,
  },

  detailValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
  },

  /* Bottom buttons FIXED */
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeBtn: {
    backgroundColor: '#6B7280',
  },

  mapBtn: {
    backgroundColor: '#16A34A',
  },
});