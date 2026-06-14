import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const WalletSummary = () => {
    return (
        <>
            <View style={styles.balanceCard}>
                <View style={styles.balanceLeftColumn}>
                    <Text style={styles.balanceTitle}>Current Balance</Text>
                    <Text style={styles.balanceValue}>Rs 4,500</Text>
                    <TouchableOpacity style={styles.withdrawButton}>
                        <Icon name="wallet-outline" size={16} color="#FFF" style={styles.buttonIcon} />
                        <Text style={styles.withdrawText}>Withdraw Funds</Text>
                    </TouchableOpacity>
                </View>

                {/* Wallet Visual Illustration */}
                <View style={styles.walletIllustrationContainer}>
                    <View style={styles.walletBody}>
                        <View style={styles.cashSprout1} />
                        <View style={styles.cashSprout2} />
                        <View style={styles.walletFlap} />
                        <View style={styles.walletButton} />
                    </View>
                    <View style={styles.currencyBadge}>
                        <Text style={styles.currencySymbol}>Rs.</Text>
                    </View>
                </View>
            </View>

            <View style={styles.gridContainer}>
                {/* Row 1 */}
                <View style={styles.gridRow}>
                    {/* Total Earnings */}
                    <View style={[styles.statBox, { backgroundColor: '#F0FDF4' }]}>
                        <View style={styles.boxHeader}>
                            <View style={[styles.iconFrame, { backgroundColor: '#DCFCE7' }]}>
                                <Icon name="cash" size={18} color="#16A34A" />
                            </View>
                            <Text style={styles.boxLabel}>Total Earnings</Text>
                        </View>
                        <Text style={styles.boxValue}>Rs 12,500</Text>
                        <Text style={[styles.trendText, { color: '#16A34A' }]}>↗ +12% this week</Text>
                    </View>

                    {/* Withdrawn */}
                    <View style={[styles.statBox, { backgroundColor: '#FFFDF2' }]}>
                        <View style={styles.boxHeader}>
                            <View style={[styles.iconFrame, { backgroundColor: '#FEF3C7' }]}>
                                <Icon name="lock-open" size={18} color="#D97706" />
                            </View>
                            <Text style={styles.boxLabel}>Withdrawn</Text>
                        </View>
                        <Text style={styles.boxValue}>Rs 8,000</Text>
                        <Text style={[styles.trendText, { color: '#D97706' }]}>↗ +8% this week</Text>
                    </View>
                </View>

                {/* Row 2 */}
                <View style={styles.gridRow}>
                    {/* Delivered */}
                    <View style={[styles.statBox, { backgroundColor: '#F0F9FF' }]}>
                        <View style={styles.boxHeader}>
                            <View style={[styles.iconFrame, { backgroundColor: '#E0F2FE' }]}>
                                <Icon name="bicycle" size={18} color="#0284C7" />
                            </View>
                            <Text style={styles.boxLabel}>Delivered</Text>
                        </View>
                        <Text style={styles.boxValue}>48</Text>
                        <Text style={[styles.trendText, { color: '#0284C7' }]}>↗ +5 this week</Text>
                    </View>

                    {/* Cancelled */}
                    <View style={[styles.statBox, { backgroundColor: '#FEF2F2' }]}>
                        <View style={styles.boxHeader}>
                            <View style={[styles.iconFrame, { backgroundColor: '#FEE2E2' }]}>
                                <Icon name="close-circle" size={18} color="#DC2626" />
                            </View>
                            <Text style={styles.boxLabel}>Cancelled</Text>
                        </View>
                        <Text style={styles.boxValue}>3</Text>
                        <Text style={[styles.trendText, { color: '#DC2626' }]}>↘ -1 this week</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default WalletSummary

const styles = StyleSheet.create({
    balanceCard: {
        backgroundColor: '#f2f2f2',
        borderRadius: 24,
        marginTop: -30,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
    },
    balanceLeftColumn: {
        flex: 1,
    },
    balanceTitle: {
        color: '#374f70',
        fontSize: 13,
    },
    balanceValue: {
        color: '#1a0b8d',
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    withdrawButton: {
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    buttonIcon: {
        marginRight: 6,
    },
    withdrawText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 13,
    },
    /* GEOMETRIC CSS WALLET ARTWORK */
    walletIllustrationContainer: {
        width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    walletBody: {
        width: 85,
        height: 55,
        backgroundColor: '#3B82F6',
        borderRadius: 10,
        position: 'relative',
    },
    cashSprout1: {
        position: 'absolute',
        top: -10,
        left: 15,
        width: 45,
        height: 20,
        backgroundColor: '#4ADE80',
        borderRadius: 4,
        transform: [{ rotate: '-5deg' }],
    },
    cashSprout2: {
        position: 'absolute',
        top: -14,
        left: 25,
        width: 45,
        height: 20,
        backgroundColor: '#22C55E',
        borderRadius: 4,
        transform: [{ rotate: '8deg' }],
    },
    walletFlap: {
        position: 'absolute',
        right: 0,
        top: 8,
        width: 50,
        height: 24,
        backgroundColor: '#1D4ED8',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    walletButton: {
        position: 'absolute',
        right: 36,
        top: 17,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#93C5FD',
    },
    currencyBadge: {
        position: 'absolute',
        bottom: -6,
        right: -2,
        backgroundColor: '#436fac',
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#0F172A',
    },
    currencySymbol: {
        color: '#E2E8F0',
        fontSize: 11,
        fontWeight: 'bold',
    },










    gridContainer: {
        marginTop: 16,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statBox: {
        width: '48.5%',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconFrame: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
        marginLeft: 8,
    },
    boxValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    trendText: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 6,
    },
})