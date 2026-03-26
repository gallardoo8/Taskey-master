import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

export default function PreguntasHijo() {
    const router = useRouter();

    const questions = [
        {
            id: '1',
            question: '¿Qué pasa cuando le doy \'enviar\' una misión?',
            answer: 'Tu misión se manda a tu papá, mamá o tutor para que la revisen. Si la aprueban, ¡recibes tu recompensa!'
        },
        {
            id: '2',
            question: '¿Para qué sirven mis keys?',
            answer: 'Las keys son tus llaves mágicas. Con ellas puedes personalizar tu avatar, desbloquear nuevos artículos y agregar tu color favorito de fondo.'
        },
        {
            id: '3',
            question: '¿Qué es una racha?',
            answer: 'Una racha es cuando completas tus misiones varios días seguidos. ¡Cuantos más días cumplas sin fallar, más larga será tu racha!'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Preguntas frecuentes</Text>

                {questions.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.question}>{item.question}</Text>
                        <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Gris claro de fondo
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 36,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        textAlign: 'center',
        marginVertical: 30,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    question: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: '#7E22CE', // Morado para la pregunta
        marginBottom: 10,
    },
    answer: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
        lineHeight: 22,
    }
});
