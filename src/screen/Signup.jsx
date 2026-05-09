import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const Signup = () => {
  const insets = useSafeAreaInsets()

  const [selectedType, setSelectedType] = useState('Walker')

  const [documents, setDocuments] = useState({
    birth_certificate: null,
    citizenship_front: null,
    citizenship_back: null,
  })

  const riderTypes = [
    { name: 'Walker', icon: '🚶' },
    { name: 'Bicycler', icon: '🚴' },
    { name: 'Biker', icon: '🏍️' },
    { name: 'Other', icon: '🚗' },
  ]

  const isSimpleRider =
    selectedType === 'Walker' || selectedType === 'Bicycler'

  // =========================
  // PICK FROM GALLERY
  // =========================
  const pickFromGallery = (type) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) return

        const asset = response.assets?.[0]
        if (!asset?.uri) return

        setDocuments((prev) => ({
          ...prev,
          [type]: asset,
        }))
      }
    )
  }

  // =========================
  // OPTIONS (GALLERY / SCAN)
  // =========================
  const openPickerOptions = (type) => {
    Alert.alert('Upload Document', 'Choose option', [
      {
        text: 'Gallery',
        onPress: () => pickFromGallery(type),
      },
      {
        text: 'Scan (Camera)',
        onPress: () => {
          console.log('Open camera scanner here (to be implemented)')
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 30 },
        ]}
      >
        {/* HEADER */}
        <Text style={styles.title}>Create Rider Account</Text>
        <Text style={styles.subtitle}>Join Food Yatri Rider Network</Text>

        {/* INPUTS */}
        <TextInput placeholder="Full Name" placeholderTextColor="#999" style={styles.input} />
        <TextInput placeholder="Address" placeholderTextColor="#999" style={styles.input} />
        <TextInput
          placeholder="Contact Number"
          keyboardType="number-pad"
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* RIDER TYPE */}
        <Text style={styles.sectionTitle}>Select Rider Type</Text>

        <View style={styles.grid}>
          {riderTypes.map((item, index) => {
            const active = selectedType === item.name

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeBox,
                  active && styles.typeBoxActive,
                ]}
                onPress={() => setSelectedType(item.name)}
              >
                <Text style={styles.icon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.typeText,
                    active && styles.typeTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* DOCUMENTS */}
        <Text style={styles.sectionTitle}>Documents</Text>

        {isSimpleRider ? (
          <View style={styles.row}>

            {/* 1 */}
            <TouchableOpacity
              style={styles.docBox}
              onPress={() => openPickerOptions('birth_certificate')}
            >
              {documents.birth_certificate?.uri ? (
                <Image
                  source={{ uri: documents.birth_certificate.uri }}
                  style={styles.docImage}
                />
              ) : (
                <Text style={styles.docText}>Birth Cert</Text>
              )}
            </TouchableOpacity>

            {/* 2 */}
            <TouchableOpacity
              style={styles.docBox}
              onPress={() => openPickerOptions('citizenship_front')}
            >
              {documents.citizenship_front?.uri ? (
                <Image
                  source={{ uri: documents.citizenship_front.uri }}
                  style={styles.docImage}
                />
              ) : (
                <Text style={styles.docText}>Front</Text>
              )}
            </TouchableOpacity>

            {/* 3 */}
            <TouchableOpacity
              style={styles.docBox}
              onPress={() => openPickerOptions('citizenship_back')}
            >
              {documents.citizenship_back?.uri ? (
                <Image
                  source={{ uri: documents.citizenship_back.uri }}
                  style={styles.docImage}
                />
              ) : (
                <Text style={styles.docText}>Back</Text>
              )}
            </TouchableOpacity>

          </View>
        ) : (
          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>Required Documents:</Text>
            <Text>• Driving License</Text>
            <Text>• Vehicle Registration Number</Text>
          </View>
        )}

        {/* SUBMIT */}
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
    justifyContent: 'space-between',
  },

  typeBox: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  typeBoxActive: {
    backgroundColor: '#1E40AF',
  },

  icon: {
    fontSize: 18,
    marginRight: 8,
  },

  typeText: {
    color: '#333',
    fontWeight: '600',
  },

  typeTextActive: {
    color: '#fff',
  },

  // 🔥 DOCUMENT ROW
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  docBox: {
    width: '30%',
    height: 70,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  docImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  docText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },

  uploadBox: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },

  uploadText: {
    fontWeight: '600',
  },

  submitBtn: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})