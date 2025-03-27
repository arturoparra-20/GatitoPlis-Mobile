import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasswordStrengthMeterProps {
  password: string;
}

const getStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 10) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  return strength;
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(getStrength(password));
  }, [password]);

  const strengthLabels = [
    "Débil: La contraseña debe tener al menos 10 caracteres, 1 Mayúscula, 1 número.",
    "Media: La contraseña debe ser más fuerte.",
    "Fuerte: Buena contraseña.",
  ];

  const isWeakAtStart = !/[A-Z]/.test(password) && password.length > 0;

  // Colores basados en la fuerza
  const getBarColor = () => {
    switch(strength) {
      case 1: return '#ef4444'; // rojo
      case 2: return '#f59e0b'; // amarillo
      case 3: return '#10b981'; // verde
      default: return '#e5e7eb'; // gris
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View 
          style={[
            styles.barFill,
            { 
              width: `${(strength / 3) * 100}%`,
              backgroundColor: getBarColor()
            }
          ]}
        />
      </View>
      <Text style={styles.labelText}>
        {isWeakAtStart ? strengthLabels[0] : strength > 0 ? strengthLabels[strength - 1] : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
  },
  barBackground: {
    height: 4,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  labelText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default PasswordStrengthMeter;