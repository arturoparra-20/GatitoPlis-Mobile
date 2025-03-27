import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

interface User {
    email: string;
    nombres: string;
    apellidos: string;
    usuario: string;
}


interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean; // Cambiado de 'loading' a 'isLoading' para consistencia
  isReady: boolean;
  login: (email: string, password: string, rememberMe: boolean, onSuccess: () => void) => Promise<void>;
  logout: (onLogout?: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{
      user: User | null;
      token: string | null;
      isLoading: boolean;
      isReady: boolean; // Nuevo estado para controlar la inicialización
    }>({
      user: null,
      token: null,
      isLoading: false,
      isReady: false, // Inicialmente no está listo
    });
  
    useEffect(() => {
      const loadAuthData = async () => {
        try {
          const [storedUser, storedToken] = await Promise.all([
            AsyncStorage.getItem("user"),
            AsyncStorage.getItem("token"),
          ]);
  
          if (storedUser && storedToken) {
            setAuthState({
              user: JSON.parse(storedUser),
              token: storedToken,
              isLoading: false,
              isReady: true,
            });
          } else {
            setAuthState(prev => ({ ...prev, isReady: true }));
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
          setAuthState(prev => ({ ...prev, isReady: true }));
        }
      };
  
      loadAuthData();
    }, []);
  

  const login = async (email: string, password: string, rememberMe: boolean, onSuccess: () => void) => {
    try {
      const response = await fetch("http://192.168.100.85:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, clave: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      setAuthState({
        user: data.user,
        token: data.token,
        isLoading: false,
        isReady: false,
      });

      await Promise.all([
        AsyncStorage.setItem("user", JSON.stringify(data.user)),
        AsyncStorage.setItem("token", data.token),
      ]);

      onSuccess();
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = async (onLogout?: () => void) => {
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isReady: false
    });

    try {
      await Promise.all([
        AsyncStorage.removeItem("user"),
        AsyncStorage.removeItem("token"),
      ]);
    } catch (error) {
      console.error("Error al eliminar datos de AsyncStorage:", error);
    }

    onLogout?.();
  };

  // Renderiza un loader mientras está cargando
  if (authState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isLoading: authState.isLoading,
        isReady: authState.isReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};