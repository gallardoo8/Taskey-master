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

const children = [
    { id: '1', name: 'Cons', avatar: require('../assets/images/capicons.png') },
    { id: '2', name: 'Angel', avatar: require('../assets/images/capiangel.png') },
    { id: '3', name: 'Fer', avatar: require('../assets/images/capifer.png') },
];

export default function PerfilDeHijo() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState('Semana'); // 'Semana' or 'Anteriores'

    const childName = params.name || 'Cons';
    // Look up avatar from the children array to avoid issues with param serialization
    const currentChild = children.find(c => c.name === childName) || children[0];
    const childAvatar = currentChild.avatar;

    const handleBackPress = () => router.back();
    const handleAssignTask = () => router.push({
        pathname: '/asignartarea',
        params: { name: childName, avatar: childAvatar }
    });

    const handleSwitchChild = (name, avatar) => {
        router.setParams({ name, avatar });
    };

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
            {/* Header Section with Decorative Circles and Switcher */}
            <View style={styles.header}>
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleGreen]} />
                <View style={[styles.circle, styles.circleCyan]} />

                <View style={styles.headerContent}>
                    {/* Horizontal Profile Switcher (The requested 'carrusel') */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.switcherContent}
                        style={styles.switcher}
                        snapToInterval={96} // width (76) + gap (20)
                        decelerationRate="fast"
                    >
                        {children.map((child) => (
                            <TouchableOpacity
                                key={child.id}
                                style={[
                                    styles.switcherItem,
                                    child.name === childName && styles.switcherItemActive
                                ]}
                                onPress={() => handleSwitchChild(child.name, child.avatar)}
                            >
                                <View style={[
                                    styles.switcherAvatarWrapper,
                                    child.name === childName && styles.switcherAvatarActive
                                ]}>
                                    <Image source={child.avatar} style={styles.switcherAvatar} resizeMode="contain" />
                                </View>
                                <Text style={[
                                    styles.switcherName,
                                    child.name === childName && styles.switcherNameActive
                                ]}>{child.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.linkedContainer}>
                        <Ionicons name="checkmark-circle" size={18} color="#AAD62D" />
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

                {/* Sleep Schedule */}
                <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Horas de sueño</Text>
                <View style={styles.sleepCard}>
                    <View style={styles.sleepInfo}>
                        <Text style={styles.timeLabel}>De:</Text>
                        <Text style={styles.timeValue}>21:30</Text>
                        <Text style={[styles.timeLabel, { marginLeft: 15 }]}>Hasta:</Text>
                        <Text style={styles.timeValue}>8:00</Text>
                        <Text style={styles.daysText}>Lun - Vie</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editSleepButton}
                        onPress={() => router.push({
                            pathname: '/horariodesueno',
                            params: { name: childName, avatar: childAvatar }
                        })}
                    >
                        <Text style={styles.editSleepButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>

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
        height: SCREEN_HEIGHT * 0.32,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        paddingTop: 40,
        ...Shadows.button,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circlePink: {
        width: 100,
        height: 100,
        backgroundColor: '#FF009B',
        top: -20,
        left: -20,
        opacity: 0.6,
    },
    circleGreen: {
        width: 120,
        height: 120,
        backgroundColor: '#AAD62D',
        bottom: -30,
        right: 40,
        opacity: 0.6,
    },
    circleCyan: {
        width: 70,
        height: 70,
        backgroundColor: '#00AEEB',
        top: 20,
        right: -10,
        opacity: 0.6,
    },
    headerContent: {
        alignItems: 'center',
        zIndex: 10,
    },
    switcher: {
        width: '100%',
        marginBottom: 15,
    },
    switcherContent: {
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
    },
    switcherItem: {
        alignItems: 'center',
        opacity: 0.6,
    },
    switcherItemActive: {
        opacity: 1,
    },
    switcherAvatarWrapper: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    switcherAvatarActive: {
        backgroundColor: Colors.white,
        borderColor: '#AAD62D',
        transform: [{ scale: 1.1 }],
    },
    switcherAvatar: {
        width: 55,
        height: 55,
    },
    switcherName: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontSize: 14,
        marginTop: 5,
    },
    switcherNameActive: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
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
    },
    sleepCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    sleepInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
        marginRight: 8,
    },
    timeValue: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    },
    daysText: {
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        color: '#6B7280',
        marginLeft: 15,
    },
    editSleepButton: {
        backgroundColor: '#7E22CE',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    editSleepButtonText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
    },
});