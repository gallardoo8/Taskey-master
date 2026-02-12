import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TerminosYCondiciones() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Legal</Text>
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {/* Icon Header */}
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/images/tareas.png')}
                            style={{ width: 32, height: 32, tintColor: Colors.primary }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.mainTitle}>Términos de servicio</Text>

                    <Text style={styles.textParagraph}>
                        Bienvenido a Task Key (la “<Text style={styles.boldText}>Plataforma</Text>”), que es proporcionada por Task Key & Co. o una de sus afiliadas (”Task Key” o “nosotros”)
                    </Text>

                    <Text style={styles.textParagraph}>
                        Usted esta leyendo los términos de servicio (los “<Text style={styles.boldText}>Términos</Text>”), que rigen la relación y que constituyen un acuerdo entre usted y nosotros, además de establecer los términos y condiciones mediante los cuales puede acceder y hacer uso de la Plataforma, servicios y contenido relacionado (conjuntamente, los “<Text style={styles.boldText}>Servicios</Text>”). Nuestros servicios son prestados para efectos de uso privado y no comercial. Para fines de estos Términos, “<Text style={styles.boldText}>usted</Text>” y “<Text style={styles.boldText}>suyo</Text>” significa usted como usuario de los Servicios. Los Términos constituyen un acuerdo legalmente vinculante entre usted y nosotros. Por favor, tómese el tiempo para leerlos cuidadosamente.
                    </Text>

                    <Text style={styles.sectionTitle}>Aceptación de los términos</Text>
                    <Text style={styles.textParagraph}>
                        Al acceder o utilizar nuestros Servicios, usted confirma que puede celebrar un contrato vinculante con Task Key, que acepta estos Términos y que se compromete a cumplirlos. El acceso y uso de nuestros Servicios también está sujeto a nuestra <Text style={styles.boldText}>Política de Privacidad</Text>. Si usted no está de acuerdo con estos Términos, no debe acceder ni utilizar nuestros Servicios.
                    </Text>
                    <Text style={styles.textParagraph}>
                        Dado que Task Key es una herramienta de control parental, al aceptar estos términos usted declara y garantiza que es mayor de edad legal en su jurisdicción y que posee la autoridad legal (como padre, madre o tutor legal) para instalar la aplicación en el dispositivo del menor objetivo y para monitorear su actividad.
                    </Text>

                    <Text style={styles.sectionTitle}>Modificaciones a los términos</Text>
                    <Text style={styles.textParagraph}>
                        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Si realizamos cambios materiales, se lo notificaremos por medios razonables (por ejemplo, a través de una notificación en la Plataforma o por correo electrónico). El uso continuado de los Servicios después de la fecha de entrada en vigor de los cambios constituirá su aceptación de los mismos.
                    </Text>

                    <Text style={styles.sectionTitle}>Su cuenta con nosotros</Text>
                    <Text style={styles.textParagraph}>
                        Para acceder a ciertas funciones de Task Key, deberá crear una cuenta. Usted se compromete a proporcionar información precisa, actual y completa. Usted es el único responsable de mantener la confidencialidad de sus credenciales de acceso (usuario y contraseña) y de todas las actividades que ocurran bajo su cuenta.
                    </Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Uso Autorizado:</Text> Usted acepta no vender, transferir ni ceder su cuenta a terceros.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Seguridad:</Text> Debe notificar a Task Key inmediatamente ante cualquier violación de seguridad o uso no autorizado de su cuenta.</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Su acceso y uso de nuestros servicios</Text>
                    <Text style={styles.textParagraph}>
                        Le otorgamos una licencia limitada, no exclusiva, intransferible y revocable para utilizar la plataforma conforme a estos términos.
                    </Text>
                    <Text style={styles.textParagraph}>
                        <Text style={styles.boldText}>Restricciones de Uso:</Text> Usted acepta expresamente que <Text style={styles.boldText}>no</Text> utilizará los Servicios para:
                    </Text>
                    <View style={styles.numberedContainer}>
                        <Text style={styles.number}>1.</Text>
                        <Text style={styles.numberedText}>Monitorear, rastrear o espiar a cualquier persona que no sea un menor bajo su tutela legal directa. El uso de Task Key para espiar a cónyuges, parejas o adultos sin su consentimiento es una violación grave de estos términos y puede constituir un delito.</Text>
                    </View>
                    <View style={styles.numberedContainer}>
                        <Text style={styles.number}>2.</Text>
                        <Text style={styles.numberedText}>Realizar ingeniería inversa, descompilar o intentar extraer el código fuente de la Plataforma.</Text>
                    </View>
                    <View style={styles.numberedContainer}>
                        <Text style={styles.number}>3.</Text>
                        <Text style={styles.numberedText}>Utilizar la Plataforma para cualquier propósito ilegal, acoso, intimidación o violación de derechos de terceros.</Text>
                    </View>
                    <Text style={styles.textParagraph}>
                        Nos reservamos el derecho de suspender o eliminar su cuenta si detectamos un uso que viole estas restricciones.
                    </Text>

                    <Text style={styles.sectionTitle}>Derechos de Propiedad Intelectual</Text>
                    <Text style={styles.textParagraph}>
                        Todos los derechos, títulos e intereses sobre los Servicios y la Plataforma (incluidos, entre otros, el software, el diseño, el texto, los gráficos, los logotipos y las marcas comerciales "Task Key") son y seguirán siendo propiedad exclusiva de Task Key & Co. y sus licenciantes. Nada en estos Términos le otorga el derecho a usar el nombre de Task Key ni ninguna de las marcas comerciales, logotipos, nombres de dominio y otras características distintivas de la marca.
                    </Text>

                    <Text style={styles.sectionTitle}>Limitación de responsabilidad</Text>
                    <Text style={styles.textParagraph}>
                        En la medida máxima permitida por la ley aplicable:
                    </Text>
                    <View style={styles.numberedContainer}>
                        <Text style={styles.number}>1.</Text>
                        <Text style={styles.numberedText}><Text style={styles.boldText}>Prestación del Servicio "Tal cual":</Text> Los Servicios se proporcionan "tal cual" y "según disponibilidad". Task Key no garantiza que la Plataforma estará libre de errores, interrupciones o que bloqueará el 100% del contenido inapropiado.</Text>
                    </View>
                    <View style={styles.numberedContainer}>
                        <Text style={styles.number}>2.</Text>
                        <Text style={styles.numberedText}><Text style={styles.boldText}>Responsabilidad Parental:</Text> Usted reconoce que Task Key es una herramienta de apoyo y no sustituye la supervisión parental activa. Nosotros no somos responsables por las acciones del menor ni por el contenido al que este logre acceder eludiendo los controles de la aplicación.</Text>
                    </View>
                    <View style={styles.numberedContainer}>
                        <Text style={styles.number}>3.</Text>
                        <Text style={styles.numberedText}><Text style={styles.boldText}>Exclusión de Daños:</Text> Task Key & Co. no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, ni por cualquier pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles.</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Otros Términos</Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Divisibilidad:</Text> Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha disposición se limitará o eliminará en la medida mínima necesaria, y las disposiciones restantes permanecerán en pleno vigor y efecto.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Ley Aplicable y Jurisdicción:</Text> Estos Términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos Mexicanos. Cualquier disputa derivada de estos Términos se someterá a la jurisdicción exclusiva de los tribunales competentes en México.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Acuerdo Completo:</Text> Estos Términos constituyen el acuerdo completo y exclusivo entre Task Key y usted con respecto a los Servicios, y reemplazan cualquier acuerdo anterior.</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.mainTitle}>Política de Privacidad</Text>

                    <Text style={styles.textParagraph}>
                        En Task Key & Co. (”Task Key”, “nosotros” o “nuestro”), valoramos y respetamos su privacidad y la seguridad de los datos de su familia. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información obtenida a través de nuestra aplicación móvil (conjuntamente, los "Servicios").
                    </Text>

                    <Text style={styles.textParagraph}>
                        Al descargar y utilizar Task Key, usted acepta las prácticas descritas en esta política.
                    </Text>

                    <Text style={styles.sectionSubtitle}>1. Información que Recopilamos</Text>
                    <Text style={styles.textParagraph}>
                        Para proporcionar las funciones de control parental, recopilamos dos tipos de datos:
                    </Text>
                    <Text style={styles.textParagraph}>
                        <Text style={styles.boldText}>A. Datos proporcionados por el Administrador (Padre/Tutor):</Text>
                    </Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Información de Cuenta:</Text> Nombre, dirección de correo electrónico y contraseña encriptada.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Información de Pago:</Text> Si utiliza funciones premium, los procesadores de pago (como Google Play o App Store) procesan esta información; nosotros no almacenamos datos completos de tarjetas de crédito.</Text>
                    </View>

                    <Text style={styles.textParagraph}>
                        <Text style={styles.boldText}>B. Datos del Dispositivo Supervisado (Menor):</Text>
                    </Text>
                    <Text style={styles.textParagraph}>
                        Para que la aplicación funcione, usted nos otorga permiso explícito para recopilar los siguientes datos del dispositivo vinculado:
                    </Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Uso de Aplicaciones:</Text> Nombres de paquetes (App IDs), tiempo de uso en pantalla y frecuencia de apertura de apps.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Historial de Navegación:</Text> URLs visitadas para el filtrado de contenido web (si esta función está activa).</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Ubicación (GPS):</Text> Geolocalización precisa del dispositivo en tiempo real y en segundo plano para la función de "Localización" y "Geocercas".</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Identificadores del Dispositivo:</Text> Modelo, sistema operativo, nivel de batería y ID único del dispositivo.</Text>
                    </View>

                    <Text style={styles.sectionSubtitle}>2. Uso de Permisos Sensibles (Android/iOS)</Text>
                    <Text style={styles.textParagraph}>
                        Task Key requiere permisos específicos para funcionar. No utilizamos estos permisos para ningún otro fin que no sea el control parental:
                    </Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Servicios de Accesibilidad (Accessibility API):</Text> Utilizamos este permiso para detectar qué sitio web o aplicación se está ejecutando en primer plano con el fin de bloquear contenido inapropiado según sus configuraciones. <Text style={styles.boldText}>No</Text> utilizamos este servicio para leer mensajes personales, contraseñas ni datos bancarios.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Administrador de Dispositivos:</Text> Se solicita para evitar que el menor desinstale la aplicación sin la contraseña del padre.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Ubicación en Segundo Plano:</Text> Necesario para que usted pueda ver la ubicación de su hijo incluso si la app está cerrada en su teléfono.</Text>
                    </View>

                    <Text style={styles.sectionSubtitle}>3. Cómo Usamos su Información</Text>
                    <Text style={styles.textParagraph}>
                        Utilizamos la información recopilada exclusivamente para:
                    </Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Permitirle bloquear o limitar el acceso a apps y sitios web específicos.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Generar reportes de actividad para el padre/tutor.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Mostrar la ubicación del dispositivo en el mapa del tutor.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Enviar notificaciones de seguridad (ej. batería baja o llegada a un lugar seguro).</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Mejorar el rendimiento y corregir errores en la aplicación.</Text>
                    </View>
                    <Text style={styles.textParagraph}>
                        <Text style={styles.boldText}>No vendemos, alquilamos ni compartimos la información personal de sus hijos con anunciantes ni terceros con fines de marketing.</Text>
                    </Text>

                    <Text style={styles.sectionSubtitle}>4. Retención y Eliminación de Datos</Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Retención:</Text> Conservamos los datos de actividad (historial, ubicación) durante un periodo limitado (ej. 30 días) para que usted pueda revisar los reportes. Pasado este tiempo, se eliminan o anonimizan automáticamente.</Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}><Text style={styles.boldText}>Eliminación:</Text> Usted puede solicitar la eliminación completa de su cuenta y todos los datos asociados en cualquier momento desde la configuración de la app o contactándonos en taskey011@gmail.com.</Text>
                    </View>

                    <Text style={styles.sectionSubtitle}>5. Seguridad de los Datos</Text>
                    <Text style={styles.textParagraph}>
                        Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger sus datos, incluyendo el uso de encriptación (HTTPS/TLS) durante la transmisión de datos entre el dispositivo y nuestros servidores. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
                    </Text>

                    <Text style={styles.sectionSubtitle}>6. Servicios de Terceros</Text>
                    <Text style={styles.textParagraph}>
                        Podemos utilizar proveedores de servicios confiables para el alojamiento de datos y análisis de errores. Estos terceros tienen acceso limitado a su información solo para realizar estas tareas en nuestro nombre y están obligados a protegerla.
                    </Text>

                    <Text style={styles.sectionSubtitle}>7. Privacidad de los Menores (COPPA y Regulaciones Locales)</Text>
                    <Text style={styles.textParagraph}>
                        Nuestros servicios están dirigidos a padres o tutores legales. <Text style={styles.boldText}>No recopilamos datos de menores sin el consentimiento verificable del padre.</Text> Al instalar Task Key en el dispositivo de un menor, usted declara ser su tutor legal y otorga su consentimiento para la recopilación de datos descrita en esta política.
                    </Text>

                    <Text style={styles.sectionSubtitle}>8. Sus Derechos (Derechos ARCO)</Text>
                    <Text style={styles.textParagraph}>
                        Dependiendo de su jurisdicción, usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en el correo abajo mencionado.
                    </Text>

                    <Text style={styles.sectionSubtitle}>9. Cambios a esta Política</Text>
                    <Text style={styles.textParagraph}>
                        Podemos actualizar esta política ocasionalmente. Le notificaremos cualquier cambio importante a través de la app o por correo electrónico.
                    </Text>

                    <Text style={styles.sectionSubtitle}>10. Contacto</Text>
                    <Text style={styles.textParagraph}>
                        Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:
                    </Text>
                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}><Text style={styles.boldText}>Task Key & Co.</Text></Text>
                        <Text style={styles.contactText}>Correo electrónico: taskey011@gmail.com</Text>
                    </View>
                </View>

                {/* Space for nav bar */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="perfil" />
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
        paddingTop: SCREEN_HEIGHT * 0.06,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: Colors.white,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 24,
        ...Shadows.button,
    },
    iconContainer: {
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: '#EFF6FF',
        padding: 18,
        borderRadius: 16,
    },
    mainTitle: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginTop: 24,
        marginBottom: 12,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginTop: 20,
        marginBottom: 10,
    },
    textParagraph: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 24,
        marginBottom: 16,
    },
    boldText: {
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    bulletContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingLeft: 8,
    },
    bullet: {
        fontSize: 18,
        color: Colors.primary,
        marginRight: 10,
        marginTop: -2,
    },
    bulletText: {
        flex: 1,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },
    numberedContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingLeft: 8,
    },
    number: {
        fontSize: 15,
        fontFamily: Fonts.figtreebold,
        color: Colors.primary,
        marginRight: 10,
    },
    numberedText: {
        flex: 1,
        fontFamily: Fonts.figtreeRegular,
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 32,
    },
    contactContainer: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    contactText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#374151',
        marginBottom: 4,
    }
});

