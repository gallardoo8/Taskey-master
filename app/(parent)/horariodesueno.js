import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export default function HorarioDeSueno() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const childName = params.name || 'Cons';
    const childAvatar = params.avatar || require('../../assets/images/capicons.png');

    const [schedules, setSchedules] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);

    const handleBackPress = () => router.back();

    const toggleExpand = (id) => {
        setSchedules(schedules.map(s =>
            s.id === id ? { ...s, expanded: !s.expanded } : s
        ));
    };

    const updateTime = (id, field, delta) => {
        setSchedules(schedules.map(s => {
            if (s.id !== id) return s;
            let val = parseInt(s[field]);
            const max = field.endsWith('H') ? 23 : 59;
            val = (val + delta + (max + 1)) % (max + 1);
            return { ...s, [field]: val.toString().padStart(2, '0') };
        }));
    };

    const toggleDay = (id, day) => {
        setSchedules(schedules.map(s => {
            if (s.id !== id) return s;
            const newDays = s.days.includes(day)
                ? s.days.filter(d => d !== day)
                : [...s.days, day];
            return { ...s, days: newDays };
        }));
    };

    const addNewSchedule = () => {
        const newId = Date.now().toString();
        setSchedules([...schedules, {
            id: newId,
            startH: '21',
            startM: '00',
            endH: '08',
            endM: '00',
            days: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
            expanded: true
        }]);
    };

    const handleSave = (id) => {
        setSchedules(schedules.map(s =>
            s.id === id ? { ...s, expanded: false } : s
        ));
    };

    const openDeleteModal = (schedule) => {
        setScheduleToDelete(schedule);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (scheduleToDelete) {
            setSchedules(schedules.filter(s => s.id !== scheduleToDelete.id));
            setShowDeleteModal(false);
            setScheduleToDelete(null);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={[styles.circle, styles.circleLime]} />
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleDarkPurple]} />
                <View style={[styles.circle, styles.circleCyan]} />
                <View style={[styles.circle, styles.circleOrange]} />

                <View style={styles.headerTop}>
                    <View style={styles.characterBadge}>
                        <View style={styles.avatarMiniWrapper}>
                            <Image source={childAvatar} style={styles.avatarMini} resizeMode="contain" />
                        </View>
                        <Text style={styles.characterName}>{childName}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.titleRow}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.mainTitle}>Editar horario de sueño</Text>
                </View>

                <TouchableOpacity style={styles.addNewBtn} onPress={addNewSchedule} activeOpacity={0.8}>
                    <View style={styles.addNewIconWrapper}>
                        <MaterialCommunityIcons name="moon-waning-crescent" size={20} color="white" />
                        <Text style={styles.zzz}>zZZ</Text>
                    </View>
                    <Text style={styles.addNewText}>Asignar nuevo horario</Text>
                    <Ionicons name="add-circle" size={18} color="#FFB800" />
                </TouchableOpacity>

                {schedules.length === 0 ? (
                    <Text style={styles.emptyText}>No hay ningún horario de sueño asignado a este perfil</Text>
                ) : (
                    schedules.map((item, index) => (
                        <View key={item.id} style={styles.scheduleCard}>
                            <TouchableOpacity
                                style={styles.cardHeader}
                                onPress={() => toggleExpand(item.id)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cardTitle}>Horario {index + 1}</Text>
                                <Feather name={item.expanded ? "chevron-up" : "chevron-down"} size={24} color="black" />
                            </TouchableOpacity>

                            {item.expanded ? (
                                <View style={styles.expandedContent}>
                                    <View style={styles.timeRowsContainer}>
                                        {/* Inicio */}
                                        <View style={styles.timeCol}>
                                            <Text style={styles.timeLabel}>Inicio:</Text>
                                            <View style={styles.timePicker}>
                                                <View style={styles.timeUnit}>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'startH', 1)}>
                                                        <Feather name="chevron-up" size={20} color="black" />
                                                    </TouchableOpacity>
                                                    <View style={styles.timeBox}>
                                                        <Text style={styles.timeText}>{item.startH}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'startH', -1)}>
                                                        <Feather name="chevron-down" size={20} color="black" />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.timeSeparator}>:</Text>
                                                <View style={styles.timeUnit}>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'startM', 5)}>
                                                        <Feather name="chevron-up" size={20} color="black" />
                                                    </TouchableOpacity>
                                                    <View style={styles.timeBox}>
                                                        <Text style={styles.timeText}>{item.startM}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'startM', -5)}>
                                                        <Feather name="chevron-down" size={20} color="black" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Fin */}
                                        <View style={styles.timeCol}>
                                            <Text style={styles.timeLabel}>Fin:</Text>
                                            <View style={styles.timePicker}>
                                                <View style={styles.timeUnit}>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'endH', 1)}>
                                                        <Feather name="chevron-up" size={20} color="black" />
                                                    </TouchableOpacity>
                                                    <View style={styles.timeBox}>
                                                        <Text style={styles.timeText}>{item.endH}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'endH', -1)}>
                                                        <Feather name="chevron-down" size={20} color="black" />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.timeSeparator}>:</Text>
                                                <View style={styles.timeUnit}>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'endM', 5)}>
                                                        <Feather name="chevron-up" size={20} color="black" />
                                                    </TouchableOpacity>
                                                    <View style={styles.timeBox}>
                                                        <Text style={styles.timeText}>{item.endM}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => updateTime(item.id, 'endM', -5)}>
                                                        <Feather name="chevron-down" size={20} color="black" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <Text style={styles.daysLabel}>Días:</Text>
                                    <View style={styles.daysRow}>
                                        {DAYS.map(day => (
                                            <TouchableOpacity
                                                key={day}
                                                style={[styles.dayCircle, item.days.includes(day) && styles.dayCircleActive]}
                                                onPress={() => toggleDay(item.id, day)}
                                            >
                                                <Text style={[styles.dayText, item.days.includes(day) && styles.dayTextActive]}>{day}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    <View style={styles.actionRow}>
                                        <TouchableOpacity style={styles.saveBtn} onPress={() => handleSave(item.id)}>
                                            <Text style={styles.saveBtnText}>Guardar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deleteBtn} onPress={() => openDeleteModal(item)}>
                                            <Text style={styles.deleteBtnText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.collapsedSummary}>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryText}>
                                            <Text style={styles.summaryLabel}>De: </Text>
                                            <Text style={styles.summaryValue}>{item.startH}:{item.startM}</Text>
                                            <Text style={styles.summaryLabel}>  Hasta: </Text>
                                            <Text style={styles.summaryValue}>{item.endH}:{item.endM}</Text>
                                        </Text>
                                        <Text style={styles.summaryDaysText}>
                                            {item.days.length === 7 ? 'Diario' :
                                                item.days.length === 5 && !item.days.includes('Sab') && !item.days.includes('Dom') ? 'Lu - Vie' :
                                                    item.days.length === 2 && item.days.includes('Sab') && item.days.includes('Dom') ? 'Sa, Dom' :
                                                        item.days.join(', ')}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" />

            {/* Delete Modal */}
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModalContent}>
                        <View style={styles.warningIconBadge}>
                            <Ionicons name="warning" size={40} color="#000" />
                        </View>

                        <Text style={styles.deleteTitle}>
                            ¿Estás seguro de eliminar <Text style={{ fontWeight: 'bold' }}>Horario {schedules.findIndex(s => s.id === scheduleToDelete?.id) + 1}</Text>?
                        </Text>

                        <View style={styles.deleteButtonsRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalCancelButton]}
                                onPress={() => setShowDeleteModal(false)}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalDeleteButton]}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.modalDeleteButtonText}>Eliminar</Text>
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
        backgroundColor: '#F8FAFC',
    },
    header: {
        height: SCREEN_HEIGHT * 0.22,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circleLime: {
        width: 100,
        height: 100,
        backgroundColor: '#AAD62D',
        top: -30,
        left: '20%',
        opacity: 0.9,
    },
    circlePink: {
        width: 120,
        height: 120,
        backgroundColor: '#EC4899',
        bottom: 20,
        left: -40,
        opacity: 0.9,
    },
    circleDarkPurple: {
        width: 130,
        height: 130,
        backgroundColor: '#4C1D95',
        top: -30,
        right: -30,
        opacity: 0.7,
    },
    circleCyan: {
        width: 50,
        height: 50,
        backgroundColor: '#06B6D4',
        bottom: 30,
        right: 20,
        opacity: 0.8,
    },
    circleOrange: {
        width: 90,
        height: 90,
        backgroundColor: '#FB923C',
        top: 80,
        right: -30,
        opacity: 0.9,
    },
    headerTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    characterBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        paddingRight: 25,
        paddingLeft: 4,
        paddingVertical: 5,
        maxWidth: '80%',
        ...Shadows.button,
        shadowOpacity: 0.15,
        elevation: 10,
    },
    avatarMiniWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#D8B4FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarMini: {
        width: 38,
        height: 38,
    },
    characterName: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        color: Colors.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 15,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    backIconContainer: {
        marginRight: 12,
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        padding: 5,
    },
    mainTitle: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    addNewBtn: {
        backgroundColor: '#581C87',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 14,
        marginBottom: 30,
        alignSelf: 'flex-start',
        gap: 8,
        ...Shadows.button,
    },
    addNewIconWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    zzz: {
        color: 'white',
        fontSize: 10,
        marginLeft: 1,
        fontFamily: Fonts.figtreebold,
    },
    addNewText: {
        color: 'white',
        fontFamily: Fonts.figtreebold,
        fontSize: 15,
    },
    emptyText: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: Fonts.figtreeRegular,
        marginTop: 10,
        textAlign: 'left',
    },
    scheduleCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        ...Shadows.button,
        shadowOpacity: 0.05,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: Colors.primary,
    },
    expandedContent: {
        marginTop: 20,
    },
    timeRowsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    timeCol: {
        alignItems: 'center',
        width: '45%',
    },
    timeLabel: {
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    timePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    timeUnit: {
        alignItems: 'center',
    },
    timeBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    timeText: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    timeSeparator: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        marginBottom: 5,
    },
    daysLabel: {
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 12,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayCircleActive: {
        backgroundColor: '#7E22CE',
    },
    dayText: {
        fontSize: 10,
        fontFamily: Fonts.figtreebold,
        color: '#64748B',
    },
    dayTextActive: {
        color: 'white',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    saveBtn: {
        backgroundColor: '#7E22CE',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    saveBtnText: {
        color: 'white',
        fontFamily: Fonts.figtreebold,
        fontSize: 14,
    },
    deleteBtn: {
        backgroundColor: '#EF4444',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    deleteBtnText: {
        color: 'white',
        fontFamily: Fonts.figtreebold,
        fontSize: 14,
    },
    collapsedSummary: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    summaryLabel: {
        fontFamily: Fonts.figtreeRegular,
        color: '#64748B',
    },
    summaryValue: {
        fontSize: 16,
    },
    summaryDaysText: {
        fontSize: 13,
        fontFamily: Fonts.figtreebold,
        color: '#64748B',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteModalContent: {
        backgroundColor: 'white',
        width: '85%',
        padding: 25,
        borderRadius: 25,
        alignItems: 'center',
    },
    warningIconBadge: {
        backgroundColor: '#FFB800',
        width: 70,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteTitle: {
        fontSize: 18,
        fontFamily: Fonts.figtreeRegular,
        textAlign: 'center',
        marginBottom: 25,
        color: '#000',
    },
    deleteButtonsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 15,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 110,
        alignItems: 'center',
    },
    modalCancelButton: {
        backgroundColor: Colors.primary,
    },
    modalDeleteButton: {
        backgroundColor: '#EF4444',
    },
    modalCancelButtonText: {
        color: 'white',
        fontFamily: Fonts.figtreebold,
    },
    modalDeleteButtonText: {
        color: 'white',
        fontFamily: Fonts.figtreebold,
    },
});
