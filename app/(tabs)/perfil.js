import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PerfilDePapaTab() {
    const router = useRouter();
    const [username, setUsername] = useState("Gaby Pacheco");
    const [tempUsername, setTempUsername] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleBackPress = () => {
        router.back();
    };

    const handlePreguntasPress = () => {
        router.push('/preguntasfrecuentes');
    };

    const handleTyCPress = () => {
        router.push('/terminosycondiciones');
    };

    const handleLogoutPress = () => {
        router.replace('/');
    };

    const handleOpenModal = () => {
        setTempUsername(username);
        setIsModalVisible(true);
    };

    const handleSaveUsername = () => {
        if (tempUsername.trim() !== "") {
            setUsername(tempUsername);
            setIsModalVisible(false);
        }
    };

    const handleCancelEdit = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerBackground}>
                <View style={[styles.circle, styles.circle1]} />
                <View style={[styles.circle, styles.circle2]} />

                <View style={styles.profileBanner}>
                    <Image
                        source={require("../../assets/images/capinombre.png")}
                        style={styles.capyImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.headerName}>{username}</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    {/* Nombre de Usuario */}
                    <View style={styles.menuItem}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FACC15' }]}>
                            <FontAwesome5 name="user" size={20} color="white" />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <View style={styles.labelRow}>
                                <Text style={styles.menuLabel}>Nombre de usuario</Text>
                                <TouchableOpacity onPress={handleOpenModal}>
                                    <Feather name="edit-2" size={16} color="black" style={styles.editIcon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.menuValue}>{username}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Correo */}
                    <View style={styles.menuItem}>
                        <View style={[styles.iconContainer, { backgroundColor: '#3B82F6' }]}>
                            <MaterialIcons name="email" size={20} color="white" />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuLabel}>Correo electrónico</Text>
                            <Text style={[styles.menuValue, styles.emailText]}>gabspachecho@gmail.com</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Preguntas Frecuentes */}
                    <TouchableOpacity style={styles.menuItem} onPress={handlePreguntasPress}>
                        <View style={[styles.iconContainer, { backgroundColor: '#06B6D4' }]}>
                            <FontAwesome5 name="question" size={20} color="white" />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuLabel}>Preguntas frecuentes</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* Terminos y condiciones */}
                    <TouchableOpacity style={styles.menuItem} onPress={handleTyCPress}>
                        <View style={[styles.iconContainer, { backgroundColor: '#E2E8F0' }]}>
                            <Image
                                source={require("../../assets/images/tareas.png")}
                                style={{ width: 20, height: 20, tintColor: Colors.primary }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuLabel}>Términos y condiciones</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Cerrar Sesión Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
                        <MaterialIcons name="logout" size={24} color="white" style={{ marginRight: 10 }} />
                        <Text style={styles.logoutText}>Cerrar sesión</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* Modal para Editar Nombre de Usuario */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={handleCancelEdit}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar nombre de usuario</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.modalInput}
                                value={tempUsername}
                                onChangeText={setTempUsername}
                                placeholder="Nombre de usuario"
                                autoFocus={true}
                            />
                            {tempUsername.length > 0 && (
                                <TouchableOpacity onPress={() => setTempUsername("")} style={styles.clearButton}>
                                    <Ionicons name="close" size={24} color="black" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <Text style={styles.hintText}>Este campo no debe estar vacío</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveButton, tempUsername.trim() === "" && { opacity: 0.5 }]}
                                onPress={handleSaveUsername}
                                disabled={tempUsername.trim() === ""}
                            >
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    headerBackground: {
        backgroundColor: Colors.primary,
        height: SCREEN_HEIGHT * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circle1: { // Pink circle left
        width: 100,
        height: 100,
        backgroundColor: Colors.pink,
        bottom: -20,
        left: -20,
    },
    circle2: { // Cyan/Teal circle right
        width: 120,
        height: 120,
        backgroundColor: '#06B6D4',
        bottom: -40,
        right: -30,
    },
    profileBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
        justifyContent: 'flex-start',
        ...Shadows.button,
    },
    capyImage: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    headerName: {
        fontFamily: Fonts.figtreebold,
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    contentContainer: {
        flex: 1,
        marginTop: -30,
        zIndex: 2,
        paddingHorizontal: 20,
        paddingBottom: SCREEN_HEIGHT * 0.12, // Space for navigation bar
    },
    card: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        ...Shadows.button,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuTextContainer: {
        flex: 1,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    menuLabel: {
        fontFamily: Fonts.figtreebold,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 4,
    },
    menuValue: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#6B7280',
    },
    emailText: {
        textDecorationLine: 'underline',
    },
    editIcon: {
        marginLeft: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FF4C4C',
        marginTop: 40,
        borderRadius: 25, // Capsule shape
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        alignSelf: 'flex-start', // Fit contentish
        ...Shadows.button,
    },
    logoutText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Estilos del Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.white,
        width: '85%',
        borderRadius: 25,
        padding: 24,
        alignItems: 'center',
        ...Shadows.button,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 40,
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    modalInput: {
        flex: 1,
        paddingVertical: 12,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 16,
        color: '#4B5563',
    },
    clearButton: {
        marginLeft: 10,
    },
    hintText: {
        fontSize: 12,
        fontFamily: Fonts.figtreeRegular,
        color: '#9CA3AF',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 32,
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#FF5E5E',
        borderRadius: 15,
        paddingVertical: 12,
        width: '46%',
        alignItems: 'center',
        ...Shadows.button,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        paddingVertical: 12,
        width: '46%',
        alignItems: 'center',
        ...Shadows.button,
    },
    buttonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontSize: 16,
    },
});

