import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const EarningList = ({ earnings = [] }) => {
    const renderItem = ({ item }) => {
        const order = item.order || {};
        const customer = order.user || {};

        return (
            <View style={styles.card}>
                {/* TOP ROW */}
                <View style={styles.header}>
                    <Text style={styles.orderId}>
                        Order #{order.order_id || "N/A"}
                    </Text>
                    {/* <Text>{JSON.stringify(earnings)}</Text> */}

                    <Text style={styles.date}>
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </Text>
                </View>

                {/* BODY */}
                <View style={styles.row}>
                    <Text style={styles.value}>{customer.name || "Unknown"}</Text>
                </View>



                <View style={styles.row}>
                    <Text style={[styles.value, { color: 'green', fontWeight: 'bold', fontSize: 22 }]}>
                        Rs. {Number(item.rider_amount || 0).toFixed(2)}
                    </Text>
                </View>




            </View>
        );
    };

    return (
        <FlatList
            data={earnings}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default EarningList;

const styles = StyleSheet.create({
    list: {
        padding: 12,
        paddingBottom: 100,
    },

    card: {
        width: "100%",          // ✅ full row card
        backgroundColor: "#fff",
        marginBottom: 12,
        paddingHorizontal: 15,
        borderStyle:'dashed',
        borderBottomWidth:1,
        borderColor:'#ccc',
        paddingTop:10
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    orderId: {
        fontWeight: "700",
        fontSize: 16,
    },

    amount: {
        fontWeight: "700",
        fontSize: 18,
        color: "#16A34A",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    label: {
        color: "#6B7280",
    },

    value: {
        color: "#111827",
    },

    date: {
        marginTop: 10,
        color: "#9CA3AF",
        fontSize: 12,
    },
});