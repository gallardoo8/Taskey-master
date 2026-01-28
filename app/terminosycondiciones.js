import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TerminosYCondiciones() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Términos y condiciones</Text>
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {/* Icon Header */}
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/images/tareas.png')}
                            style={{ width: 40, height: 40, tintColor: '#60A5FA' }}
                            resizeMode="contain"
                        />
                        {/* Overlay/Edit to match design if needed, using simple image for now */}
                    </View>

                    <Text style={styles.textParagraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>

                    <Text style={styles.textParagraph}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </Text>

                    <Text style={styles.textParagraph}>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </Text>
                </View>

                {/* Space for nav bar */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="perfil" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.06,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 30,
        ...Shadows.button,
        minHeight: SCREEN_HEIGHT * 0.7,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 30,
        backgroundColor: '#EFF6FF', // Light blue bg
        padding: 15,
        borderRadius: 12,
    },
    textParagraph: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#4B5563', // Gray 600
        lineHeight: 22,
        marginBottom: 20,
        textAlign: 'center', // Design shows centered text
    }
});
