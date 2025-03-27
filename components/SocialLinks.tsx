import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Image } from 'expo-image';

const SocialLogosSection = () => {
  const logos = [
    {
      id: 1,
      url: "https://www.constructoraleceni.com/",
      image: require("../app/assets/logo1.png"),
      alt: "Logo 1"
    },
    {
      id: 2,
      url: "https://aneupi.com/",
      image: require("../app/assets/Cooperativaneupi.png"),
      alt: "Logo 2"
    },
    {
      id: 3,
      url: "https://www.cooperativafinancieraaneupi.com/afiliate",
      image: require("../app/assets/Logoana.png"),
      alt: "Logo 3"
    }
  ];

  const handlePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error al abrir el enlace:", error);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Avalado por:</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialLinks}>
        {logos.map((logo) => (
          <TouchableOpacity 
            key={logo.id}
            style={styles.socialContainer}
            onPress={() => handlePress(logo.url)}
            activeOpacity={0.7}
          >
            <Image 
              source={logo.image}
              style={styles.socialIcon}
              contentFit="contain"
              transition={200}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 40,
    width: '100%',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#0a0909',
    marginHorizontal: 10,
  },
  separatorText: {
    fontSize: 14,
    color: '#464543',
    fontWeight: 'bold',
  },
  socialLinks: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  socialContainer: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  socialIcon: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
});

export default SocialLogosSection;