import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Linking,
    TextInput,
} from 'react-native';

import SwipeButton from 'rn-swipe-button';
import api from '../../utils/axiosUtils';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

/* ================= SWIPE BUTTON (OUTSIDE MAIN COMPONENT) ================= */
const SwipeOrderButton = ({ item, onSwipe, swipeRef }) => {
    return (
        <SwipeButton
            ref={(ref) => (swipeRef.current[item.id] = ref)}
            title="SLIDE TO START DELIVERY"
            titleColor="#000"
            titleFontSize={13}
            height={42}
            thumbIconWidth={42}
            railBackgroundColor="#fff"
            railBorderColor="#0F172A"
            railFillBackgroundColor="#1E40AF"
            thumbIconBackgroundColor="#1E40AF"
            thumbIconBorderColor="#1E40AF"
            borderRadius={14}
            shouldResetAfterSuccess={false}
            onSwipeSuccess={(reset) => {
                onSwipe(item.id, reset);
            }}
        />
    );
};

/* ================= MAIN COMPONENT ================= */
const AcceptedOrders = ({ location }) => {
    const [orders, setOrders] = useState([]);

    // ✅ IMPORTANT: store refs per item
    const swipeRefs = useRef({});

    const fetchNearbyOrders = async () => {
        try {
            const response = await api.get(
                `/rider/accepted-orders?lat=${location?.lat}&lng=${location?.lng}`
            );
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNearbyOrders();
    }, [location]);


    const [orderId, setOrderId] = useState('');
    const handleConfirm = async (item) => {
        try {
            const response = await api.put(
                `/rider/accept-order-delivered/${item}`,
                {
                    orderId: orderId,
                }
            );

            fetchNearbyOrders();
            Alert.alert('Success', 'Order marked as delivered');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Something went wrong');
        }
    };
    /* ================= GOOGLE MAPS ================= */
    const openGoogleMaps = (order) => {
        const riderLat = location?.lat;
        const riderLng = location?.lng;

        const customerLat = order?.current_lat;
        const customerLng = order?.current_lng;

        if (!riderLat || !riderLng || !customerLat || !customerLng) {
            Alert.alert('Location not available');
            return;
        }

        const restaurants = order?.restaurants || [];

        const waypoints = restaurants
            .map((r) => `${r.lat},${r.lng}`)
            .join('|');

        const url = `https://www.google.com/maps/dir/?api=1&origin=${riderLat},${riderLng}&destination=${customerLat},${customerLng}&waypoints=${encodeURIComponent(
            waypoints
        )}&travelmode=driving`;

        Linking.openURL(url);
    };

    /* ================= CONFIRM DELIVERY ================= */
    const markOutForDelivery = (orderId, reset) => {
        Alert.alert(
            'Confirm Delivery',
            'Are you sure you want to start delivery?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        swipeRefs.current[orderId]?.reset?.();
                    },
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await api.put(
                                `/rider/accept-order-out-for-delivery/${orderId}`
                            );

                            Alert.alert('Success', 'Order updated');
                            fetchNearbyOrders();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to update status');

                            swipeRefs.current[orderId]?.reset?.();
                            // reset?.();
                        }
                    },
                },
            ]
        );
    };


    /* ================= RENDER ================= */
    const renderOrder = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconBox}>
                    <FontAwesome6 name="bag-shopping" size={18} color="#fff" />
                </View>

                <View style={styles.headerRow}>
                    <View style={styles.leftBox}>
                        <Text style={styles.smallText}>Deliver To</Text>
                        <Text style={styles.boldText}>
                            {item.receiver_name}
                        </Text>
                    </View>

                    <View style={styles.rightBox}>
                        <Text style={[styles.smallText, { textAlign: 'right' }]}>
                            Distance
                        </Text>
                        <Text style={[styles.boldText, { textAlign: 'right' }]}>
                            {Number(
                                Number(item.farest_restaurent?.distance_from_me || 0) +
                                Number(item.farest_restaurent?.distance || 0)
                            ).toFixed(1)} km
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.rowBetween}>
                    <View style={styles.row}>
                        <FontAwesome6 name="phone" size={16} color="#1E40AF" />
                        <Text style={{ marginLeft: 8 }}>
                            {item?.receiver_phone}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => openGoogleMaps(item)}>
                        <FontAwesome6 name="map" size={18} color="#1E40AF" />
                    </TouchableOpacity>
                </View>
                {item.available_for_delevery != 'Out for delivery' ? (

                    <View style={{ marginTop: 12 }}>
                        <SwipeOrderButton
                            item={item}
                            onSwipe={markOutForDelivery}
                            swipeRef={swipeRefs}
                        />
                    </View>
                ) : (
                    <View style={styles.row1}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Order ID"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={orderId}
                            onChangeText={setOrderId}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => handleConfirm(item.id)}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );

    if (!orders || orders.length === 0) {
        return <View  />;
    }
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>Active Orders</Text>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={renderOrder}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
};

export default AcceptedOrders;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    card: {
        borderRadius: 16,
        backgroundColor: '#fff',
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 3,
    },
    header: {
        backgroundColor: '#1E40AF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    iconBox: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#EB5454',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    leftBox: {
        borderRightWidth: 1,
        borderColor: '#999',
        paddingRight: 16,
    },
    rightBox: {
        width: '40%',
    },
    smallText: {
        color: '#E5E7EB',
        fontSize: 11,
    },
    boldText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    body: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // if RN version doesn't support gap, use marginLeft on button
        // margin: 16,
        marginTop: 10
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#F9FAFB',
    },

    button: {
        backgroundColor: '#1E40AF',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});