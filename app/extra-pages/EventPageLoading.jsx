import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '../../constants/Colors';
import CustomSVG from '../../assets/images/gatherlogoSVG'


export default function EventPageLoading() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Função de animação
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <CustomSVG style={styles.logo} width={70} height={70} />
          </Animated.View>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white, 
    height: '100%'
  },
  loadingContainer: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: 'airbnbcereal-bold'
  },
});
