import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TASKS_DATA = [
    {
        id: '1',
        title: 'Tender la cama',
        description: 'Tender la cama correctamente y acomodar los peluches',
        deadline: 'Hoy 6:00pm',
        duration: '35min',
        keys: 25,
        color: Colors.orange,
        assignedProfiles: ['Angel']
    },
    {
        id: '2',
        title: 'Hacer ejercicio',
        description: 'Hacer al menos 30 minutos de ejercicio al aire libre',
        deadline: '26/sep/2025 12:00pm',
        duration: '1hr',
        keys: 30,
        color: Colors.cyan,
        assignedProfiles: ['Cons']
    },
    {
        id: '3',
        title: 'Tarea de la escuela',
        description: 'Terminar todas las tareas de la semana que dejaron en la escuela',
        deadline: '28/sep/2025 9:30pm',
        duration: '2hrs',
        keys: 50,
        color: Colors.green,
        assignedProfiles: ['Fer']
    }
];

const LIVE_PROFILES = [
    { id: '101', name: 'Cons', avatar: require('../assets/images/capicons.png') },
    { id: '102', name: 'Angel', avatar: require('../assets/images/capiangel.png') },
    { id: '103', name: 'Fer', avatar: require('../assets/images/capifer.png') },
];

export default function AdminTareas() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [tasks, setTasks] = useState(TASKS_DATA);
    const [expandedTask, setExpandedTask] = useState(null);

    // Modal States
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [unassignModalVisible, setUnassignModalVisible] = useState(false);
    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [targetUser, setTargetUser] = useState('');

    useEffect(() => {
        if (params.newTask) {
            try {
                const task = JSON.parse(params.newTask);
                setTasks(prev => {
                    const exists = prev.find(t => t.id === task.id);
                    if (exists) {
                        return prev.map(t => t.id === task.id ? task : t);
                    }
                    return [task, ...prev];
                });
            } catch (e) {
                console.error("Error parsing task", e);
            }
        }
    }, [params.newTask]);

    const handleBackPress = () => {
        router.back();
    };

    const handleNewTaskPress = () => {
        router.push('/nuevatarea');
    };

    const toggleDropdown = (taskId) => {
        setExpandedTask(expandedTask === taskId ? null : taskId);
    };

    // Alert Handlers
    const openDeleteAlert = (task) => {
        setSelectedTask(task);
        setDeleteModalVisible(true);
    };

    const openUnassignAlert = (task, user) => {
        setSelectedTask(task);
        setTargetUser(user);
        setUnassignModalVisible(true);
        setExpandedTask(null); // Close dropdown
    };

    const openAssignModal = (task) => {
        setSelectedTask(task);
        setAssignModalVisible(true);
        setExpandedTask(null);
    };

    const handleAssignProfile = (profileName) => {
        if (selectedTask) {
            setTasks(prev => prev.map(t => {
                if (t.id === selectedTask.id) {
                    const currentProfiles = t.assignedProfiles || [];
                    if (!currentProfiles.includes(profileName)) {
                        return { ...t, assignedProfiles: [...currentProfiles, profileName] };
                    }
                }
                return t;
            }));
            setAssignModalVisible(false);
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedTask) {
            setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
            setDeleteModalVisible(false);
            setSelectedTask(null);
        }
    };

    const handleUnassignConfirm = () => {
        if (selectedTask && targetUser) {
            setTasks(prev => prev.map(t => {
                if (t.id === selectedTask.id) {
                    return {
                        ...t,
                        assignedProfiles: (t.assignedProfiles || []).filter(u => u !== targetUser)
                    };
                }
                return t;
            }));
        }
        setUnassignModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tareas</Text>
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Botón Nueva Tarea */}
                <TouchableOpacity style={styles.newButton} onPress={handleNewTaskPress}>
                    <View style={styles.newButtonContent}>
                        <FontAwesome5 name="clipboard-list" size={34} color="#FACC15" style={styles.clipboardIcon} />
                        <View style={styles.plusBadge}>
                            <Ionicons name="add" size={12} color="white" />
                        </View>
                        <Text style={styles.newButtonText}>Nueva tarea</Text>
                    </View>
                </TouchableOpacity>

                {/* Lista de Tareas */}
                {tasks.map((task) => (
                    <View key={task.id} style={styles.taskCard}>

                        {/* Header de la tarjeta con tiempo y llaves */}
                        <View style={styles.cardHeader}>
                            <View style={styles.rewardContainer}>
                                <MaterialIcons name="timer" size={20} color={Utils.getColor(task.color)} />
                                <Text style={styles.rewardText}>{task.duration}</Text>
                            </View>
                            <View style={styles.rewardContainer}>
                                <FontAwesome5 name="key" size={16} color="#DAA520" />
                                <Text style={styles.rewardText}>{task.keys}</Text>
                            </View>
                        </View>

                        {/* Contenido Principal */}
                        <Text style={[styles.taskTitle, { color: task.color }]}>{task.title}</Text>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                        <Text style={styles.deadline}>Fecha límite: <Text style={styles.deadlineValue}>{task.deadline}</Text></Text>

                        {/* Acciones Footer */}
                        <View style={styles.cardFooter}>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.iconButton} onPress={() => openDeleteAlert(task)}>
                                    <Feather name="trash-2" size={22} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => router.push({
                                        pathname: "/nuevatarea",
                                        params: {
                                            mode: 'edit',
                                            id: task.id,
                                            title: task.title,
                                            description: task.description,
                                            keys: task.keys,
                                            duration: task.duration,
                                            color: task.color
                                        }
                                    })}
                                >
                                    <Feather name="edit-2" size={22} color="black" />
                                </TouchableOpacity>
                            </View>

                            {/* Dropdown Asignada a */}
                            <View style={styles.assignContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.assignButton,
                                        expandedTask === task.id && styles.assignButtonActive
                                    ]}
                                    onPress={() => toggleDropdown(task.id)}
                                >
                                    <Text style={styles.assignButtonText}>Asignada a</Text>
                                    <Ionicons
                                        name={expandedTask === task.id ? "chevron-up" : "chevron-down"}
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>

                                {expandedTask === task.id && (
                                    <View style={styles.dropdownMenu}>
                                        {(task.assignedProfiles || []).map((user, idx) => (
                                            <View key={idx}>
                                                <TouchableOpacity style={styles.dropdownItem}>
                                                    <Text style={styles.dropdownText}>{user}</Text>
                                                    <TouchableOpacity onPress={() => openUnassignAlert(task, user)}>
                                                        <View style={styles.dash} />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                                {idx < (task.assignedProfiles.length - 1 || 0) && <View style={styles.divider} />}
                                            </View>
                                        ))}
                                        {task.assignedProfiles?.length > 0 && <View style={styles.divider} />}
                                        <TouchableOpacity style={styles.dropdownItem} onPress={() => openAssignModal(task)}>
                                            <Text style={styles.dropdownInfoText}>Asignar a otro perfil +</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                ))}

                {/* Espacio extra para que no tape la barra de navegación */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" />

            {/* Delete Alert Modal */}
            <Modal
                transparent={true}
                visible={deleteModalVisible}
                animationType="fade"
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.alertBox}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name="warning" size={50} color="#FBBF24" />
                        </View>
                        <Text style={styles.alertTitle}>
                            ¿Estás seguro de eliminar <Text style={styles.boldText}>{selectedTask?.title}</Text>?
                        </Text>
                        <Text style={styles.alertMessage}>
                            Esta tarea desaparecerá de los perfiles en la que está asignada
                        </Text>

                        <View style={styles.alertButtons}>
                            <TouchableOpacity
                                style={[styles.alertButton, styles.cancelButton]}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.alertButton, styles.deleteButtonConfirm]}
                                onPress={handleDeleteConfirm}
                            >
                                <Text style={styles.confirmButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Unassign Alert Modal */}
            <Modal
                transparent={true}
                visible={unassignModalVisible}
                animationType="fade"
                onRequestClose={() => setUnassignModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.alertBox}>
                        <View style={styles.iconWrapper}>
                            {/* Custom File Off Icon Composition */}
                            <View style={{ position: 'relative' }}>
                                <FontAwesome5 name="file-alt" size={45} color="#D1D5DB" />
                                <View style={styles.redXCircle}>
                                    <Ionicons name="close" size={16} color="white" />
                                </View>
                            </View>
                        </View>

                        <Text style={styles.alertTitle}>
                            ¿Desasignar <Text style={styles.boldText}>{selectedTask?.title}</Text>?
                        </Text>
                        <Text style={styles.alertMessage}>
                            La tarea desaparecerá del perfil de <Text style={styles.boldText}>{targetUser}</Text>
                        </Text>

                        <View style={styles.alertButtons}>
                            <TouchableOpacity
                                style={[styles.alertButton, styles.cancelButton]}
                                onPress={() => setUnassignModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.alertButton, styles.desasignarButton]}
                                onPress={handleUnassignConfirm}
                            >
                                <Text style={styles.confirmButtonText}>Desasignar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Assign Modal */}
            <Modal
                transparent={true}
                visible={assignModalVisible}
                animationType="fade"
                onRequestClose={() => setAssignModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.assignModalContainer}>
                        <TouchableOpacity
                            style={styles.closeAssignModal}
                            onPress={() => setAssignModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <ScrollView style={styles.assignList} showsVerticalScrollIndicator={false}>
                            {LIVE_PROFILES.map((profile) => (
                                <View key={profile.id} style={styles.assignProfileItem}>
                                    <View style={styles.assignProfileInfo}>
                                        <Image source={profile.avatar} style={styles.assignAvatar} resizeMode="contain" />
                                        <Text style={styles.assignName}>{profile.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.assignActionButton,
                                            selectedTask?.assignedProfiles?.includes(profile.name) && styles.assignActionButtonDisabled
                                        ]}
                                        onPress={() => handleAssignProfile(profile.name)}
                                        disabled={selectedTask?.assignedProfiles?.includes(profile.name)}
                                    >
                                        <Text style={styles.assignActionText}>
                                            {selectedTask?.assignedProfiles?.includes(profile.name) ? 'Asignada' : 'Asignar'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const Utils = {
    getColor: (color) => color || Colors.primary
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.06,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    newButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        height: 60,
        justifyContent: 'center',
        marginBottom: 25,
        ...Shadows.button,
    },
    newButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    clipboardIcon: {
        marginRight: 15,
    },
    plusBadge: {
        position: 'absolute',
        top: 10,
        left: 40,
        backgroundColor: '#A855F7',
        borderRadius: 10,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    newButtonText: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
    },
    taskCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        ...Shadows.button,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    rewardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    rewardText: {
        fontFamily: Fonts.figtreebold,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
        color: Colors.black,
    },
    taskTitle: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    taskDescription: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 12,
        lineHeight: 20,
    },
    deadline: {
        fontFamily: Fonts.figtreebold,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    deadlineValue: {
        fontFamily: Fonts.figtreeRegular,
        fontWeight: 'normal',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        zIndex: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 15,
    },
    iconButton: {
        padding: 4,
    },
    assignContainer: {
        position: 'relative',
    },
    assignButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
    },
    assignButtonActive: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    assignButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    },
    dropdownMenu: {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 8,
        minWidth: 160,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 5,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    dropdownText: {
        fontFamily: Fonts.figtreebold,
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold',
    },
    dropdownInfoText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 13,
        color: '#6B7280',
    },
    dash: {
        width: 10,
        height: 3,
        backgroundColor: Colors.black,
        borderRadius: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 4,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    alertBox: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },
    iconWrapper: {
        marginBottom: 16,
    },
    alertTitle: {
        fontFamily: Fonts.figtreebold,
        fontSize: 18,
        fontWeight: 'bold', // Extra enforcement
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 10,
    },
    boldText: {
        fontWeight: '900',
        fontFamily: Fonts.figtreeBlack,
    },
    alertMessage: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 15,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    alertButtons: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
        justifyContent: 'center',
    },
    alertButton: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        minWidth: 110,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cancelButton: {
        backgroundColor: Colors.primary,
    },
    deleteButtonConfirm: {
        backgroundColor: '#FF4C4C', // Red for delete
    },
    desasignarButton: {
        backgroundColor: '#FF4C4C', // Red for desasignar
    },
    cancelButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
    },
    confirmButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
    },
    redXCircle: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#EF4444',
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    // Assign Modal Styles
    assignModalContainer: {
        backgroundColor: Colors.white,
        borderRadius: 25,
        padding: 20,
        width: '85%',
        maxHeight: '60%',
        ...Shadows.button,
        shadowOpacity: 0.2,
        elevation: 15,
        position: 'relative',
    },
    closeAssignModal: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 10,
    },
    assignList: {
        marginTop: 20,
    },
    assignProfileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    assignProfileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    assignAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    assignName: {
        fontFamily: Fonts.figtreebold,
        fontSize: 20,
        color: Colors.black,
        fontWeight: 'bold',
    },
    assignActionButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    assignActionButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    assignActionText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    },
});
