import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
     
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center'
      // paddingVertical: 90,
    },
    formContainer: {
      padding: 30,
      borderRadius: 30,
      marginHorizontal: 20,
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
      marginBottom: 30,
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
      marginBottom: 60,
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
      marginBottom: 20,
      fontSize: 14,
      
    },
    mainButton: {
      backgroundColor: '#000',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 40,
    },
    mainButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    linkContainer: {
      marginTop: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    linkText: {
      color: '#666',
      fontSize: 14,
      marginRight: 5,
    },
    link: {
      color: '#464543',
      fontWeight: 'bold',
      fontSize: 14,
    },
  });