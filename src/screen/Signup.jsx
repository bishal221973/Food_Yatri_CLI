import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const Signup = () => {

  const insets = useSafeAreaInsets()
  const [selectedType, setSelectedType] = useState('Walker')

  const riderTypes = [
    { name: 'Walker', icon: '🚶' },
    { name: 'Bicycler', icon: '🚴' },
    { name: 'Biker', icon: '🏍️' },
    { name: 'Other', icon: '🚗' },
  ]

  const isSimpleRider =
    selectedType === 'Walker' || selectedType === 'Bicycler'

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 30 }
        ]}
      >

        {/* Header */}
        <Text style={styles.title}>Create Rider Account</Text>
        <Text style={styles.subtitle}>Join Food Yatri Rider Network</Text>

        {/* Inputs */}
        <TextInput placeholder="Full Name" placeholderTextColor={'#999'} style={styles.input} />
        <TextInput placeholder="Address" placeholderTextColor={'#999'} style={styles.input} />
        <TextInput
          placeholder="Contact Number"
          keyboardType="number-pad"
          style={styles.input}
          placeholderTextColor={'#999'}
        />

        {/* Rider Type */}
        <Text style={styles.sectionTitle}>Select Rider Type</Text>

        <View style={styles.grid}>
          {riderTypes.map((item, index) => {
            const active = selectedType === item.name

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeBox,
                  active && styles.typeBoxActive
                ]}
                onPress={() => setSelectedType(item.name)}
              >
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={[
                  styles.typeText,
                  active && styles.typeTextActive
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Documents */}
        <Text style={styles.sectionTitle}>Documents</Text>

        {isSimpleRider ? (
          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>Required Documents:</Text>
            <Text>• Birth Certificate</Text>
            <Text>• Citizenship Front</Text>
            <Text>• Citizenship Back</Text>

            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Upload Documents</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>Required Documents:</Text>
            <Text>• Driving License</Text>
            <Text>• Vehicle Registration Number</Text>

            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Upload Documents</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Create Account</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  typeBox: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    flexDirection:'row',
    justifyContent:'center',
    gap:10
  },

  typeBoxActive: {
    backgroundColor: '#1E40AF',
  },

  icon: {
    fontSize: 20,
    marginBottom: 5,
  },

  typeText: {
    color: '#333',
    fontWeight: '600',
  },

  typeTextActive: {
    color: '#fff',
  },

  uploadBox: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },

  uploadText: {
    fontWeight: '600',
    marginBottom: 5,
  },

  uploadBtn: {
    marginTop: 10,
    backgroundColor: '#1E40AF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  uploadBtnText: {
    color: '#fff',
    fontWeight: '600',
  },

  submitBtn: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

})