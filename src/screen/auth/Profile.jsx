import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileHeader from "../../components/ProfileHeader"
import WalletSummary from "../../components/WalletSummary"
export default function App() {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0B46DC" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* 1. HEADER SECTION */}
        <ProfileHeader/>
       

        {/* MAIN BODY CONTENTS */}
        <View style={styles.body}>

          {/* 2. CURRENT BALANCE CARD */}
        <WalletSummary/>

          {/* 3. QUAD STATS GRID BOXES */}
        

          {/* 4. QUICK ACTIONS LIST */}
          <Text style={styles.sectionHeading}>Quick Actions</Text>
          <View style={styles.actionMenuCard}>
            <ActionItem icon="person-outline" iconBg="#EEF2FF" iconColor="#4F46E5" title="Edit Profile" subtitle="Update your personal information" />
            <ActionItem icon="wallet-outline" iconBg="#ECFDF5" iconColor="#10B981" title="Earnings Details" subtitle="View your earnings breakdown" isLine />
            <ActionItem icon="bicycle-outline" iconBg="#FFF1F2" iconColor="#F43F5E" title="Delivery History" subtitle="View all your deliveries" isLine />
            <ActionItem icon="log-out-outline" iconBg="#FEF2F2" iconColor="#EF4444" title="Logout" subtitle="Sign out from your account" isLine />
          </View>

        </View>
      </ScrollView>

    
    </View>
  );
}

/* REUSABLE LIST ITEM ELEMENT */
const ActionItem = ({ icon, iconBg, iconColor, title, subtitle, isLine }) => (
  <View>
    {isLine && <View style={styles.separatorLine} />}
    <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
      <View style={[styles.actionIconContainer, { backgroundColor: iconBg }]}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.actionTextBody}>
        <Text style={styles.actionTitleText}>{title}</Text>
        <Text style={styles.actionSubtitleText}>{subtitle}</Text>
      </View>
      <Icon name="chevron-forward" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  </View>
);

/* REUSABLE NAV BUTTON ELEMENT */
const TabButton = ({ icon, label, active }) => (
  <TouchableOpacity style={styles.tabButton}>
    <Icon name={icon} size={24} color={active ? '#0B46DC' : '#9CA3AF'} />
    <Text style={[styles.tabLabel, { color: active ? '#0B46DC' : '#9CA3AF', fontWeight: active ? '600' : '400' }]}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  /* HEADER DESIGN styling details */
 
 
  
  /* METRIC MAIN WALLET BOX */
 
  /* 2X2 BOX STATISTICS GRID */
  
  /* QUICK ACTIONS ROW LIST styles */
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 12,
  },
  actionMenuCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTextBody: {
    flex: 1,
    marginLeft: 14,
  },
  actionTitleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  actionSubtitleText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 54,
  },
  /* TAB NAVIGATION STYLING */
  bottomBarContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
  },
});
