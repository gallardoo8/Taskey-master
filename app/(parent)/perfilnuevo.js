import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { crearHijo, editarHijo } from '../../services/api';
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GENDER_OPTIONS = ['Masculino', 'Femenino', 'Otro'];

// Calcula la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth() - nacimiento.getMonth();
    if (mesActual < 0 || (mesActual === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

export default function PerfilNuevo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isEditMode = params.mode === 'edit';

    // States
    const [name, setName] = useState(params.name || '');
    const [apellido, setApellido] = useState(params.apellido || '');
    const [gender, setGender] = useState(params.genero || 'Masculino');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Date logic
    const initialDate = params.fecha_nacimiento ? new Date(params.fecha_nacimiento) : new Date();
    const [birthday, setBirthday] = useState(initialDate);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [hasSelectedDate, setHasSelectedDate] = useState(isEditMode && !!params.fecha_nacimiento);

    // Edad calculada
    const edadCalculada = hasSelectedDate ? calcularEdad(birthday) : null;

    const handleBackPress = () => {
        router.back();
    };

    const handleCreateProfile = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }

        setSaving(true);
        try {
            const token = await AsyncStorage.getItem('parent_token');

            const datos = {
                nombre: name.trim(),
                apellido: apellido.trim() || null,
                genero: gender,
                fecha_nacimiento: hasSelectedDate
                    ? birthday.toISOString().split('T')[0]
                    : null,
            };

            if (isEditMode) {
                await editarHijo(token, params.id, datos);
                router.replace({
                    pathname: '/administrarperfiles',
                    params: { updatedProfile: 'true' }
                });
            } else {
                const data = await crearHijo(token, datos);
                router.replace({
                    pathname: '/administrarperfiles',
                    params: {
                        createdName: name.trim(),
                        createdCode: data.codigo_vinculacion || 'N/A'
                    }
                });
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setSaving(false);
        }
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthday(selectedDate);
            setHasSelectedDate(true);
        }
    };

    const formattedDay = hasSelectedDate ? birthday.getDate().toString().padStart(2, '0') : '';
    const formattedMonth = hasSelectedDate ? (birthday.getMonth() + 1).toString().padStart(2, '0') : '';

    return (
        <View style={styles.container}>
            {/* Custom Decorated Header */}
            <View style={styles.headerBackground}>
                <View style={styles.circlePink} />
                <View style={styles.circleGreen} />
                <View style={styles.circleCyan} />
                <View style={styles.circleOrange} />
            </View>

            {/* Header Content */}
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditMode ? 'Editar perfil' : 'Perfil nuevo'}</Text>
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {/* Avatar Placeholder */}
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require('../../assets/images/capihijo.png')}
                            style={styles.avatarPlaceholder}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Name Input */}
                    <TextInput
                        style={styles.inputName}
                        placeholder="Nombre"
                        placeholderTextColor="#9CA3AF"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Apellido Input */}
                    <TextInput
                        style={styles.inputName}
                        placeholder="Apellido (opcional)"
                        placeholderTextColor="#9CA3AF"
                        value={apellido}
                        onChangeText={setApellido}
                    />

                    {/* Gender */}
                    <Text style={styles.label}>Género</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderButton, isEditMode && { backgroundColor: '#7E22CE' }]}
                            onPress={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                        >
                            <Text style={styles.genderButtonText}>{gender}</Text>
                            <Ionicons name={isGenderDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="white" />
                        </TouchableOpacity>

                        {isGenderDropdownOpen && (
                            <View style={styles.dropdown}>
                                {GENDER_OPTIONS.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={styles.dropdownOption}
                                        onPress={() => {
                                            setGender(option);
                                            setIsGenderDropdownOpen(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownOptionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Birthday */}
                    <Text style={styles.label}>
                        Cumpleaños <Text style={{ fontSize: 16 }}>🎂</Text>
                    </Text>

                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateRow}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateText}>{formattedDay || 'Día'}</Text>
                            {hasSelectedDate && <Text style={styles.dateLabelSmall}>Día</Text>}
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateText}>{formattedMonth || 'Mes'}</Text>
                            {hasSelectedDate && <Text style={styles.dateLabelSmall}>Mes</Text>}
                        </View>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={birthday}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                            maximumDate={new Date()}
                        />
                    )}

                    {/* Edad calculada */}
                    {edadCalculada !== null && (
                        <View style={styles.ageDisplay}>
                            <Text style={styles.ageLabel}>Edad: </Text>
                            <Text style={styles.ageValue}>{edadCalculada} años</Text>
                        </View>
                    )}

                    {/* Create/Save Button */}
                    <TouchableOpacity
                        style={[styles.createButton, isEditMode && { backgroundColor: '#7E22CE' }, saving && { opacity: 0.5 }]}
                        onPress={handleCreateProfile}
                        disabled={saving}
                    >
                        <Text style={styles.createButtonText}>
                            {saving ? 'Guardando...' : (isEditMode ? 'Guardar cambios' : 'Crear perfil')}
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    headerBackground: {
        height: SCREEN_HEIGHT * 0.12,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#F3F4F6',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.primary,
        marginLeft: 10,
    },
    circlePink: {
        position: 'absolute',
        top: -20,
        left: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF009B',
    },
    circleGreen: {
        position: 'absolute',
        top: 20,
        left: '30%',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#AAD62D',
    },
    circleCyan: {
        position: 'absolute',
        top: 50,
        right: '25%',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#00AEEB',
    },
    circleOrange: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primaryDark,
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        ...Shadows.button,
    },
    avatarWrapper: {
        marginBottom: 20,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E5E7EB',
    },
    inputName: {
        width: '100%',
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 10,
    },
    // Gender
    genderContainer: {
        zIndex: 10,
        marginBottom: 20,
        width: '60%',
        alignItems: 'center',
    },
    genderButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
    },
    genderButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
    },
    dropdown: {
        position: 'absolute',
        top: 45,
        width: '100%',
        backgroundColor: '#E5E7EB',
        borderRadius: 15,
        padding: 5,
        elevation: 5,
    },
    dropdownOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownOptionText: {
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
    },
    // Date
    dateRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 15,
    },
    dateBox: {
        backgroundColor: '#EEEEEE',
        width: 60,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        fontFamily: Fonts.figtreeRegular,
        color: '#6B7280',
        fontSize: 14,
    },
    dateLabelSmall: {
        fontSize: 10,
        color: '#6B7280',
        fontFamily: Fonts.figtreeRegular,
        marginTop: 2
    },
    // Age display
    ageDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#F3F4F6',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    ageLabel: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#6B7280',
    },
    ageValue: {
        fontFamily: Fonts.figtreebold,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    // Create Button
    createButton: {
        backgroundColor: Colors.primary,
        width: '80%',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        ...Shadows.button,
    },
    createButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 18,
    },
});
