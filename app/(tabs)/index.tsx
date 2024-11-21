import * as React from 'react';
import "../../global.css";
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
export default function AboutScreen() {
  const getStarted = () =>
  {
    router.replace("/instructions");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustKeyboardInsets={true}
      className="bg-black"
    >
      <View className="flex-1 items-center">
        <View className="w-4/5 items-center">
          <Text className="text-white text-6xl text-center mt-40">
            Welcome to CTLC Studio!
          </Text>
          <Text className="text-white text-4xl text-center mt-20">
            Project: Non-Verbal Communication Coaching
          </Text>
          <TouchableOpacity
            className="bg-blue-600 rounded-lg mt-32"
            activeOpacity={0.8}
            onPress={() => getStarted()}
          >
            <Text className="text-white text-3xl capitalize px-10 py-4 text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* the next view should be at bottom*/} 
      <View className="absolute bottom-0 w-full bg-black justify-around flex-row mb-10">
        <Text className="text-white text-4xl text-center p-4">CTLC Lab</Text>
        <Text className="text-white text-4xl text-center p-4">HTI Lab</Text>
      </View>
    </ScrollView>
  );
}
