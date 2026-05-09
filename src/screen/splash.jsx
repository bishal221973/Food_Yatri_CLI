import React, { useEffect, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native'

const Splash = ({ navigation }) => {

  const dot1 = useRef(new Animated.Value(1)).current
  const dot2 = useRef(new Animated.Value(1)).current
  const dot3 = useRef(new Animated.Value(1)).current

  useEffect(() => {

    const createPulse = (anim) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1.5,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      )
    }

    const a1 = createPulse(dot1)
    const a2 = createPulse(dot2)
    const a3 = createPulse(dot3)

    a1.start()

    setTimeout(() => a2.start(), 150)
    setTimeout(() => a3.start(), 300)

    const timer = setTimeout(() => {
      navigation.replace('Login')
    }, 4000)

    return () => {
      clearTimeout(timer)
      a1.stop()
      a2.stop()
      a3.stop()
    }

  }, [navigation])

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoContainer}>

        <Image
          source={require('../../assets/images/delivery.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>
          <Text style={{ color: '#1E40AF' }}>Food</Text>
          <Text style={{ color: 'red' }}> Yatri</Text>
        </Text>

        <Text style={styles.tagline}>Rider</Text>
      </View>

      {/* Loader */}
      <View style={styles.loaderContainer}>
        <View style={styles.dotsRow}>

          <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />

        </View>

        {/* <Text style={styles.loadingText}>Loading...</Text> */}
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -20,
  },

  tagline: {
    fontSize: 18,
    marginTop: 5,
    fontFamily: 'rider',
    color: '#666',
  },

  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },

  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#999',
    marginHorizontal: 5,
    marginTop:-200
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
})