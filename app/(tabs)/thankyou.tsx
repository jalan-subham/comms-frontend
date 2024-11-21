import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ThankYouScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank You!</Text>
      <Text style={styles.messageText}>We appreciate your time and effort.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the screen takes up the entire space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#000', // Black background
  },
  thankYouText: {
    fontSize: 40, // Big text
    fontWeight: 'bold', // Bold font
    color: '#fff', // White text
    textAlign: 'center', // Center-align text
    marginBottom: 20, // Space below the thank you text
  },
  messageText: {
    fontSize: 18, // Smaller font size
    color: '#fff', // White text
    textAlign: 'center', // Center-align text
    marginHorizontal: 20, // Adds padding for smaller screens
  },
});
