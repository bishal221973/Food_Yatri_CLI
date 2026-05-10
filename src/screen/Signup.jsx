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
import Icon from 'react-native-vector-icons/Ionicons'
import { post } from '../../utils/axiosUtils'
import api from '../../utils/axiosUtils'
import FastImage from 'react-native-fast-image'

const Signup = ({navigation}) => {
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
  const [errors, setErrors] = useState({})

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

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')
  const validateForm = () => {
    const newErrors = {}

    // TEXT FIELDS
    if (!name.trim()) newErrors.name = 'Full name is required'
    if (!address.trim()) newErrors.address = 'Address is required'
    if (!phone.trim()) newErrors.phone = 'Contact number is required'

    // RIDER TYPE
    if (!selectedType) newErrors.riderType = 'Rider type is required'

    // DOCUMENT VALIDATION
    if (isSimpleRider) {
      if (!documents.birth_certificate?.uri)
        newErrors.birth_certificate = 'Birth certificate is required'

      if (!documents.citizenship_front?.uri)
        newErrors.citizenship_front = 'Citizenship front is required'

      if (!documents.citizenship_back?.uri)
        newErrors.citizenship_back = 'Citizenship back is required'
    } else {
      if (!documents.licence?.uri)
        newErrors.licence = 'Licence is required'

      if (!vehicleNo.trim())
        newErrors.vehicle_no = 'Vehicle number is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const submitForm = async () => {
    
    if (!validateForm()) return
    try {
      const formData = new FormData()

      // TEXT DATA
      formData.append('name', name)
      formData.append('address', address)
      formData.append('contact', phone)
      formData.append('rider_type', selectedType)
      formData.append('vehicle_number', vehicleNo)
      // alert(name)
      // DOCUMENTS (IMAGES) 
      Object.keys(documents).forEach((key) => {
        const file = documents[key]

        if (file?.uri) {
          formData.append(key, {
            uri: file.uri,
            type: file.type || 'image/jpeg',
            name: file.fileName || `${key}.jpg`,
          })
        }
      })

      // console.log(formData)

      // const response = await post('/rider/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: formData,
      // })

      const response = await api.post('/rider/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const data = response.data;
      console.log('SERVER RESPONSE:', data)

      if (data.success) {
        setSuccessModalVisible(true);
      } else {
        alert('Failed to submit')
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      {successModalVisible && (
        <View style={[styles.modalOverlay,{zIndex:99999,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:30}]}>
          <View style={[styles.modalBox, { alignItems: 'center',justifyContent:'center',borderRadius:10 }]}>
            {/* <Text style={{ fontSize: 40, marginBottom: 15 }}>✅</Text> */}
            <Image source={require('../../assets/images/check.png')} style={{height:70,width:70}}/>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
              Registration successfull!
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>Your account is currently under verification. We will notify you as soon as the verification process is complete.</Text>
            <TouchableOpacity
              style={[styles.modalBtn, { width: '100%' }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 30 },
        ]}
      >
        {/* HEADER */}
        <Text style={styles.title}>Rider Account</Text>
        <Text style={styles.subtitle}>Join Food Yatri Rider Network</Text>

        {/* INPUTS */}
        <TextInput placeholder="Full Name" placeholderTextColor="#999" style={styles.input} value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <TextInput placeholder="Address" placeholderTextColor="#999" style={styles.input} value={address}
          onChangeText={setAddress}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        <TextInput
          placeholder="Contact Number"
          keyboardType="number-pad"
          style={styles.input}
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}

        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}


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
        <Text style={styles.sectionTitle}>Documents * :</Text>

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
                <Text style={styles.docText}>Birth{"\n"}Certificate</Text>
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
                <Text style={styles.docText}>Citizenship {"\n"} Front</Text>
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
                <Text style={styles.docText}>Citizenship {"\n"}Back</Text>
              )}
            </TouchableOpacity>

          </View>
        ) : (
          <View style={[styles.uploadBox, { flexDirection: 'column', alignItems: 'center' }]}>
            <TouchableOpacity
              style={[styles.docBox, { width: '50%', height: 100, marginBottom: 10 }]}
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
            <TextInput placeholder="Vehicle Number" value={vehicleNo} onChangeText={setVehicleNo} placeholderTextColor="#999" style={[styles.input, { width: '100%' }]} />
          </View>
        )}

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitBtn} onPress={submitForm}>
          <Text style={styles.submitText}>Register Now</Text>
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
    marginTop: 15,
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
    marginBottom: 10,
    alignItems: 'center'
  },

  typeBoxActive: {
    backgroundColor: '#1E40AF',
  },

  icon: {
    marginRight: 8,
    fontSize: 20
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
    textAlign: 'center'
  },

  uploadBox: {
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },

  submitBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
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
  errorText: {
    color: 'red',
    fontSize: 10
  }
})