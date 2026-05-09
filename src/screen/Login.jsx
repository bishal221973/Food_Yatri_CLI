import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native'

const Login = ({ navigation }) => {

  const [phone, setPhone] = useState('')

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      {/* Logo Section */}
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

        <Text style={styles.tagline}>Rider Login</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>

        <Text style={styles.label}>Phone Number</Text>

        <View style={styles.inputBox}>
          <Text style={styles.countryCode}>+977</Text>

          <TextInput
            placeholder="Enter phone number"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            maxLength={10}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: phone.length >= 10 ? '#1E40AF' : '#A5B4FC' }
          ]}
          disabled={phone.length < 10}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={{ color: '#1E40AF', fontWeight: 'bold' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 90,
    height: 90,
  },

  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily:'rider'
  },

  formContainer: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },

  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },

  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signupText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
})