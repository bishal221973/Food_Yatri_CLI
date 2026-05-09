import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const Splash = ({ navigation }) => {

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace('Login')
  //   }, 5000)

  //   return () => clearTimeout(timer)
  // }, [navigation])

  return (
    <View style={styles.container}>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        
        <Image
          source={require('../../public/delivery.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>
          <Text style={{ color: '#1e90ff' }}>Food</Text>
          <Text style={{ color: 'red' }}> Yatri</Text>
        </Text>

        <Text style={styles.tagline}>Rider</Text>
      </View>

      {/* Loader */}
      <View style={styles.loaderContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>

    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop:-25
  },

  tagline: {
    fontSize: 18,
    marginTop: 5,
    fontStyle: 'italic',
  },

  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
})