import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import GroupsScreen from './Groups';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatScreen from './Chat';
import FriendScreen from './Friend';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Profile: 'user',
            Groups: 'group',
            Chat: 'comments',
            Friends: 'users'
          };

          const iconName = icons[route.name] || 'question-circle'; // Valor por defecto

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name='Chat' component={ChatScreen}/>
      <Tab.Screen name='Friends' component={FriendScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
