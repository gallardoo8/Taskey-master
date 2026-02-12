import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GENDER_OPTIONS = ['Masculino', 'Femenino', 'Otro'];

export default function PerfilNuevo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isEditMode = params.mode === 'edit';

    // States - Initialize with params if available
    const [name, setName] = useState(params.name || '');
    const [gender, setGender] = useState(params.gender || 'Masculino');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

    // Parse age string "12 años" -> 12
    const initialAge = params.age ? parseInt(params.age) : 10;
    const [age, setAge] = useState(initialAge);

    // Date logic (simplified for demo, not parsing localized date string for now)
    const [birthday, setBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [hasSelectedDate, setHasSelectedDate] = useState(isEditMode); // Show date boxes filled if edit mode

    const handleBackPress = () => {
        router.back();
    };

    const handleCreateProfile = () => {
        if (isEditMode) {
            const updatedProfile = {
                id: params.id || Date.now().toString(),
                name: name,
                age: `${age} años`,
                gender: gender,
                avatar: params.avatar || require('../assets/images/capihijo.png'),
                status: params.status || 'verified'
            };
            router.replace({
                pathname: '/administrarperfiles',
                params: { updatedProfile: JSON.stringify(updatedProfile) }
            });
        } else {
            router.dismiss();
            router.replace({ pathname: '/administrarperfiles', params: { createdName: name || 'Berni' } });
        }
    };

    const incrementAge = () => setAge(prev => prev + 1);
    const decrementAge = () => setAge(prev => Math.max(1, prev - 1));

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthday(selectedDate);
            setHasSelectedDate(true);
        }
    };

    const formattedDay = hasSelectedDate ? (isEditMode && !showDatePicker ? '24' : birthday.getDate().toString().padStart(2, '0')) : '';
    const formattedMonth = hasSelectedDate ? (isEditMode && !showDatePicker ? '10' : (birthday.getMonth() + 1).toString().padStart(2, '0')) : '';

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
                            source={require('../assets/images/capihijo.png')}
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

                    {/* Gender */}
                    <Text style={styles.label}>Género</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderButton, isEditMode && { backgroundColor: '#7E22CE' }]} // Darker purple for edit mode? matching screenshot
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

                    {/* Age */}
                    <Text style={styles.label}>Edad</Text>
                    <View style={styles.ageContainer}>
                        <TouchableOpacity style={[styles.controlButton, styles.minusButton]} onPress={decrementAge}>
                            <Ionicons name="remove" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.ageValue}>{age}</Text>
                        <TouchableOpacity style={[styles.controlButton, isEditMode && { backgroundColor: '#7E22CE' }]} onPress={incrementAge}>
                            <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
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

                    {/* Create/Save Button */}
                    <TouchableOpacity
                        style={[styles.createButton, isEditMode && { backgroundColor: '#7E22CE' }]}
                        onPress={handleCreateProfile}
                    >
                        <Text style={styles.createButtonText}>
                            {isEditMode ? 'Guardar cambios' : 'Crear perfil'}
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
        backgroundColor: '#F3F4F6', // Light gray background
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
    // Deco Circles (Same as Admin)
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
    // Content
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
        zIndex: 10, // For dropdown
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
    // Age
    ageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 20,
    },
    ageValue: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        minWidth: 40,
        textAlign: 'center',
    },
    controlButton: {
        backgroundColor: Colors.primary,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    minusButton: {
        backgroundColor: '#E5E7EB',
    },
    // Date
    dateRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
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
    dateLabelSmall: {
        fontSize: 10,
        color: '#6B7280',
        fontFamily: Fonts.figtreeRegular,
        marginTop: 2
    }
});
