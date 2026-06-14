import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileHeader = () => {
    return (
        <View style={styles.header}>
            {/* Notification Bell Top Right */}
            <TouchableOpacity style={styles.notificationBtn}>
                <Icon name="notifications-outline" size={28} color="#FFF" />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>3</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.profileRow}>
                <View style={[styles.avatarWrapper, { backgroundColor: '#ffffff50', padding: 18, borderRadius: 50 }]}>
                    <Icon name="person" size={35} color="#FFF" />
                    <TouchableOpacity style={styles.cameraIconContainer}>
                        <Icon name="camera" size={12} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileTextContainer}>
                    <Text style={styles.riderNameText}>Rider Name</Text>
                    <View style={styles.statusPill}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Active Rider</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0B46DC',
        height: 180,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
        position: 'relative',
    },
    notificationBtn: {
        position: 'absolute',
        top: 25,
        right: 20,
        padding: 6,
    },

    badge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#EF4444',
        borderRadius: 9,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#0B46DC',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: 'bold',
    },

    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 2,
        right: -2,
        backgroundColor: '#22C55E',
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0B46DC',
    },
    profileTextContainer: {
        marginLeft: 16,
    },
    riderNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 6,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: '#22C55E',
        marginRight: 6,
    },
    statusText: {
        color: '#E0E7FF',
        fontSize: 12,
        fontWeight: '500',
    },
})