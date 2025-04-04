import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 20,
      justifyContent: 'center'
    },
    formContainer: {
      padding: 20,
      borderRadius: 10,
      marginHorizontal: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      textAlign: 'center',
      color: '#666',
      marginBottom: 20,
    },
    errorContainer: {
      backgroundColor: '#ffebee',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
    },
    errorText: {
      color: '#d32f2f',
      textAlign: 'center',
    },
    input: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
      fontSize: 14,
      height: 50,
    },
    passwordContainer: {
      position: 'relative',
      marginBottom: 15,
    },
    passwordInput: {
      paddingRight: 40,
    },
    eyeIcon: {
      position: 'absolute',
      right: 12,
      top: 12,
    },
    mainButton: {
      backgroundColor: '#000',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    mainButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalSubtitle: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      color: '#666',
    },
    modalButton: {
      backgroundColor: '#333',
      padding: 12,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });