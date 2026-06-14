import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Walletheader from '../../components/Walletheader'
import Walletcard from '../../components/Walletcard'
import Wallettab from '../../components/Wallettab'
import api from '../../../utils/axiosUtils'

const Wallet = () => {

  const [earnings, setEarnings] = useState([]);
  const [todaysEarning, setTodaysEarning] = useState(0);
  const [weeklyEarning, setWeeklyEarning] = useState(0);
  const [monthlyEarning, setMonthlyEarning] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEarning = async () => {
    try {
      const res = await api.get('/rider/earnings');
      setEarnings(res.data.earnings);
      setTodaysEarning(res.data.today_total);
      setWeeklyEarning(res.data.week_total);
      setMonthlyEarning(res.data.month_total);
    } catch (error) {
      console.log('Error fetching earnings:', error);
    }
  }

  useEffect(() => {
    fetchEarning();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEarning();
    setRefreshing(false);
  }, []);

  return (
  <ScrollView
    style={{ flex: 1,backgroundColor:'#fff'}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    <View style={{flex:1}}>
<Walletheader earnings={earnings} />
    <Walletcard todaysEarning={todaysEarning} weeklyEarning={weeklyEarning} monthlyEarning={monthlyEarning}/>
    <Wallettab earnings={earnings} />
    </View>
  </ScrollView>
);
}

export default Wallet

const styles = StyleSheet.create({})