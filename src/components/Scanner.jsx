import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Scanner = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('QrScanners');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image
          source={require('../../assets/images/scanner.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});