import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  TextInput,
  Modal,
  Platform
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/auth/Login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <View style={styles.container}>
      {/* Logo y Controles */}
      <View style={styles.headerContent}>
        {/* Logo - Solo visible en móviles */}
        <TouchableOpacity
        onPress={() => router.replace("/mainLayout")}
        >
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.mobileLogo} 
          
        />
        </TouchableOpacity>

        {/* Controles Derecha */}
        <View style={styles.controlsContainer}>
          {/* Notificaciones */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>

          {/* Búsqueda */}
          {Platform.OS === 'web' ? (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar en Gatito Plis"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => setShowSearch(true)} style={styles.iconButton}>
                <FontAwesome name="search" size={20} color="#333" />
              </TouchableOpacity>

              <Modal
                visible={showSearch}
                transparent
                animationType="slide"
                onRequestClose={() => setShowSearch(false)}
              >
                <View style={styles.searchModal}>
                  <View style={styles.searchModalContent}>
                    <TextInput
                      autoFocus
                      style={styles.mobileSearchInput}
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowSearch(false)}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </View>

        {/* Perfil */}
        {user ? (
          <TouchableOpacity onPress={toggleMenu} style={styles.profileButton}>
            <Text style={styles.welcomeText}>
              Bienvenido {user.nombres.split(' ')[0]}!
            </Text>
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>
                {user.nombres[0].toUpperCase()}
              </Text>
            </View>

            {/* Menú desplegable */}
            {isMenuOpen && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  onPress={handleLogout}
                  style={styles.menuItem}
                >
                  <Text style={styles.menuItemText}>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileLogo: {
    width: 60,
    height: 60,
    display: Platform.OS === 'web' ? 'none' : 'flex',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 36,
    width: 200,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  searchIcon: {
    marginLeft: 8,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  welcomeText: {
    fontSize: 14,
    color: '#333',
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#333',
  },
  searchModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchModalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  mobileSearchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;