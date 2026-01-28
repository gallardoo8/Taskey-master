import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FAQS = [
    {
        question: "¿Cuál es el límite de perfiles que puedo registrar en mi cuenta?",
        answer: "El límite de perfiles por cuenta de tutor es de 8."
    },
    {
        question: "¿Cómo vinculo el celular de mi hijo a su perfil?",
        answer: "Al momento de crear el perfil de un hijo, aparece en pantalla el código para vincularlo. Ingresa ese código desde el celular de tu hijo y se realizará la vinculación."
    },
    {
        question: "¿Cómo creo un perfil nuevo?",
        answer: "Ve a Inicio > Administrar perfiles > Agregar perfil. Llena los datos solicitados para completar la información del perfil y vincula el dispositivo deseado con el código que aparece en pantalla."
    }
];

export default function PreguntasFrecuentes() {
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
                <Text style={styles.headerTitle}>Preguntas frecuentes</Text>
            </View>

            <FlatList
                data={FAQS}
                renderItem={({ item }) => (
                    <View style={styles.faqCard}>
                        <Text style={styles.question}>{item.question}</Text>
                        <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <>
                        <View style={styles.contactCard}>
                            <Text style={styles.contactText}>
                                ¿Tienes otra pregunta? Comunícate con nosotros en <Text style={styles.contactEmail}>help@taskkey.com</Text>
                            </Text>
                        </View>
                        <View style={{ height: 100 }} />
                    </>
                }
            />

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
    faqCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Shadows.button,
        shadowColor: "#000",
        shadowOpacity: 0.05,
    },
    question: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.primaryDark,
        marginBottom: 10,
    },
    answer: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#4B5563', // Gray 600
        lineHeight: 20,
    },
    contactCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Shadows.button,
        alignItems: 'center',
    },
    contactText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'center',
    },
    contactEmail: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.primary,
    }
});
