import { useHijosViewModel } from '../../viewmodels/useHijosViewModel';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Alert, Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GENDER_OPTIONS = ['Masculino', 'Femenino', 'Otro'];

const MONTHS = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => currentYear - i);

function getDaysInMonth(month, year) {
    if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
    return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);
}

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

    const [name, setName] = useState(params.name || '');
    const [apellido, setApellido] = useState(params.apellido || '');
    const [gender, setGender] = useState(params.genero || 'Masculino');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    
    const { crearHijo, editarHijo } = useHijosViewModel();

    // Logica de las fechas
    const initDate = params.fecha_nacimiento ? new Date(params.fecha_nacimiento) : null;
    const [selectedDay, setSelectedDay] = useState(initDate ? initDate.getDate() : null);
    const [selectedMonth, setSelectedMonth] = useState(initDate ? initDate.getMonth() + 1 : null);
    const [selectedYear, setSelectedYear] = useState(initDate ? initDate.getFullYear() : null);

    const [showDayPicker, setShowDayPicker] = useState(false);
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);

    const hasSelectedDate = selectedDay !== null && selectedMonth !== null && selectedYear !== null;
    const birthday = hasSelectedDate ? new Date(selectedYear, selectedMonth - 1, selectedDay) : null;
    const edadCalculada = hasSelectedDate ? calcularEdad(birthday) : null;

    const availableDays = getDaysInMonth(selectedMonth, selectedYear);

    const handleBackPress = () => {
        router.back();
    };

    const handleCreateProfile = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }

        setSaving(true);
        const fechaStr = hasSelectedDate
            ? `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
            : null;

        const datos = {
            nombre: name.trim(),
            apellido: apellido.trim() || null,
            genero: gender,
            fecha_nacimiento: fechaStr,
        };

        if (isEditMode) {
            const result = await editarHijo(params.id, datos);
            if (result.success) {
                router.replace({
                    pathname: '/administrarperfiles',
                    params: { updatedProfile: 'true' }
                });
            } else {
                Alert.alert('Error', result.error);
            }
        } else {
            const result = await crearHijo(datos);
            if (result.success) {
                router.replace({
                    pathname: '/administrarperfiles',
                    params: {
                        createdName: name.trim(),
                        createdCode: result.data.codigo_vinculacion || 'N/A'
                    }
                });
            } else {
                Alert.alert('Error', result.error);
            }
        }
        setSaving(false);
    };

    const formattedDay = selectedDay ? String(selectedDay).padStart(2, '0') : '';
    const formattedMonth = selectedMonth ? String(selectedMonth).padStart(2, '0') : '';
    const formattedYear = selectedYear ? String(selectedYear) : '';

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

                    <View style={styles.dateRow}>
                        <TouchableOpacity onPress={() => setShowDayPicker(true)} style={styles.dateBox}>
                            <Text style={styles.dateText}>{formattedDay || 'Día'}</Text>
                            {selectedDay && <Text style={styles.dateLabelSmall}>Día</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.dateBox}>
                            <Text style={styles.dateText}>{formattedMonth || 'Mes'}</Text>
                            {selectedMonth && <Text style={styles.dateLabelSmall}>Mes</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowYearPicker(true)} style={styles.dateBoxYear}>
                            <Text style={styles.dateText}>{formattedYear || 'Año'}</Text>
                            {selectedYear && <Text style={styles.dateLabelSmall}>Año</Text>}
                        </TouchableOpacity>
                    </View>

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

            {/* Modal Día */}
            <Modal visible={showDayPicker} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowDayPicker(false)}>
                    <View style={styles.pickerModal}>
                        <Text style={styles.pickerTitle}>Seleccionar día</Text>
                        <FlatList
                            data={availableDays}
                            keyExtractor={(item) => item.toString()}
                            style={styles.pickerList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.pickerItem, selectedDay === item && styles.pickerItemActive]}
                                    onPress={() => { setSelectedDay(item); setShowDayPicker(false); }}
                                >
                                    <Text style={[styles.pickerItemText, selectedDay === item && styles.pickerItemTextActive]}>
                                        {String(item).padStart(2, '0')}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal Mes */}
            <Modal visible={showMonthPicker} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMonthPicker(false)}>
                    <View style={styles.pickerModal}>
                        <Text style={styles.pickerTitle}>Seleccionar mes</Text>
                        <FlatList
                            data={MONTHS}
                            keyExtractor={(item) => item.value.toString()}
                            style={styles.pickerList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.pickerItem, selectedMonth === item.value && styles.pickerItemActive]}
                                    onPress={() => { setSelectedMonth(item.value); setShowMonthPicker(false); }}
                                >
                                    <Text style={[styles.pickerItemText, selectedMonth === item.value && styles.pickerItemTextActive]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal Año */}
            <Modal visible={showYearPicker} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowYearPicker(false)}>
                    <View style={styles.pickerModal}>
                        <Text style={styles.pickerTitle}>Seleccionar año</Text>
                        <FlatList
                            data={YEARS}
                            keyExtractor={(item) => item.toString()}
                            style={styles.pickerList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.pickerItem, selectedYear === item && styles.pickerItemActive]}
                                    onPress={() => { setSelectedYear(item); setShowYearPicker(false); }}
                                >
                                    <Text style={[styles.pickerItemText, selectedYear === item && styles.pickerItemTextActive]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
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
        gap: 15,
        marginBottom: 15,
    },
    dateBox: {
        backgroundColor: '#EEEEEE',
        width: 65,
        height: 55,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateBoxYear: {
        backgroundColor: '#EEEEEE',
        width: 80,
        height: 55,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        fontFamily: Fonts.figtreeRegular,
        color: '#6B7280',
        fontSize: 15,
    },
    dateLabelSmall: {
        fontSize: 10,
        color: '#9CA3AF',
        fontFamily: Fonts.figtreeRegular,
        marginTop: 2,
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
    // Picker Modals
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerModal: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        width: '70%',
        maxHeight: SCREEN_HEIGHT * 0.5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        ...Shadows.button,
    },
    pickerTitle: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 15,
    },
    pickerList: {
        maxHeight: SCREEN_HEIGHT * 0.35,
    },
    pickerItem: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 2,
        marginHorizontal: 5,
    },
    pickerItemActive: {
        backgroundColor: Colors.primary,
    },
    pickerItemText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
    },
    pickerItemTextActive: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
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
