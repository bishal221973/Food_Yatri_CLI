import React, { useEffect, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'

const Splash = ({ navigation }) => {

  const dot1 = useRef(new Animated.Value(0)).current
  const dot2 = useRef(new Animated.Value(0)).current
  const dot3 = useRef(new Animated.Value(0)).current

  useEffect(() => {

    const createLoop = (dot, delay) => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      )

      animation.start()
      return animation
    }

    const anim1 = createLoop(dot1, 0)
    const anim2 = createLoop(dot2, 200)
    const anim3 = createLoop(dot3, 400)

    // Optional: auto navigate after 4s
    // const timer = setTimeout(() => {
    //   navigation.replace('Login')
    // }, 4000)

    return () => {
      clearTimeout(timer)
      anim1.stop()
      anim2.stop()
      anim3.stop()
    }

  }, [])

  return (
    <View style={styles.container}>

      {/* Logo Section */}
      <View style={styles.logoContainer}>

        <Image
          source={require('../../assets/images/delivery.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>
          <Text style={{ color: '#1e90ff' }}>Food</Text>
          <Text style={{ color: 'red', fontFamily: 'rider' }}> Yatri</Text>
        </Text>

        <Text style={styles.tagline}>Rider</Text>
      </View>

      {/* Loader */}
      <View style={styles.loaderContainer}>
        <View style={styles.dotsRow}>

          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />

        </View>

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
    marginTop: -25,
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

  dotsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },

  loadingText: {
    fontSize: 14,
    color: '#555',
  },
})