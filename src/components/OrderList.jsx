import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import api from '../../utils/axiosUtils';
import Loading from './Loading';
const ordersData = [
    { id: '1', customer: 'John Doe', phone: '+1234567890', address: '123 Main St', price: '$12.50', paymentStatus: 'Paid', paymentMode: 'Cash' },
    { id: '2', customer: 'Alice Smith', phone: '+1987654321', address: '456 Park Ave', price: '$15.00', paymentStatus: 'Pending', paymentMode: 'Esewa' },
    { id: '3', customer: 'Bob Johnson', phone: '+1122334455', address: '789 Oak St', price: '$9.75', paymentStatus: 'Paid', paymentMode: 'Cash' },
    { id: '4', customer: 'Emma Brown', phone: '+1222333444', address: '321 Pine Rd', price: '$18.20', paymentStatus: 'Paid', paymentMode: 'Esewa' },
];

const OrderList = ({ location }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleAccept = (orderId) => {
        Alert.alert('Order Accepted', `You accepted order #${orderId}`);
        setOrders(prev => prev.filter(order => order.id !== orderId));
    };

    const fetchNearbyOrders = async () => {
        try {
            const response = await api.get('/rider/orders', {
                lat: location?.lat,
                lng: location?.lng,
            });
            setOrders(response.data);
        } catch (error) {

        } finally {
            setLoading(false);
        }
        // API CALL HERE
    };
    useEffect(() => {
        if (location?.lat && location?.lng) {
            fetchNearbyOrders();
        }
    }, [location?.lat, location?.lng]);

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            {/* Top Row: Profile + Name + Phone + Price */}
            <View style={styles.topRow}>
                <View style={styles.userInfo}>
                    {/* <Text>{location?.lat}</Text>
                    <Text>{location?.lng}</Text> */}
                    <View style={styles.profileCircle}>
                        <Text style={styles.profileInitial}>{item.customer?.charAt(0)}</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.customerName}>{item.customer}</Text>
                        <Text style={styles.phone}>{item.phone}</Text>
                    </View>
                </View>
                <Text style={styles.price}>{item.price}</Text>
            </View>

            {/* Bottom Row: Status/Mode + Accept Button */}
            <View style={styles.bottomRow}>
                <View style={styles.statusContainer}>
                    <View style={[
                        styles.paymentStatus,
                        item.paymentStatus?.toLowerCase() === 'paid' ? styles.paid : styles.pending
                    ]}>
                        <Text style={styles.paymentText}>{item.paymentStatus}</Text>
                    </View>
                    <Text style={styles.infoText}>{item.paymentMode}</Text>
                </View>
                <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item.id)}>
                    <Text style={styles.actionText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={renderOrder}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={styles.noOrdersText}>No orders available.</Text>}
        />
    );
};

export default OrderList;

const styles = StyleSheet.create({
    listContent: {
        paddingTop: 10,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
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
        marginBottom: 8,
    },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    profileCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1E40AF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    profileInitial: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    userDetails: {},
    customerName: { fontSize: 16, fontWeight: '600', color: '#222' },
    phone: { fontSize: 13, color: '#555', marginTop: 1 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: { fontSize: 12, color: '#555', backgroundColor: '#f0f0f0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    paymentStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    paid: { backgroundColor: '#4CAF50' },
    pending: { backgroundColor: '#F44336' },
    paymentText: { color: '#fff', fontWeight: '600', fontSize: 12 },
    acceptButton: {
        backgroundColor: '#1E40AF',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    actionText: { color: '#fff', fontSize: 13, fontWeight: '600' },
    noOrdersText: { textAlign: 'center', marginTop: 20, fontSize: 14, color: '#777' },
});