import { StyleSheet } from 'react-native';
 
 export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
       
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
      
    },
    formContainer: {
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 30,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    logo: {
        width: 200,
        height: 150,
        alignSelf: 'center',
        marginBottom: 10,
        resizeMode: 'contain'
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
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#666',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#464543',
        borderColor: '#464543',
    },
    rememberText: {
        fontSize: 14,
        color: '#333',
    },
    forgotPassword: {
        color: '#464543',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#464543',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loader: {
        marginTop: 15,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
        marginRight: 5,
    },
    registerLink: {
        color: '#464543',
        fontWeight: 'bold',
        fontSize: 14,
    },
});