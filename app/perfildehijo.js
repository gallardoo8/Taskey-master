import { Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TASKS_THIS_WEEK = [
    {
        id: '1',
        title: 'Tender la cama',
        description: 'Tender la cama correctamente y acomodar los peluches',
        deadline: 'Hoy 6:00pm',
        status: 'Pendiente',
        statusColor: '#9CA3AF'
    },
    {
        id: '2',
        title: 'Hacer ejercicio',
        description: 'Hacer al menos 30 minutos de ejercicio al aire libre',
        deadline: 'Hoy 6:00pm',
        status: 'No completada',
        statusColor: '#FF5E5E'
    }
];

const TASKS_PREVIOUS = [
    {
        id: '3',
        title: 'Tarea de inglés',
        description: 'Hacer la tarea de inglés y leer un cuento en inglés',
        deadline: '20/sep/2025 5:30pm',
        status: 'Completada',
        statusColor: '#84CC16'
    },
    {
        id: '4',
        title: 'Pasear a Toby',
        description: 'Sacar a Toby a pasear junto con papá y tus hermanos',
        deadline: '18/sep/2025 6:00pm',
        status: 'En espera de aprobación',
        statusColor: '#F97316'
    }
];

export default function PerfilDeHijo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState('Semana'); // 'Semana' or 'Anteriores'

    const childName = params.name || 'Cons';
    const childAvatar = params.avatar || require('../assets/images/capicons.png');

    const handleBackPress = () => router.back();
    const handleAssignTask = () => router.push({
        pathname: '/asignartarea',
        params: { name: childName, avatar: childAvatar }
    });

    const renderTask = (task) => (
        <View key={task.id} style={styles.taskCard}>
            <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <Text style={styles.taskDeadline}>Fecha límite: <Text style={styles.deadlineValue}>{task.deadline}</Text></Text>

                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Estado:</Text>
                    <View style={[styles.statusBadge, { backgroundColor: task.statusColor }]}>
                        <Text style={styles.statusBadgeText}>{task.status}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.taskAction}>
                {task.status === 'Pendiente' ? (
                    <Ionicons name="close-circle-sharp" size={32} color="#F87171" />
                ) : (
                    <View style={styles.completedSpacer} />
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                {/* Decorative Circles */}
                <View style={styles.circlePink} />
                <View style={styles.circleGreen} />
                <View style={styles.circleCyan} />
                <View style={styles.circleOrange} />
                <View style={styles.circlePurpleDark} />

                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    {/* Character/Avatar with Bubble Background Concept */}
                    <View style={styles.avatarWrapper}>
                        <Image source={childAvatar} style={styles.avatar} resizeMode="contain" />
                    </View>

                    <View style={styles.nameBadge}>
                        <Text style={styles.nameText}>{childName}</Text>
                    </View>

                    <View style={styles.linkedContainer}>
                        <Ionicons name="checkmark-circle" size={18} color="#84CC16" />
                        <Text style={styles.linkedText}>1 dispositivo vinculado</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Restricted Apps */}
                <Text style={styles.sectionTitle}>Aplicaciones restringidas</Text>
                <TouchableOpacity style={styles.appsCard} onPress={() => router.push('/appsrestringidas')}>
                    <View style={styles.appsContainer}>
                        <View style={[styles.appIcon, { backgroundColor: 'black' }]}>
                            <Entypo name="note" size={20} color="white" />
                        </View>
                        <View style={[styles.appIcon, { backgroundColor: '#EF4444' }]}>
                            <FontAwesome5 name="play" size={14} color="white" />
                        </View>
                        <View style={[styles.appIcon, { backgroundColor: 'black' }]}>
                            <Text style={styles.netflixLetter}>N</Text>
                        </View>
                        <View style={[styles.appIcon, { backgroundColor: '#3B82F6' }]}>
                            <MaterialCommunityIcons name="square-rounded" size={18} color="white" />
                        </View>
                    </View>
                    <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>

                {/* Tasks */}
                <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Tareas</Text>

                <TouchableOpacity style={styles.assignButton} onPress={handleAssignTask}>
                    <Text style={styles.assignButtonText}>Asignar tarea</Text>
                    <Image source={require('../assets/images/tareas.png')} style={styles.miniClipboard} resizeMode="contain" />
                </TouchableOpacity>

                {/* Tabs */}
                <View style={styles.tabsWrapper}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Semana' && styles.activeTab]}
                        onPress={() => setActiveTab('Semana')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Semana' && styles.activeTabText]}>Esta semana</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Anteriores' && styles.activeTab]}
                        onPress={() => setActiveTab('Anteriores')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Anteriores' && styles.activeTabText]}>Anteriores</Text>
                    </TouchableOpacity>
                </View>

                {/* Task List */}
                <View style={styles.taskList}>
                    {(activeTab === 'Semana' ? TASKS_THIS_WEEK : TASKS_PREVIOUS).map(renderTask)}
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
        height: SCREEN_HEIGHT * 0.35,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    circlePink: {
        position: 'absolute',
        top: 60,
        left: -30,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF009B',
    },
    circleGreen: {
        position: 'absolute',
        top: -10,
        left: 80,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#AAD62D',
    },
    circleCyan: {
        position: 'absolute',
        bottom: -20,
        right: 170,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#00AEEB',
    },
    circleOrange: {
        position: 'absolute',
        top: 150,
        right: -30,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#F59E0B',
    },
    circlePurpleDark: {
        position: 'absolute',
        top: 180,
        left: 50,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#581C87',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 15,
        padding: 2,
    },
    headerContent: {
        alignItems: 'center',
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D8B4FE',
        borderWidth: 3,
        borderColor: '#00AEEB',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
    },
    nameBadge: {
        backgroundColor: Colors.white,
        paddingVertical: 5,
        paddingHorizontal: 35,
        borderRadius: 15,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    nameText: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: '#581C87',
    },
    linkedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
    },
    linkedText: {
        color: '#AAD62D',
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 15,
    },
    appsCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    appsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    appIcon: {
        width: 35,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    netflixLetter: {
        color: '#E50914',
        fontWeight: 'bold',
        fontSize: 20,
    },
    assignButton: {
        backgroundColor: '#7E22CE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        gap: 10,
        width: '60%',
        ...Shadows.button,
    },
    assignButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
    },
    miniClipboard: {
        width: 24,
        height: 24,
        tintColor: 'white'
    },
    tabsWrapper: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: Colors.white,
        borderRadius: 10,
        overflow: 'hidden',
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#7E22CE',
    },
    tabText: {
        fontFamily: Fonts.figtreebold,
        color: '#7E22CE',
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: Colors.white,
    },
    taskList: {
        marginTop: 15,
    },
    taskCard: {
        backgroundColor: Colors.white,
        borderRadius: 0, // Cards look flat but separate? screenshot shows them within a list container
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 4,
    },
    taskDescription: {
        fontSize: 13,
        color: '#4B5563',
        fontFamily: Fonts.figtreeRegular,
        marginBottom: 6,
    },
    taskDeadline: {
        fontSize: 12,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 8,
    },
    deadlineValue: {
        fontWeight: 'normal',
        color: '#6B7280',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusLabel: {
        fontSize: 13,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
    },
    statusBadge: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    statusBadgeText: {
        color: Colors.white,
        fontSize: 11,
        fontWeight: 'bold',
    },
    taskAction: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    completedSpacer: {
        width: 32,
    }
});