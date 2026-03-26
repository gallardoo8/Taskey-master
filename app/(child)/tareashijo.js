import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DUMMY_TASKS = [
    {
        id: '1',
        title: 'Tender la cama',
        description: 'Tender la cama correctamente y acomodar los peluches',
        deadline: 'Hoy 6:00pm',
        status: 'completada',
        statusText: 'Solicitud de confirmación enviada',
        titleColor: '#FF8A3D',
        dayId: 1, // Viernes
        keys: '25',
        duration: '10 minutos'
    },
    {
        id: '2',
        title: 'Hacer ejercicio',
        description: 'Hacer al menos 30 minutos de ejercicio al aire libre',
        deadline: 'Hoy 6:00pm',
        status: 'pendiente',
        statusText: 'Pendiente',
        titleColor: '#00AEEF',
        dayId: 1, // Viernes
        keys: '20',
        duration: '15 minutos'
    },
    {
        id: '3',
        title: 'Lavar los trastes',
        description: 'Ayudar a mamá con los trastes después de la cena',
        deadline: 'Sábado 8:00pm',
        status: 'pendiente',
        statusText: 'Pendiente',
        titleColor: '#8844EE',
        dayId: 2, // Sábado
        keys: '30',
        duration: '20 minutos'
    },
    {
        id: '4',
        title: 'Estudiar matemáticas',
        description: 'Repasar las tablas de multiplicar por 15 minutos',
        deadline: 'Domingo 4:00pm',
        status: 'completada',
        statusText: 'Completada',
        titleColor: '#ADD633',
        dayId: 3, // Domingo
        keys: '40',
        duration: '30 minutos'
    }
];

const DAYS = [
    { id: 1, day: 'Viernes', num: 2 },
    { id: 2, day: 'Sábado', num: 3 },
    { id: 3, day: 'Domingo', num: 4 },
    { id: 4, day: 'Lunes', num: 5 },
];

export default function TareasHijo() {
    const router = useRouter();
    const [filter, setFilter] = useState('Todas');
    const [selectedDayId, setSelectedDayId] = useState(1);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const filteredTasks = DUMMY_TASKS.filter(task => {
        const matchesDay = task.dayId === selectedDayId;
        if (!matchesDay) return false;

        if (filter === 'Todas') return true;
        if (filter === 'Pendientes') return task.status === 'pendiente';
        if (filter === 'Completadas') return task.status === 'completada';
        return true;
    });

    const handleBackPress = () => router.back();

    const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);

    const selectFilter = (value) => {
        setFilter(value);
        setIsFilterVisible(false);
    };

    const handleTaskPress = (task) => {
        router.push({
            pathname: '/detalletarea',
            params: {
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                color: task.titleColor,
                keys: task.keys,
                duration: task.duration
            }
        });
    };

    return (
        <View style={styles.container}>
            {/* Header decorativo */}
            <View style={styles.headerDecor}>
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleGreen]} />
                <View style={[styles.circle, styles.circleCyan]} />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Misiones</Text>

                <Text style={styles.todayLabel}>Hoy</Text>

                {/* Selector de días */}
                <View style={styles.daysRow}>
                    {DAYS.map((item) => {
                        const isActive = selectedDayId === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.dayCard, isActive && styles.dayCardActive]}
                                onPress={() => setSelectedDayId(item.id)}
                            >
                                <Text style={[styles.dayNum, isActive && styles.dayTextActive]}>{item.num}</Text>
                                <Text style={[styles.dayName, isActive && styles.dayTextActive]}>{item.day}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Filtro Dropdown */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={toggleFilterModal}
                    >
                        <Text style={styles.filterButtonText}>{filter}</Text>
                        <Ionicons name="chevron-down" size={20} color="white" />
                    </TouchableOpacity>

                    {isFilterVisible && (
                        <View style={styles.dropdownMenu}>
                            {['Todas', 'Pendientes', 'Completadas'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.dropdownItem}
                                    onPress={() => selectFilter(option)}
                                >
                                    <Text style={styles.dropdownItemText}>{option}</Text>
                                    <View style={styles.radioButton}>
                                        {filter === option && <View style={styles.radioButtonActive} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Lista de Tareas */}
                <View style={styles.taskList}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TouchableOpacity
                                key={task.id}
                                style={styles.taskCard}
                                onPress={() => handleTaskPress(task)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.taskTitle, { color: task.titleColor }]}>{task.title}</Text>
                                <Text style={styles.taskDescription}>{task.description}</Text>
                                <Text style={styles.taskDeadline}>
                                    Fecha límite: <Text style={styles.deadlineValue}>{task.deadline}</Text>
                                </Text>

                                <View style={styles.statusRow}>
                                    {task.status === 'completada' ? (
                                        <>
                                            <View style={styles.checkCircle}>
                                                <Ionicons name="checkmark" size={16} color="white" />
                                            </View>
                                            <Text style={styles.statusCompletada}>{task.statusText}</Text>
                                        </>
                                    ) : (
                                        <Text style={styles.statusPendiente}>{task.statusText}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.noTasksContainer}>
                            <Text style={styles.noTasksText}>No hay misiones para este día</Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" userType="hijo" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    headerDecor: {
        height: SCREEN_HEIGHT * 0.15,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circlePink: {
        width: 80,
        height: 80,
        backgroundColor: '#FF009B',
        bottom: 10,
        left: -20,
    },
    circleGreen: {
        width: 60,
        height: 60,
        backgroundColor: '#ADD633',
        top: -10,
        left: 140,
    },
    circleCyan: {
        width: 40,
        height: 40,
        backgroundColor: '#00AEEF',
        bottom: 20,
        right: 180,
    },
    content: {
        flex: 1,
        marginTop: -30,
        backgroundColor: '#F3F4F6',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 42,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 10,
    },
    todayLabel: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 15,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    dayCard: {
        width: '23%',
        paddingVertical: 12,
        borderRadius: 15,
        backgroundColor: Colors.white,
        alignItems: 'center',
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    dayCardActive: {
        backgroundColor: '#7E22CE',
    },
    dayNum: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    dayName: {
        fontSize: 12,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
    },
    dayTextActive: {
        color: Colors.white,
    },
    filterContainer: {
        alignItems: 'flex-end',
        zIndex: 100,
        marginBottom: 20,
    },
    filterButton: {
        backgroundColor: '#7E22CE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 120,
        justifyContent: 'space-between',
    },
    filterButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        marginRight: 5,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: Colors.white,
        borderRadius: 15,
        width: 180,
        paddingVertical: 10,
        ...Shadows.button,
        elevation: 10,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    dropdownItemText: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonActive: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.black,
    },
    taskList: {
        gap: 15,
    },
    taskCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    taskTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        marginBottom: 8,
    },
    taskDescription: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: '#4B5563',
        marginBottom: 10,
        lineHeight: 22,
    },
    taskDeadline: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 15,
    },
    deadlineValue: {
        fontFamily: Fonts.figtreeRegular,
        fontWeight: 'normal',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ADD633',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    statusCompletada: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        color: '#ADD633',
    },
    statusPendiente: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        color: '#F1C40F',
    },
    noTasksContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    noTasksText: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: '#9CA3AF',
    }
});
