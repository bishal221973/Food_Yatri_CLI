import { StyleSheet, AppState } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { enableScreens } from 'react-native-screens';
import StackNavigation from "./src/navigation/StackNavigation";
import api from './utils/axiosUtils';

enableScreens(true);

const App = () => {
  const appState = useRef(AppState.currentState);

  const setUserOnline = async () => {
    try {
      await api.post('/rider/status', { status: 'online' });
      console.log('User set to online');
    } catch (error) {
      console.log('Failed to set user online:', error);
    }
  };

  const setUserOffline = async () => {
    try {
      await api.post('/rider/status', { status: 'offline' });
      console.log('User set to offline');
    } catch (error) {
      console.log('Failed to set user offline:', error);
    }
  };

  useEffect(() => {
    // Call when app first opens
    setUserOnline();

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App came to foreground
        setUserOnline();
      } else if (nextAppState.match(/inactive|background/)) {
        // App going to background
        setUserOffline();
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  return <StackNavigation />;
};

export default App;

const styles = StyleSheet.create({});