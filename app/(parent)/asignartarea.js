import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ALL_TASKS_DATA = [
    {
        id: '1',
        title: 'Tender la cama',
        description: 'Tender la cama correctamente y acomodar los peluches',
        deadline: 'Hoy 6:00pm',
        duration: '35min',
        keys: 25,
        color: '#FF7E45', // Orangeish
        isAssigned: true
    },
    {
        id: '2',
        title: 'Hacer ejercicio',
        description: 'Hacer al menos 30 minutos de ejercicio al aire libre',
        deadline: '26/sep/2025 12:00pm',
        duration: '1hr',
        keys: 30,
        color: '#00AEEB', // Cyan
        isAssigned: false
    },
    {
        id: '3',
        title: 'Tarea de la escuela',
        description: 'Terminar todas las tareas de la semana que dejaron en la escuela',
        deadline: '28/sep/2025 9:30pm',
        duration: '2hrs',
        keys: 50,
        color: '#AAD62D', // Green
        isAssigned: false
    },
    {
        id: '4',
        title: 'Pasear a Toby',
        description: 'Sacar a Toby a pasear junto con papá y tus hermanos',
        deadline: '18/sep/2025 6:00pm',
        duration: '45min',
        keys: 20,
        color: '#FF009B', // Pink
        isAssigned: false
    }
];

export default function AsignarTarea() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [tasks, setTasks] = useState(ALL_TASKS_DATA);

    const childName = params.name || 'Cons';
    const childAvatar = params.avatar || require('../../assets/images/capicons.png');

    const handleBackPress = () => router.back();

    const handleToggleAssign = (taskId) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, isAssigned: !task.isAssigned } : task
        ));
    };

    return (
        <View style={styles.container}>
            {/* Header Section (Reused from PerfilDeHijo concept) */}
            <View style={styles.header}>
                <View style={styles.circlePink} />
                <View style={styles.circleGreen} />
                <View style={styles.circlePurpleDark} />

                <View style={styles.headerContent}>
                    <View style={styles.avatarWrapper}>
                        <Image source={childAvatar} style={styles.avatar} resizeMode="contain" />
                    </View>

                    <View style={styles.nameBadge}>
                        <Text style={styles.nameText}>{childName}</Text>
                    </View>
                </View>
            </View>

            {/* Back Button and Title Over White Section */}
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Asignar tareas</Text>
            </View>

            <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
                {tasks.map((task) => (
                    <View key={task.id} style={styles.taskCard}>
                        <Text style={[styles.taskTitle, { color: task.color }]}>{task.title}</Text>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                        <Text style={styles.deadlineLabel}>Fecha límite: <Text style={styles.deadlineValue}>{task.deadline}</Text></Text>

                        <View style={styles.footerRow}>
                            <View style={styles.statsRow}>
                                <View style={styles.stat}>
                                    <MaterialIcons name="timer" size={24} color="#FF7E45" />
                                    <Text style={styles.statText}>{task.duration}</Text>
                                </View>
                                <View style={styles.stat}>
                                    <FontAwesome5 name="key" size={18} color="#FACC15" />
                                    <Text style={styles.statText}>{task.keys}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.assignButton,
                                    task.isAssigned ? styles.assignedBtn : styles.unassignedBtn
                                ]}
                                onPress={() => handleToggleAssign(task.id)}
                            >
                                <Text style={styles.assignBtnText}>
                                    {task.isAssigned ? 'Asignada' : 'Asignar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
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
        height: SCREEN_HEIGHT * 0.16,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlePink: {
        position: 'absolute',
        top: 20,
        left: -20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF009B',
    },
    circleGreen: {
        position: 'absolute',
        top: -10,
        left: 110,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#AAD62D',
    },
    circlePurpleDark: {
        position: 'absolute',
        top: 10,
        right: -10,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#581C87',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingTop: 10,
    },
    avatarWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D8B4FE',
        borderWidth: 2,
        borderColor: '#00AEEB',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatar: {
        width: 50,
        height: 50,
    },
    nameBadge: {
        backgroundColor: Colors.white,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 20,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    nameText: {
        fontSize: 28,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: '#581C87',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 15,
    },
    backButton: {
        padding: 4,
    },
    screenTitle: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    },
    taskList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    taskCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        ...Shadows.button,
        shadowOpacity: 0.1,
        elevation: 3,
    },
    taskTitle: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    taskDescription: {
        fontSize: 14,
        color: '#374151',
        fontFamily: Fonts.figtreeRegular,
        lineHeight: 20,
        marginBottom: 8,
    },
    deadlineLabel: {
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 15,
    },
    deadlineValue: {
        fontWeight: 'normal',
        color: '#6B7280',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    },
    assignButton: {
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 15,
        ...Shadows.button,
    },
    assignedBtn: {
        backgroundColor: '#AAD62D',
    },
    unassignedBtn: {
        backgroundColor: '#7E22CE',
    },
    assignBtnText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    }
});
