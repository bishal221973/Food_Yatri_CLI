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
import api from '../../utils/axiosUtils';
import Waypoints from "../components/Waypoints"
const OrderList = ({ location }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleAccept = async (orderId) => {
   await api.put(`/rider/accept-order/${orderId}`);
    setVisible(false);
    fetchNearbyOrders();
    setSelectedOrder(null);
  };

  const fetchNearbyOrders = async () => {
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

  const openGoogleMaps = (order) => {
          const riderLat = location?.lat;
          const riderLng = location?.lng;
  
          const customerLat = order?.current_lat;
          const customerLng = order?.current_lng;
  
          const restaurants = order?.restaurants || [];
  
          if (!riderLat || !riderLng || !customerLat || !customerLng) {
              Alert.alert('Location not available');
              return;
          }
  
          const waypoints = restaurants
              .map((r) => `${r.lat},${r.lng}`)
              .join('|');
    
          const url = `https://www.google.com/maps/dir/?api=1&origin=${riderLat},${riderLng}&destination=${customerLat},${customerLng}&waypoints=${encodeURIComponent(
              waypoints
          )}&travelmode=driving`;
  
          Linking.openURL(url);
      };

  
  const renderOrder = ({ item }) => (
    <>

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
      <Waypoints restaurants={item?.restaurants}/>
      </TouchableOpacity>

    </>
  );

  return (
    <View styles={{ position: 'relative' }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.noOrdersText}>No orders available.</Text>
        }
      />

      <Modal
        visible={!!selectedOrder}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* <ScrollView> */}
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
                  <DetailRow
                    label="Distance"
                    value={`${Number(Number(selectedOrder.farest_restaurent?.distance_from_me) +
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
            {/* </ScrollView> */}

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
                style={[styles.modalBtn, styles.acceptButton]} Top
                onPress={() => handleAccept(selectedOrder?.id)}
              >
                <Text style={styles.actionText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    </View>
  );
};

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

  acceptButtonTop: {
    backgroundColor: '#1E40AF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    width: 100,
    position: 'absolute', zIndex: 1,
    top: 10,
    right: 10
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









  // ==================================
  acceptBtn: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  message: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },

  confirmBtn: {
    backgroundColor: '#1E40AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  cancelText: {
    color: '#555',
    fontWeight: '600',
  },

  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});