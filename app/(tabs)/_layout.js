import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../styles/globalStyles';

/**
 * Custom Tab Bar that matches BarraNavegacion design
 */
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.barraBelow}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName = "";
        if (route.name === 'index') {
          iconName = isFocused ? "home" : "home-outline";
        } else if (route.name === 'notificaciones') {
          iconName = isFocused ? "notifications" : "notifications-outline";
        } else if (route.name === 'perfil') {
          iconName = isFocused ? "person" : "person-outline";
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.botonTab}
          >
            <Ionicons
              name={iconName}
              size={28}
              color={isFocused ? Colors.primary : Colors.black}
            />
            <Text style={[styles.textBoton, isFocused && styles.textActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="notificaciones"
        options={{
          title: 'Notificaciones',
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  barraBelow: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  botonTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textBoton: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: Fonts.figtreebold,
    fontWeight: '600',
    marginTop: 4,
  },
  textActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
