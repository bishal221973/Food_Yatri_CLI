import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const Signup = () => {
  const insets = useSafeAreaInsets()

  const [selectedType, setSelectedType] = useState('Walker')

  const [modalVisible, setModalVisible] = useState(false)
  const [activeDocType, setActiveDocType] = useState(null)

  const [documents, setDocuments] = useState({
    birth_certificate: null,
    citizenship_front: null,
    citizenship_back: null,
    licence: null,
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
  // GALLERY PICKER
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
  // OPEN MODAL
  // =========================
  const openPickerOptions = (type) => {
    setActiveDocType(type)
    setModalVisible(true)
  }

  // =========================
  // MODAL ACTIONS
  // =========================
  const onPickGallery = () => {
    setModalVisible(false)
    if (activeDocType) pickFromGallery(activeDocType)
  }

  const onScan = () => {
    setModalVisible(false)
    if (activeDocType) openCamera(activeDocType)
  }

  const openCamera = (type) => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return
        if (response.errorCode) return

        const asset = response.assets?.[0]
        if (!asset?.uri) return

        setDocuments((prev) => ({
          ...prev,
          [type]: asset,
        }))
      }
    )
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
                <Text style={[styles.typeText, active && styles.typeTextActive]}>
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
                <Text style={styles.docText}>Birth</Text>
              )}
            </TouchableOpacity>

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
          <View style={[styles.uploadBox,{flexDirection:'column',alignItems:'center'}]}>
            <TouchableOpacity
              style={[styles.docBox,{width:'50%',height:100,marginBottom:10}]}
              onPress={() => openPickerOptions('licence')}
            >
              {documents.licence?.uri ? (
                <Image
                  source={{ uri: documents.licence.uri }}
                  style={styles.docImage}
                />
              ) : (
                <Text style={styles.docText}>Licence</Text>
              )}
            </TouchableOpacity>
            <TextInput placeholder="Vehicle Number" placeholderTextColor="#999" style={[styles.input,{width:'100%'}]} />
          </View>
        )}

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* =========================
          CUSTOM MODAL
      ========================= */}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Upload Document</Text>
            <Text style={styles.modalSubtitle}>
              Choose upload method
            </Text>

            <TouchableOpacity style={styles.modalBtn} onPress={onPickGallery}>
              <Text style={styles.modalBtnText}>📁 Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalBtn} onPress={onScan}>
              <Text style={styles.modalBtnText}>📷 Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#eee', marginBottom: 50 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalBtnText, { color: '#333' }]}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      )}

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
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },

 grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

  typeBox: {
    width: '48%',
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:10,
    alignItems:'center'
  },

  typeBoxActive: {
    backgroundColor: '#1E40AF',
  },

  icon: {
    marginRight: 8,
    fontSize:20
  },

  typeText: {
    fontWeight: '600',
    color: '#333',
  },

  typeTextActive: {
    color: '#fff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  docBox: {
    width: '30%',
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  docImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  docText: {
    fontSize: 12,
    fontWeight: '600',
  },

  uploadBox: {
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },

  submitBtn: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },

  modalBtn: {
    backgroundColor: '#1E40AF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  modalBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
})