import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import EarningList from "./EarningList"
const withdrawData = [
  {
    id: "1",
    title: "Bank Transfer",
    amount: 500,
    time: "2 days ago",
  },
  {
    id: "2",
    title: "Cash Out",
    amount: 1000,
    time: "1 week ago",
  },
];

const Wallettab = ({ earnings = [] }) => {
  const [activeTab, setActiveTab] = useState("earnings");

  const data =
    activeTab === "earnings" ? earnings : withdrawData;

  

  return (
    <View style={[styles.container, { flex: 1,backgroundColor:'#fff' }]}>
      {/* TABS */}
      {/* <Text>No records found.</Text> */}
      <View style={styles.tabWrapper}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "earnings" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("earnings")}
        >
          <Icon
            name="trending-up-outline"
            size={18}
            color={
              activeTab === "earnings"
                ? "#fff"
                : "#1E40AF"
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === "earnings" &&
              styles.activeText,
            ]}
          >
            Earnings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "withdraw" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("withdraw")}
        >
          <Icon
            name="cash-outline"
            size={18}
            color={
              activeTab === "withdraw"
                ? "#fff"
                : "#1E40AF"
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === "withdraw" &&
              styles.activeText,
            ]}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No records found.</Text>
        </View>
      ) : (
        <View style={{flex:1 }}>
          {activeTab == "earnings" ? <EarningList earnings={earnings} /> : <EarningList />}

        </View>
        // <Text>No records found.</Text>
        // <FlatList
        //   data={data}
        //   keyExtractor={(item, index) =>
        //     String(item.id || index)
        //   }
        //   contentContainerStyle={{
        //     paddingTop: 15,
        //     paddingBottom: 80,
        //   }}
        //   renderItem={renderItem}
        // />
      )}
    </View>
  );
};

export default Wallettab;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 12,
    marginTop: 10,
  },

  tabWrapper: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 14,
    height: 45,
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: "#1E40AF",
  },

  tabText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#1E40AF",
  },

  activeText: {
    color: "#fff",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    elevation: 2,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  time: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },

  amount: {
    fontSize: 14,
    fontWeight: "800",
  },

  earnAmount: {
    color: "#16A34A",
  },

  withdrawAmount: {
    color: "#EF4444",
  },

  emptyContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});