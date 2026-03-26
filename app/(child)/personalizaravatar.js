import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CATEGORIES = [
    { id: 'heart', icon: 'heart', provider: 'Ionicons' },
    { id: 'paw', icon: 'paw', provider: 'FontAwesome5' },
    { id: 'shirt', icon: 'tshirt-crew', provider: 'MaterialCommunityIcons' },
    { id: 'headphones', icon: 'headset', provider: 'Ionicons' },
    { id: 'palette', icon: 'color-palette', provider: 'Ionicons' },
];

export default function PersonalizarAvatar() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('shirt');

    const renderCategoryIcon = (cat) => {
        const isActive = selectedCategory === cat.id;
        const color = isActive ? '#7E22CE' : '#4C1D95';

        switch (cat.provider) {
            case 'Ionicons':
                return <Ionicons name={cat.icon} size={30} color={color} />;
            case 'FontAwesome5':
                return <FontAwesome5 name={cat.icon} size={28} color={color} />;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={cat.icon} size={32} color={color} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Section: Avatar Preview */}
            <View style={styles.previewSection}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={32} color="black" />
                    </TouchableOpacity>

                    <View style={styles.keyBadge}>
                        <Image
                            source={require('../../assets/images/capillave.png')}
                            style={styles.keyIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.keyText}>500</Text>
                    </View>
                </View>

                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/images/capicons.png')}
                        style={styles.avatarImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Bottom Section: Customization Shop */}
            <View style={styles.shopSection}>
                {/* Categories Bar */}
                <View style={styles.categoriesBar}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.categoryBtn, selectedCategory === cat.id && styles.activeCategory]}
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            {renderCategoryIcon(cat)}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Grid of Items */}
                <View style={styles.itemsGrid}>
                    {/* Item 1 (Shirt from image) */}
                    <View style={styles.gridItem}>
                        <View style={styles.itemBox}>
                            <FontAwesome5 name="tshirt" size={40} color="#00AEEF" />
                        </View>
                    </View>

                    {/* Placeholder Items */}
                    {[2, 3, 4, 5, 6].map((i) => (
                        <View key={i} style={styles.gridItem}>
                            <View style={styles.itemBox}>
                                {i === 5 && (
                                    <View style={styles.lockedBadge}>
                                        <Text style={styles.lockedText}>M</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E7EB', // Fondo gris claro para el preview
    },
    previewSection: {
        height: SCREEN_HEIGHT * 0.5,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    keyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF9C3', // Amarillo suave
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    keyIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    keyText: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    avatarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: '80%',
        height: '80%',
    },
    shopSection: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 0, // Recto como en la imagen? No, parece redondeado pero muy suave
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    categoriesBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    categoryBtn: {
        padding: 10,
        borderRadius: 15,
    },
    activeCategory: {
        backgroundColor: '#F3F4F6',
    },
    itemsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
    },
    gridItem: {
        width: '33.33%',
        aspectRatio: 1,
        padding: 10,
    },
    itemBox: {
        flex: 1,
        backgroundColor: '#D1D5DB', // Gris para los placeholders
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    lockedBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: Colors.white,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.button,
    },
    lockedText: {
        color: '#8B5CF6',
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
    }
});
