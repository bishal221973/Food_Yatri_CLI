import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
    Switch
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const zones = [
    'Zone A',
    'Zone B',
    'Zone C',
    'Zone D',
    'Zone E',
]

const Homeheader = ({navigation}) => {
    const [selectedZone, setSelectedZone] = useState('Zone A')
    const [modalVisible, setModalVisible] = useState(false)
    const [isOnline, setIsOnline] = useState(false)

    return (
        <View style={styles.mainContainer}>
            {/* HEADER */}
            <View style={styles.header}>

                {/* LEFT SIDE */}
                <View>
                    <Text style={styles.name}>Food Yatri</Text>

                    <TouchableOpacity
                        style={styles.zoneBtn}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.zoneText}>{selectedZone}</Text>
                        <Icon name="chevron-down" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* RIGHT SIDE */}
                <TouchableOpacity style={styles.sosBtn} onPress={() => navigation.navigate('SOS')}>
                    {/* <Icon name="warning" size={18} color="#fff" />
          <Text style={styles.sosText}>SOS</Text> */}
          {/* <View style={{ height: 35, width: 35 }}></View> */}
                    <Image source={require('../../assets/images/sos.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.scannerContainer}>

                {/* LEFT SIDE */}
                <View style={styles.left}>
                    <Text style={[styles.statusText, { color: isOnline ? '#22c55e' : '#ef4444' }]}>
                        {isOnline ? 'Online' : 'Offline'}
                    </Text>

                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#ccc', true: '#22c55e' }}
                        thumbColor="#fff"
                    />
                </View>

                {/* RIGHT SIDE */}
                <Image
                    source={require('../../assets/images/scanner.png')}
                    style={styles.avatar}
                />
            </View>

            {/* =========================
          BOTTOM ZONE MODAL
      ========================= */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>

                        <Text style={styles.modalTitle}>Hotspot Zones</Text>

                        <FlatList
                            data={zones}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.zoneItem,
                                        selectedZone === item && styles.zoneItemActive,
                                    ]}
                                    onPress={() => {
                                        setSelectedZone(item)
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.zoneItemText,
                                            selectedZone === item && styles.zoneItemTextActive,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: '#fff' }}>Close</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Homeheader
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 10,
    },
    header: {
        backgroundColor: '#1E40AF',
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 10
    },

    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    zoneBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        paddingHorizontal: 10
    },

    zoneText: {
        color: '#fff',
        marginRight: 5,
        fontSize: 13,
    },

    sosBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    sosText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold',
    },

    // MODAL
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    modalBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '100%',
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    zoneItem: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginBottom: 10,
    },

    zoneItemActive: {
        backgroundColor: '#1E40AF',
    },

    zoneItemText: {
        color: '#333',
    },

    zoneItemTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },

    closeBtn: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },

    scannerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical:5
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusText: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 10,
        color: '#fff',
    },

    avatar: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: '#f2f2f2',
    },
})