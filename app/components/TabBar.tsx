import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

type TabType = {
  name: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  href: string; 
};

const TabBar = () => {
  const pathname = usePathname(); 

  const tabs: TabType[] = [
    { name: 'Home', icon: 'home', label: 'Inicio', href: '/features/home' },
    { name: 'Profile', icon: 'user', label: 'Perfil', href: '/features/profile' },
    { name: 'Chat', icon: 'comments', label: 'Chat', href: '/features/chat' },
    { name: 'Friends', icon: 'users', label: 'Amigos', href: '/features/friends' },
    { name: 'Groups', icon: 'group', label: 'Grupos', href: '/features/groups' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Link 
          href={tab.href as any} 
          key={tab.name} 
          asChild
        >
          <TouchableOpacity style={styles.tab}>
            <FontAwesome 
              name={tab.icon} 
              size={24} 
              color={pathname.startsWith(tab.href) ? '#007bff' : '#333'}
              style={styles.icon}
            />
            <Text style={[styles.label, { color: pathname.startsWith(tab.href) ? '#007bff' : '#333' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    height: 60,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
});

export default TabBar;
