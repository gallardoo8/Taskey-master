import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CLASSIFICATION_OPTIONS = [
    { label: 'Social', color: Colors.pink },
    { label: 'Educativa', color: Colors.green }, // Default based on screenshot
    { label: 'Deportiva', color: Colors.cyan },
    { label: 'Hogar', color: Colors.orange },
];

export default function NuevaTarea() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isEditMode = params.mode === 'edit';

    const [selectedColor, setSelectedColor] = useState(params.color || Colors.green);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Form states
    const [title, setTitle] = useState(params.title || '');
    const [description, setDescription] = useState(params.description || '');

    // Parse initial validation for numbers
    const initialKeys = params.keys ? parseInt(params.keys) : 25;
    const [rewards, setRewards] = useState(initialKeys);

    // Date Logic
    const [deadlineDate, setDeadlineDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [hasSelectedDate, setHasSelectedDate] = useState(isEditMode);

    // Time Logic
    const [ampm, setAmpm] = useState('AM');
    const [selectedHour, setSelectedHour] = useState('07');
    const [selectedMinute, setSelectedMinute] = useState('30');

    // Parse duration for lock time
    const parseDuration = (dur) => {
        let h = 0;
        let m = 0;
        if (!dur) return { h, m };

        if (dur.includes('hr')) {
            const parts = dur.split('hr');
            h = parseInt(parts[0].trim());
            if (parts[1]) m = parseInt(parts[1].replace('min', '').trim());
        } else if (dur.includes('min')) {
            m = parseInt(dur.replace('min', '').trim());
        }
        return { h, m };
    };

    const initialDuration = parseDuration(params.duration);
    const [lockTimeHours, setLockTimeHours] = useState(initialDuration.h);
    const [lockTimeMinutes, setLockTimeMinutes] = useState(initialDuration.m);

    const handleBackPress = () => {
        router.back();
    };

    const handleCreatePress = () => {
        // Construct the new task object
        const durStr = lockTimeHours > 0
            ? `${lockTimeHours}hr${lockTimeMinutes > 0 ? ` ${lockTimeMinutes}min` : ''}`
            : `${lockTimeMinutes}min`;

        const newTaskObj = {
            id: isEditMode && params.id ? params.id : Date.now().toString(),
            title: title || 'Nueva Tarea',
            description: description || '',
            deadline: hasSelectedDate
                ? `${formattedDay}/${formattedMonth}/${formattedYear} ${selectedHour}:${selectedMinute}${ampm.toLowerCase()}`
                : 'Sin fecha',
            duration: durStr,
            keys: rewards,
            color: selectedColor,
            assignedTo: '' // New tasks start unassigned
        };

        // Navigate back and pass the new task as a param
        router.replace({
            pathname: '/admintareas',
            params: { newTask: JSON.stringify(newTaskObj) }
        });
    };

    const incrementReward = () => setRewards(prev => prev + 5);
    const decrementReward = () => setRewards(prev => Math.max(0, prev - 5));

    const incrementHours = () => setLockTimeHours(prev => prev + 1);
    const decrementHours = () => setLockTimeHours(prev => Math.max(0, prev - 1));

    const incrementMinutes = () => {
        if (lockTimeMinutes >= 55) {
            setLockTimeHours(prev => prev + 1);
            setLockTimeMinutes(0);
        } else {
            setLockTimeMinutes(prev => prev + 5);
        }
    };
    const decrementMinutes = () => {
        if (lockTimeMinutes <= 0) {
            if (lockTimeHours > 0) {
                setLockTimeHours(prev => prev - 1);
                setLockTimeMinutes(55);
            }
        } else {
            setLockTimeMinutes(prev => prev - 5);
        }
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDeadlineDate(selectedDate);
            setHasSelectedDate(true);
        }
    };

    const formattedDay = hasSelectedDate ? deadlineDate.getDate().toString().padStart(2, '0') : 'dd';
    const formattedMonth = hasSelectedDate ? (deadlineDate.getMonth() + 1).toString().padStart(2, '0') : 'mm';
    const formattedYear = hasSelectedDate ? deadlineDate.getFullYear().toString() : 'aaaa';

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditMode ? 'Editar tarea' : 'Nueva tarea'}</Text>
                {isEditMode && (
                    <View style={{ marginLeft: 10, padding: 5, backgroundColor: '#F3F4F6', borderRadius: 8 }}>
                        <FontAwesome5 name="edit" size={24} color="#F59E0B" />
                    </View>
                )}
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {/* Título y Clasificación */}
                    <Text style={styles.label}>Titulo</Text>
                    <View style={styles.titleRow}>
                        {/* Classification Dropdown */}
                        <View style={styles.classificationContainer}>
                            <TouchableOpacity
                                style={[styles.colorCircle, { backgroundColor: selectedColor }]}
                                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                            />
                            {isDropdownOpen && (
                                <View style={styles.colorDropdown}>
                                    <View style={styles.dropdownTriangle} />
                                    {CLASSIFICATION_OPTIONS.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.colorOption}
                                            onPress={() => {
                                                setSelectedColor(option.color);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <View style={[styles.optionCircle, { backgroundColor: option.color }]} />
                                            <Text style={styles.optionText}>{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <TextInput
                            style={styles.titleInput}
                            placeholder=""
                            placeholderTextColor="#9CA3AF"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Descripción */}
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />

                    {/* Fecha y Hora */}
                    <View style={styles.dateTimeRow}>
                        <View style={styles.dateTimeField}>
                            <Text style={styles.label}>Fecha límite</Text>
                            <TouchableOpacity
                                style={styles.dateInputContainer}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name="calendar-today" size={20} color={Colors.black} />
                                </View>
                                <View style={styles.dateValues}>
                                    <Text style={styles.datePart}>{formattedDay}</Text>
                                    <Text style={styles.dateSeparator}>|</Text>
                                    <Text style={styles.datePart}>{formattedMonth}</Text>
                                    <Text style={styles.dateSeparator}>|</Text>
                                    <Text style={styles.datePart}>{formattedYear}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateTimeField}>
                            <Text style={styles.label}>Hora</Text>
                            <View style={styles.timeInputContainer}>
                                <View style={styles.timeUnit}>
                                    <TextInput
                                        style={styles.timeInputBox}
                                        value={selectedHour}
                                        onChangeText={setSelectedHour}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />
                                    <Text style={styles.timeLabel}>Hora</Text>
                                </View>
                                <Text style={styles.colon}>:</Text>
                                <View style={styles.timeUnit}>
                                    <TextInput
                                        style={styles.timeInputBox}
                                        value={selectedMinute}
                                        onChangeText={setSelectedMinute}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />
                                    <Text style={styles.timeLabel}>Minuto</Text>
                                </View>
                                <View style={styles.ampmContainer}>
                                    <TouchableOpacity
                                        style={[styles.ampmButton, ampm === 'AM' && styles.ampmActive]}
                                        onPress={() => setAmpm('AM')}
                                    >
                                        <Text style={[styles.ampmText, ampm === 'AM' && styles.ampmTextActive]}>AM</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.ampmButton, ampm === 'PM' && styles.ampmActive]}
                                        onPress={() => setAmpm('PM')}
                                    >
                                        <Text style={[styles.ampmText, ampm === 'PM' && styles.ampmTextActive]}>PM</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={deadlineDate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                            minimumDate={new Date()}
                        />
                    )}

                    {/* Recompensas */}
                    <Text style={styles.sectionTitle}>Recompensas</Text>

                    {/* Keys Row */}
                    <Text style={styles.subLabel}>Keys</Text>
                    <View style={styles.rewardRow}>
                        <View style={styles.rewardValueContainer}>
                            <Text style={styles.rewardValue}>{rewards}</Text>
                            <FontAwesome5 name="key" size={18} color="#DAA520" style={{ marginLeft: 8 }} />
                        </View>
                        <TouchableOpacity style={styles.controlButton} onPress={incrementReward}>
                            <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.controlButton, styles.minusButton]} onPress={decrementReward}>
                            <Ionicons name="remove" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Unlock Time Row */}
                    <Text style={styles.subLabel}>Tiempo de desbloqueo en pantalla</Text>
                    <View style={styles.rewardRow}>
                        <View style={styles.timeValueContainer}>
                            <View style={styles.timeUnitSmall}>
                                <Text style={styles.timeValue}>{lockTimeHours.toString().padStart(2, '0')}</Text>
                                <Text style={styles.timeLabelSmall}>Hora</Text>
                            </View>
                            <Text style={styles.colonSmall}>:</Text>
                            <View style={styles.timeUnitSmall}>
                                <Text style={styles.timeValue}>{lockTimeMinutes.toString().padStart(2, '0')}</Text>
                                <Text style={styles.timeLabelSmall}>Minuto</Text>
                            </View>
                        </View>

                        {/* Adjust Hours */}
                        <View style={styles.controlGroup}>
                            <TouchableOpacity style={styles.controlButtonSmall} onPress={incrementHours}>
                                <Ionicons name="add" size={16} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.controlButtonSmall, styles.minusButton]} onPress={decrementHours}>
                                <Ionicons name="remove" size={16} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.controlLabel}>Hrs</Text>
                        </View>

                        {/* Adjust Minutes */}
                        <View style={styles.controlGroup}>
                            <TouchableOpacity style={styles.controlButtonSmall} onPress={incrementMinutes}>
                                <Ionicons name="add" size={16} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.controlButtonSmall, styles.minusButton]} onPress={decrementMinutes}>
                                <Ionicons name="remove" size={16} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.controlLabel}>Min</Text>
                        </View>
                    </View>

                    {/* Crear Tarea Button */}
                    <TouchableOpacity
                        style={[styles.createButton, isEditMode && { backgroundColor: '#4C1D95' }]}
                        onPress={handleCreatePress}
                    >
                        <Text style={styles.createButtonText}>
                            {isEditMode ? 'Guardar cambios' : 'Crear tarea'}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.06, // Matches principalpapa header area roughly
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.primaryDark, // Dark Purple
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
        padding: 20,
        ...Shadows.button,
    },
    label: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.black,
        marginBottom: 8,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        zIndex: 20,
    },
    classificationContainer: {
        marginRight: 10,
        position: 'relative',
        zIndex: 30,
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    colorDropdown: {
        position: 'absolute',
        top: 40,
        left: -10,
        backgroundColor: Colors.primaryDark, // Deep purple background as in design
        borderRadius: 12,
        padding: 10,
        width: 140,
        zIndex: 50,
        elevation: 10,
    },
    dropdownTriangle: {
        position: 'absolute',
        top: -8,
        left: 20,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Colors.primaryDark,
    },
    colorOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    optionCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    optionText: {
        color: Colors.white,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
    },
    titleInput: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 45,
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
    },
    descriptionInput: {
        backgroundColor: '#EEEEEE',
        borderRadius: 12,
        padding: 15,
        height: 120,
        marginBottom: 20,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateTimeField: {
        width: '48%',
    },
    dateInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 5,
        alignItems: 'center',
        height: 45,
    },
    iconContainer: {
        padding: 8,
    },
    dateValues: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#E5E7EB',
    },
    datePart: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: Colors.black,
    },
    dateSeparator: {
        color: '#E5E7EB',
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeUnit: {
        alignItems: 'center',
        marginRight: 5,
    },
    timeInputBox: {
        backgroundColor: '#E9D5FF', // Light purple
        borderRadius: 8,
        width: 40,
        height: 35,
        textAlign: 'center',
        fontFamily: Fonts.figtreebold,
        fontSize: 16,
        color: Colors.black,
    },
    timeLabel: {
        fontSize: 10,
        color: '#6B7280',
        marginTop: 2,
    },
    colon: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 2,
        marginTop: -15,
    },
    ampmContainer: {
        marginLeft: 5,
        marginTop: -10,
    },
    ampmButton: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 2,
    },
    ampmActive: {
        backgroundColor: Colors.primary,
    },
    ampmText: {
        fontSize: 10,
        color: '#6B7280',
    },
    ampmTextActive: {
        fontSize: 10,
        color: Colors.white,
    },
    sectionTitle: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.black,
        marginBottom: 10,
    },
    subLabel: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 8,
    },
    rewardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    rewardValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 8,
        width: 100,
        justifyContent: 'center',
        marginRight: 10,
    },
    rewardValue: {
        fontFamily: Fonts.figtreebold,
        fontSize: 18,
        fontWeight: 'bold',
    },
    timeValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9D5FF',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    timeUnitSmall: {
        alignItems: 'center',
    },
    timeLabelSmall: {
        fontSize: 8,
        color: '#6B7280',
    },
    colonSmall: {
        marginHorizontal: 5,
        fontWeight: 'bold',
        marginTop: -10,
    },
    controlButton: {
        backgroundColor: Colors.primary,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    controlButtonSmall: {
        backgroundColor: Colors.primary,
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
    },
    controlGroup: {
        alignItems: 'center',
        marginLeft: 10,
    },
    controlLabel: {
        fontSize: 8,
        fontFamily: Fonts.figtreeRegular,
        color: '#6B7280',
    },
    minusButton: {
        backgroundColor: '#E5E7EB',
    },
    createButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        ...Shadows.button,
    },
    createButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontSize: 18,
        fontWeight: 'bold',
    }
});
